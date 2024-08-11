export const PORT: number = process.env.PORT 
    ? parseInt(process.env.PORT as string )
    : 3000;

    export const TOKEN_SECRET: string = process.env.TOKEN_SECRET
    ? process.env.TOKEN_SECRET as string
    : "mySecret!#$";

export const PATH_TO_UPLOADS = process.env.PATH_TO_UPLOADS
    ? process.env.PATH_TO_UPLOADS as string
    : "./public/files";