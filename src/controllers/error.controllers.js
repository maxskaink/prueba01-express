import Message from "../class/message.js";

export const runInternalError = (req, res) =>{
    res.status(500).json( new Message("Internal error"));
}

export const runNotUserFound = (req, res) =>{
    res.status(404).json(new Message("User not found"));
}

export const runInvalidFormat = (req, res) =>{
    res.status(400).json(new Message("Invalid format"));
}