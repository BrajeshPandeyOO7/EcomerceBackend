import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";
import { logsError, verifyGmail, verifyMobile } from "../../helper/helper";
import { IUser, IUserDocument, IUserModel } from "../imodel/IUser";

const UserSchema: Schema = new Schema({
    firstName: {type: Schema.Types.String},
    lastName: {type: Schema.Types.String},
    email: {type: Schema.Types.String},
    password: {type: Schema.Types.String},
    mobile: {type: Schema.Types.String}
})

UserSchema.index({_id: -1, email: -1});

UserSchema.statics.login = async function (user:IUser) {
    try {
        const { email, password } = user;
        let user_data = email && password ? await this.findOne({email, password}, {email}).lean().exec() : 'Invaild Credential!';
        return user_data;
    } catch (error) {
        logsError(error);  
        return 'Server Error'
    }
} 

UserSchema.statics.register = async function (user: IUser) {
    try {
        const { email , mobile = '0', password, firstName, lastName} = user;

        let [ user_data ] = await this.find({ $or: [
            {email},
            {mobile}
        ]}).lean().exec();
        console.log(email,': ',verifyGmail(email))
        return !user_data 
            && email && verifyGmail(email)
            && password && verifyMobile(mobile)
            && firstName
            && lastName ? await new User(user).save() : 'Try With Valid Cred.';

    } catch (error) {
        logsError(error);  
        return 'Server Error'
    }
}

UserSchema.statics.userById = async function (_id: ObjectId) {
    try {
        return await this.findById({_id}).lean().exec(); 
    } catch (error) {
        logsError(error);  
        return 'Server Error'
    }
}

UserSchema.statics.getAllUsers = async function () {
    try {
        return await this.find({}).lean().exec(); 
    } catch (error) {
        logsError(error);  
        return 'Server Error'
    }
} 

const User: IUserModel = model<IUserDocument, IUserModel>('users', UserSchema);
export default User;


