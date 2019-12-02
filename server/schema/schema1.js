const graphql = require('graphql');
const schema_data =  require('./schema_data1');
const _ = require('lodash');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        uid: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(schema_data.users, { uid: args.id });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return schema_data.users;
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
