import { Request } from "express";
import { UserLog } from "./user";

export interface RequestCreateUser extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    }
}
export interface RequestGetUserById extends Request {
    params:{
        idUser: string;
    }
}

export  interface RequestGetUsers extends Request {
    query: {
        page: string ;
        pageSize: string;
    }
} 
export interface RequestLogUser extends Request{
    user: UserLog;
}

export interface RequestLoginUser extends Request {
    body: {
        email: string;
        password: string;
    }
}

export interface RequestJWT extends Request {
    headers:{
        jwt: string | undefined;
    }
}