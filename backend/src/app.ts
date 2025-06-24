import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

const app: Application = express();

const whiteList = ['*', 'http://localhost:4200'];
const corsOptions = {
   origin: (
      origin: string | undefined,
      callback: (error: Error | null, allowed?: boolean) => void
   ) => {
      if (whiteList.indexOf(origin!) !== -1 || whiteList.includes('*')) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS.'));
      }
   },
   credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(
   express.urlencoded({
      extended: true,
   })
);

app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
   res.send('server is running');
});

export default app;
