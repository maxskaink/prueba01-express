import { request, response } from "express";
import { runInternalError, 
         runNotFound, 
         runUnauthorized } from "./error.controllers.js"
import pool from "../db/conection.js";

export const getFiles = async (req=request, res = response) => {
    const { id } = req.user;
    const userFiles =await  pool
        .query("SELECT id, name, create_at, size FROM files WHERE user_id = $1 ORDER BY create_at DESC", [id])
        .catch( e => runInternalError(req, res, e));
    
    if(!userFiles) return;

    if(userFiles.rowCount == 0)   
        return runNotFound(req, res, "Files not found for this user");

    const files = userFiles.rows.map(file => ({...file, path:`/files/${id}/${file.name}` }));
    
    res.json(files);
};

export const getFile = async (req = request, res = response) => {
    const { idUser, fileName } = req.params;

    if( idUser != req.user.id)
        return runUnauthorized(req, res, "You are not authorized to access this file");

    const filePath = await pool
        .query("SELECT path FROM files WHERE user_id = $1 AND name = $2", [idUser, fileName])
        .catch( e => runInternalError(req, res, e));

    if(!filePath) return;

    if(filePath.rowCount == 0)
        return runNotFound(req, res, `File '${fileName}' not found for this user`);
    
    res.download(filePath.rows[0].path);

};

export const postFile = async (req = request, res = response) => {
    const fileInfo = [
        req.file.filename,
        req.file.path,
        parseInt(req.file.size),
        req.user.id
    ];
    const response = await pool.
        query("INSERT INTO files (name, path, size, user_id) VALUES ($1, $2, $3, $4) RETURNING *", fileInfo)
        .catch( e => runInternalError(req, res, e));
    if(!response) return;

    const file = response.rows[0];
    res.json({ ...file });
};