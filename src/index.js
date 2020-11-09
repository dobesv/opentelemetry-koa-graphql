// @flow strict
import './tracer';

import Koa from 'koa'; // koa@2
import cors from '@koa/cors';

import type { Context } from 'koa'; // koa@2

import server from './server';

const app = new Koa();

app.proxy = true;

app.use(cors({ credentials: true }));

server.applyMiddleware({ app, cors: false });

app.listen({ port: 4000 });
