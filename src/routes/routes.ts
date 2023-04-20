import { NextFunction, Request, Response } from "express";
import authController from "../controller/authController";
import cors from 'cors'
import { ORIGIN } from "../constant/RoutesConstant";
import * as express from 'express';
import userController from "../controller/userController";
import { graphqlHTTP } from 'express-graphql';
import schema from "../graphql/QueryAndMutation";

export default function globalRoutes (app:any) {
    let api_route = express.Router();
    app.use('/api', api_route);
    api_route.use((req:Request, res:Response, next:NextFunction) => {
        next();
        interceptor(api_route);
        authController(api_route)
        validators(api_route);
        api_route.use('/graphql',graphqlHTTP({
            schema: schema,
            graphiql: true,
        }))
        userController(api_route)
    });
}

function interceptor (app:any) {
    app.use(cors(ORIGIN))
    app.use((req:Request, res:Response, next:NextFunction) => {
        next();
    })
}

function validators (app:any) {
    app.use((req:Request, res:Response, next:NextFunction) => {
        //validate client token;
        next();
    });
}


