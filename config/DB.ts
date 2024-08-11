
export const USER_DB: string  = process.env.USER_DB
    ? process.env.USER_DB  
    : 'postgres';
export const HOST_DB: string  = process.env.HOST_DB
    ? process.env.HOST_DB
    : 'db';
export const PASSWORD_DB: string  = process.env.PASSWORD_DB
    ? process.env.PASSWORD_DB
    : 'admin';
export const DATABASE: string  = process.env.DATABASE
    ? process.env.DATABASE
    : 'dbapi';
export const PORT_DB: number  = process.env.PORT_DB
    ? parseInt(process.env.PORT_DB)
    : 5432;