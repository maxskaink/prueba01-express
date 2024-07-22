import { response, request } from "express";
import pool from "../db/conection.js";
import { sha256 } from "../utils/encrypt.js";
import { runInternalError,
         runNotUserFound,
         runInvalidFormat
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