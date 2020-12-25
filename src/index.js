// @flow strict
import Koa from 'koa'; // koa@2
import cors from '@koa/cors';
import server from './server';

const app = new Koa();
app.proxy = true;
app.use(cors({ credentials: true }));
server.applyMiddleware({ app, cors: false });
app.listen({ port: 4000 });
console.log('Now go to http://localhost:4000/graphql and use the playground to run queries')
