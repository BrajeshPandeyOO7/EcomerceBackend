import { NextFunction, Request, Response } from "express"

export function logErrors (err:any, req:Request, res:Response, next:NextFunction) {
    console.error(err.stack)
    next(err)
}

export function clientErrorHandler (err:any, req:Request, res:Response, next:NextFunction) { 
  if (req.xhr) {
      res.status(500)
      res.send({ error: 'Something failed!' })
    } else {
      next(err)
    }
}

export function errorHandler (err:any, req:Request, res:Response, next:NextFunction) {
    res.statusCode  = 500;
    res.send('Internal Server Error')
}