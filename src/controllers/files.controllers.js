import { request, response } from "express";
import { runInternalError } from "./error.controllers.js"
import pool from "../db/conection.js";

export const postFile = async (req = request, res = response) => {

    const fileInfo = [
        req.file.fieldname,
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