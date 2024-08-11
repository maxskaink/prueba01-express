import { Response, Request } from "express";
import { RequestGetUsers,
         RequestGetUserById,
         RequestCreateUser,
         RequestLogUser,
         RequestLoginUser,
         RequestJWT,
 } from "../models/requestUsers";
import pool from "../db/conections.ts";

import { sha256, makeJWT, verifyJWT } from "../utils/encrypt.ts";

import { runInternalError,
         runNotUserFound,
         runInvalidFormat,
         runUnauthorized,
         runNotImplemented,
 } from "./error.controllers.ts";
import { QueryResult } from "pg";
import { JwtPayload } from "jsonwebtoken";


export const getUsers = async ( req: RequestGetUsers, res: Response ) => {
    const numberPage = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    if(isNaN(numberPage) || isNaN(pageSize))
        return runInvalidFormat(req, res);
    if(numberPage < 1 || pageSize < 1)
        return runInvalidFormat(req, res);

    const query =
    `SELECT * FROM users 
     ORDER BY ID LIMIT ${pageSize} 
     OFFSET ${(numberPage - 1) * pageSize}`;
    
    pool
        .query(query)
        .then((response: QueryResult<any>) => res.status( (response.rowCount||0) > 0 ? 200 : 404 ).json({
            numberOfUsers: response.rowCount,
            page:numberPage,
            pageSize: pageSize,
            users: response.rows.map( user =>{ delete user.password; return user; })
        }))
        .catch( (err) => runInternalError(req, res, err) );
}

export const getUserById = async ( req: RequestGetUsers, res: Response ) => {
    const id = parseInt(req.params.idUser);

    if(isNaN(id))
        return runInvalidFormat(req, res);

    pool.query(`SELECT * FROM users WHERE id = $1`, [id])
        .then( (response) => {
            if(response.rowCount === 0)
                return runNotUserFound(req, res);
            else{
                delete response.rows[0].password;
                res.status(200).json(response.rows[0]);
            }
        })
        .catch( (err) => runInternalError(req, res, err) );
}

export const createUser = async ( req:RequestCreateUser, res:Response ) => {
    const { name, email, password } = req.body;
    
    const passwordHash: string | void = await sha256(password)
        .catch( (err) => runInternalError(req, res, err) );
    
    if(!passwordHash) return;

    const result = await pool
        .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, passwordHash])
        .catch( (err) => runInternalError(req, res, err.detail) );
    if(undefined == result) return;

    if(result.rowCount === 0)
        return runInternalError(req, res, "User not created, please try again");
    delete result.rows[0].password;

    res.status(200).json(result.rows[0]);
}

export const loginUser = async ( req: RequestLoginUser, res: Response ) => {
    const { email, password } = req.body;

    const passwordHash = await sha256(password)
        .catch( (err) => runInternalError(req, res, err) );
    
    if(passwordHash == undefined) return;

    const result = await pool
        .query(`SELECT id, name, email FROM users WHERE email = $1 AND password = $2`, [email, passwordHash])
        .catch( (err) => runInternalError(req, res, err) );
    
    if(undefined == result) return;

    if(result.rowCount === 0 )
        return runUnauthorized(req, res, "The password or email are incorrect");

    const jwt = await makeJWT(result.rows[0] as RequestLogUser)
        .catch( (err) => runInternalError(req, res, err) );
    if(undefined == jwt) return;
    const response ={
        message: "User logged in",
        jwt
    };

    res.json(response);
};

export const updateUser = async( req: RequestCreateUser, res: Response ) => {
    const {jwt} = req.headers;

    const{ name, email, password } = req.body;

    const user = await verifyJWT(jwt as string)
        .catch( err => runUnauthorized(req, res, "Invalid jwt") );
    if(undefined == user) return;

    const passwordHash = await sha256(password)
        .catch( (err) => runInternalError(req, res, err) );
    if(undefined == passwordHash) return;

    const result = await pool
        .query(`UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`, [name, email, passwordHash, (user as JwtPayload).id ])
        .catch( (err) => runInternalError(req, res, "User not updated, please verify the data or try again") );
    if(undefined == result) return;

    if(result.rowCount === 0)
        return runInternalError(req, res, "User not updated, please try again");

    res.json(result.rows[0]);

}

export const patchUser = async (req: RequestCreateUser, res: Response) => {
    const {jwt} = req.headers;
    const {name, email, password} = req.body;
  
    const user = await verifyJWT(jwt as string)
      .catch(() => runUnauthorized(req, res, "Invalid JWT"));
    if(undefined == user) return;
    
    if(password){
      const passwordHash = await sha256(password)
        .catch(() => runInternalError(req, res));
      if(undefined === passwordHash) return;
  
      const result = await pool
        .query("UPDATE users SET password = $1 WHERE id = $2 RETURNING id, name, email", [passwordHash, (user as JwtPayload).id])
        .catch(() => runInternalError(req, res, "User not updated, pleadese verify the data or try again"));
      if(undefined === result) return;
    }
  
    if(name){
      const result = await pool
        .query("UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email", [name, (user as JwtPayload).id])
        .catch(() => runInternalError(req, res, "User not updated, pleadese verify the data or try again"));
      if(undefined === result) return;
    }
    if(email){
      const result = await pool
        .query("UPDATE users SET email = $1 WHERE id = $2 RETURNING id, name, email", [email, (user as JwtPayload).id])
        .catch(() => runInternalError(req, res, "User not updated, pleadese verify the data or try again"));
      if(undefined === result) return;
    }
  
    const result = await pool
      .query("SELECT id, name, email FROM users WHERE id = $1", [(user as JwtPayload).id])
      .catch(() => runInternalError(req, res));
    return res.json((result as QueryResult).rows[0]);
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
    const {jwt} = req.headers;
    const user = await verifyJWT(jwt as string)
      .catch(() => runUnauthorized(req, res, "Invalid JWT"));
    if(undefined == user) return;
  
    return runNotImplemented(req, res, "This feature is not implemented, may be another day");
  };