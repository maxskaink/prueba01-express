import Message from "../class/message.js";

export const runInternalError = (req, res, extraInfo) =>{
    res.status(500).json( new Message("Internal error", extraInfo));
}

export const runNotUserFound = (req, res) =>{
    res.status(404).json(new Message("User not found"));
}

export const runInvalidFormat = (req, res, extraInfo) =>{
    res.status(400).json(new Message("Invalid format", extraInfo));
}

export const runMissingFields = (req, res, extraInfo) =>{
    res.status(400).json(new Message("Missing fields", extraInfo));
}

export const runUnauthorized = (req, res, extraInfo) =>{
    res.status(401).json(new Message("Unauthorized", extraInfo));
}

export const runNotImplemented = (req, res, extraInfo) =>{
    res.status(501).json(new Message("Not Implemented", extraInfo));
}