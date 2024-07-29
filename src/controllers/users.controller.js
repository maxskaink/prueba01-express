import { response, request } from "express";
import pool from "../db/conection.js";
import { sha256, makeJWT, verifyJWT } from "../utils/encrypt.js";
import { runInternalError,
         runNotUserFound,
         runInvalidFormat,
         runUnauthorized
 } from "./error.controllers.js";

export const getUsers = async (req = request, res= response) => {

  const numberPage = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  if(isNaN(numberPage) || isNaN(pageSize))
    return runInvalidFormat(req, res);
  
  if(numberPage <=0 || pageSize <= 0) 
    return runInvalidFormat(req, res);
  
  const query = 
    `SELECT * FROM users ORDER BY ID LIMIT ${pageSize} OFFSET ${(numberPage - 1) * pageSize}`;
  
  pool
    .query(query)
    .then((response) => res.status( response.rowCount > 0 ? 200:404 ).json({
      numberOfUsers: response.rowCount,
      page: numberPage,
      pageSize: pageSize,
      users: response.rows.map( user => {delete user.password; return user;})
    }))
    .catch(() => runInternalError(req, res));
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.idUser);
  
  if(isNaN(id)) 
    return runInvalidFormat(req, res);

  pool.query("SELECT * FROM users WHERE id = $1", [id])
    .then((response) => {
      if (response.rowCount === 0)
        runNotUserFound(req,res);
      else{
        delete response.rows[0].password;
        res.json(response.rows[0])
      };
    })
    .catch(() => runInternalError(req, res));
};

export const createUser = async (req = request, res = response) =>{
  
  //Its all ready validated in the middleware
  const { name, email, password } = req.body;

  const passwordHash = await sha256(password)
    .catch(() => runInternalError(req, res));
  
  const result = await pool
    .query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, passwordHash])
    .catch((err) => runInternalError(req, res, err.detail));
  
  if(undefined === result) return;

  if(result.rowCount === 0)
    return runInternalError(req, res, "User not created, please try again");

  delete result.rows[0].password;

  res.status(200).json(result.rows[0]);
};

export const loginUser = async (req=request, res=response) => {
  const { email, password } = req.body;
  
  const passwordHash = await sha256(password)
    .catch(() => runInternalError(req, res));
  
  if(undefined === passwordHash) return;

  const result = await pool
    .query("SELECT id, name, email FROM users WHERE email = $1 AND password = $2", [email, passwordHash])
    .catch(() => runInternalError(req, res));

  if(undefined === result) return;

  if(result.rowCount === 0)
    return runUnauthorized(req, res, "The password or email are incorrect");

  const JWT = await makeJWT(result.rows[0])
    .catch(() => runInternalError(req, res, "Error creating JWT"));
  if(undefined === JWT) return;
  const response = {
    message: "User logged",
    JWT
  };

  res.status(200).json(response);
};

export const updateUser = async (req=request, res=response) => {
  const {jwt} = req.headers;
  const {name, email, password} = req.body;

  const user = await verifyJWT(jwt)
    .catch(() => runUnauthorized(req, res, "Invalid JWT"));
  if(undefined == user) return;
  
  const passwordHash = await sha256(password)
    .catch(() => runInternalError(req, res));
  if(undefined === passwordHash) return;

  const result = await pool
    .query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email", [name, email, passwordHash, user.id])
    .catch(() => runInternalError(req, res, "User not updated, pleadese verify the data or try again"));
  if(undefined === result) return;

  if(result.rowCount == 0 )
    return runInternalError(req, res, "User not updated, please try again");

  res.json(result.rows[0]);
};