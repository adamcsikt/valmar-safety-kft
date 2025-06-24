import http from 'http';
import app from './app';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

// Optional: graceful shutdown handling
process.on('SIGTERM', () => {
   console.log('SIGTERM signal received: closing HTTP server');
   server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
   });
});
