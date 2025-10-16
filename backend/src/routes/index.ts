import { Express } from "express";
import add_user  from "./addUser";
import product from "./product";

export const setRoutes = (app:Express) =>{
    app.use('/api',add_user );
    app.use('/api',product );
    
} 