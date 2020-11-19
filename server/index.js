// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';
import Pug from 'pug';
// import socket from 'socket.io';
import fastify from 'fastify';
import fastifySocketIo from 'fastify-socket.io';
import pointOfView from 'point-of-view';
import fastifyStatic from 'fastify-static';
// import _ from 'lodash';
import addRoutes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const appPath = path.join(__dirname, '..');
const isDevelopment = !isProduction;

const setUpViews = (app) => {
  const domain = isDevelopment ? 'http://localhost:8080' : '';
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    defaultContext: {
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    templates: path.join(__dirname, 'views'),
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(appPath, 'dist/public'),
    prefix: '/assets',
  });
};

export default (options) => {
  const app = fastify({ logger: { prettyPrint: true } });

  app.register(fastifySocketIo);
  setUpViews(app);
  setUpStaticAssets(app);

  addRoutes(app, options.state || {});

  return app;
};
