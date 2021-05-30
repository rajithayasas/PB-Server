import express from 'express';

import morgan from 'morgan';

import cors from 'cors';

import routes from './routes';

import middlewares from './middlewares';

const app = express();

app.use(morgan('dev'));

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/api/v1', routes);

// Error Handlers
app.use(middlewares.errorConverted);
app.use(middlewares.notFoundError);
app.use(middlewares.errorHandler);

export default app;
