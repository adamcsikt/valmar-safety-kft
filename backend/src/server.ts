import http from 'http';
import app from './app';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

const gracefulShutdown = (signal: string) => {
   console.log(`${signal} signal received: closing HTTP server`);
   server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
   });

   setTimeout(() => {
      console.error(
         'Could not close connections in time, forcefully shutting down'
      );
      process.exit(1);
   }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
   console.error('Uncaught Exception:', err);
   process.exit(1);
});

process.on('unhandledRejection', (reason) => {
   console.error('Unhandled Rejection:', reason);
   process.exit(1);
});
