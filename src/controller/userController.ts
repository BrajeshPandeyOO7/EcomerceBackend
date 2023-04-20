import * as express from 'express';
import { NextFunction, Request, Response } from "express";
import { ROUTES_URL } from '../constant/RoutesConstant';
import { sendResponse } from '../helper/helper';
import User from '../models/model/User';

export default function userController (app:any) {
    let user_route = express.Router();
    app.use('/user',user_route);
    user_route.use((req:Request, res:Response, next:NextFunction) => {
        next();
        getAllUser(user_route, ROUTES_URL.USER_GET_ALL)
    })
}

const getAllUser = (app:any,path:string) => {
    app.get(path, async (req:Request, res:Response) => {
        let users = await User.getAllUsers();
        res.send(sendResponse(users))
    });
}