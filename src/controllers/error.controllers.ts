import Message from "../class/message.ts";
import { Request, Response } from "express";

export const runInternalError = (req: Request, res:Response, extraInfo?: string) =>{
    res.status(500).json(new Message('Internal Error', extraInfo));
}

export const runNotUserFound = (req:Request, res:Response) =>{
    res.status(404).json(new Message("User not found"));
}

export const runInvalidFormat = (req:Request, res:Response, extraInfo?: string) =>{
    res.status(400).json(new Message("Invalid format", extraInfo));
}

export const runMissingFields = (req:Request, res:Response, extraInfo?: string) =>{
    res.status(400).json(new Message("Missing fields", extraInfo));
}

export const runUnauthorized = (req:Request, res:Response, extraInfo?: string) =>{
    res.status(401).json(new Message("Unauthorized", extraInfo));
}

export const runNotImplemented = (req:Request, res:Response, extraInfo?: string) =>{
    res.status(501).json(new Message("Not Implemented", extraInfo));
}

export const runNotFound = (req:Request, res:Response, extraInfo?: string) =>{
    res.status(404).json(new Message("Not Found", extraInfo));
};