import { GraphQLObjectType, GraphQLSchema } from "graphql";
import UserQuery, { UserMutation } from "./UserSchema";

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...UserQuery
    }
});

const mutation  = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...UserMutation
    }
})

const schema: GraphQLSchema = new GraphQLSchema ({
    query: RootQuery,
    mutation
});

export default schema;