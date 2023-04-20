import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { stringToObjectID } from "../helper/helper";
import User from '../models/model/User';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        lastName: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
        mobile: {type: GraphQLString}
    })
});

const UserQuery = Object.freeze(
    {
        user: {
            type: UserType,
            args: {_id: {type: GraphQLID}},
            resolve (parent:any, args:any) {
                return User.userById(args._id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve (parent:any , args:any) {
                return User.getAllUsers();
            }
        }
    }
);

export const UserMutation = {
    createUser: {
        type: UserType,
        args: {
            firstName: {type: GraphQLString},
            lastName: {type: GraphQLString},
            email: {type: GraphQLString},
            password: {type: GraphQLString},
            mobile: {type: GraphQLString}
        },
        resolve: (parent:any, args:any) => {
            return User.register({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                password: args.password,
                mobile: args.mobile
            })
        }
    }
} as const;

export default UserQuery;