import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';

import schema from './graphql/schema';

const server = express();
server.use(cors());

mongoose.connect('mongodb://localhost/graphqlserver');
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
})

server.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
server.use('/graphql', bodyParser.json(), graphqlExpress({schema: schema}));

server.listen(4000, () => {
  console.log('Server started on port 4000');
});
