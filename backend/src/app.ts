import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import routes from './routes';

const app: Application = express();

const NODE_ENV = process.env.NODE_ENV?.toLocaleLowerCase() || 'development';

const isDevMode = () => NODE_ENV === 'development';

if (isDevMode()) {
   console.log('Application running in development mode!');
}

if (!process.env.ALLOWED_ORIGINS) {
   throw new Error('ALLOWED_ORIGINS environment variable is required');
}

const allowedOrigins = process.env
   .ALLOWED_ORIGINS!.split(';')
   .map((origin) => origin.trim())
   .filter(Boolean);

app.use(
   cors({
      origin: (
         origin: string | undefined,
         callback: (error: Error | null, allowed?: boolean) => void
      ) => {
         if (!origin && NODE_ENV !== 'production') return callback(null, true);
         if (allowedOrigins.includes(origin!)) return callback(null, true);
         return callback(new Error('Not allowed by CORS.'));
      },
      credentials: true,
   })
);

app.use(express.json());
app.use(
   express.urlencoded({
      extended: true,
   })
);

app.use('/v1', routes);

app.get('/', (req: Request, res: Response) => {
   res.send('server is running');
});

export default app;
