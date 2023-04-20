import { Document, Model, ObjectId } from "mongoose";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
}

export interface IUserDocument extends IUser , Document { }

export interface IUserModel extends Model<IUserDocument> {
    login(user:IUser): Promise<IUser>
    register(user:IUser): Promise<IUser>
    getAllUsers(): Promise<[IUser]>
    userById(_id: ObjectId): Promise<IUser>
}
