const graphql = require('graphql');
const schema_data =  require('./schema_data');
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
        role: {
            type: RoleType,
            resolve(parent, args){
                return _.find(schema_data.roles, { id: parent.rid });
            }
        }
    })
});

const RoleType = new GraphQLObjectType({
    name: 'Role',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return _.filter(schema_data.users, { rid: parent.id });
            }
        }
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
        role: {
            type: RoleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(schema_data.roles, { id: args.id });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return schema_data.users;
            }
        },
        roles: {
            type: new GraphQLList(RoleType),
            resolve(parent, args){
                return schema_data.roles;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
