const graphql = require('graphql');
const Role = require('../models/roles');
const User = require('../models/users');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        rid: { type: GraphQLID },
        role: {
            type: RoleType,
            resolve(parent, args){
                return Role.findById(parent.rid);
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
                return User.find({ rid: parent.id });
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
                return User.findById(args.id);
            }
        },
        role: {
            type: RoleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Role.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
            }
        },
        roles: {
            type: new GraphQLList(RoleType),
            resolve(parent, args){
                return Role.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                rid: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    age: args.age,
                    rid: args.rid
                });
                return user.save();
            }
        },
        addRole: {
            type: RoleType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let role = new Role({
                    name: args.name,
                    description: args.description
                });
                return role.save();
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
