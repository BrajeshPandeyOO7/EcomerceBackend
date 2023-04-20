import { NextFunction, Request, Response } from "express";
import { ROUTES_URL } from "../constant/RoutesConstant";
import { sendResponse } from "../helper/helper";
import * as express from 'express'
import User from "../models/model/User";
 
export default function nauthController(app:any){
    let authRouter = express.Router();
    app.use('/auth',authRouter);
    authRouter.use((req:Request, res:Response, next:NextFunction) => {
        next();
        userCreate(authRouter, ROUTES_URL.USER_CREATE);
        userLogin(authRouter, ROUTES_URL.USER_LOGIN);
    })
    
}

const userLogin = (app:any, path:string) => {
    app.post(path, async (req:Request, res:Response) => {
        let user = req.body;
        let result = user ? await User.login(user) : "Body is missing!";
        res.send(sendResponse(result));
    });
}

const userCreate = (app:any, path:string) => {
    app.post(path, async (req:Request, res:Response) => {
        let body = req.body;
        let result = body ? await User.register(body) : "Something wrong"
        res.send(sendResponse(result));
    });
}