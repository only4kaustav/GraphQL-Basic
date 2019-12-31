const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema-mdb');
const mongoose = require('mongoose');

const app = express();

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb+srv://root:localhostroot@cluster0-xsoak.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {console.log('Conneted to database')});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Now listening for requests on port 3000');
});
