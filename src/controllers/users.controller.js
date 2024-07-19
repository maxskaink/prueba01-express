import { response } from "express";
import pool from "../db/conection.js";
import { runInternalError,
         runNotUserFound,
         runInvalidFormat
 } from "./error.controllers.js";

export const getUsers = async (req, res) => {

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
      users: response.rows
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
      else res.json(response.rows[0]);
    })
    .catch(() => runInternalError(req, res));
};
