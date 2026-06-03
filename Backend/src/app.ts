import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import rollRoutes from './routes/roll.routes';
import { limiter, requireJson, notFound, errorHandler } from './middlewares';

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' })); // origine du frontend Vite
app.use(limiter);
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(requireJson);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/rolls', rollRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;