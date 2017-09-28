import express from 'express';
import http from 'http';
import config from 'dotenv/config';
import bodyParser from 'body-parser';
import rootPath from './routes/root';

const app = express();

// Cross Origin middleware
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*'), response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  ), response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'), next();
});

app.use(express.static('documentation'));

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3004;
app.set('port', port);
app.use(bodyParser.json());

/**
 * Add routes here
 */
app.use('/api/v1/', rootPath);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function() {
  console.log(`API running on localhost:${port}`);
});

export default server;
