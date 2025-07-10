import { Handler } from '@netlify/functions';
import express from 'express';
import { registerRoutes } from '../../server/routes';

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all routes
const server = await registerRoutes(app);

// Netlify function handler
export const handler: Handler = async (event, context) => {
  // Convert Netlify event to Express request
  const { httpMethod, path, queryStringParameters, body, headers } = event;
  
  // Create a mock request object
  const req = {
    method: httpMethod,
    url: path,
    query: queryStringParameters || {},
    body: body ? JSON.parse(body) : {},
    headers: headers || {},
    path: path,
  } as any;

  // Create a mock response object
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    status: function(code: number) {
      this.statusCode = code;
      return this;
    },
    json: function(data: any) {
      this.body = JSON.stringify(data);
      this.headers['Content-Type'] = 'application/json';
      return this;
    },
    send: function(data: any) {
      this.body = typeof data === 'string' ? data : JSON.stringify(data);
      return this;
    },
    setHeader: function(name: string, value: string) {
      this.headers[name] = value;
      return this;
    },
  } as any;

  // Handle the request through Express
  try {
    // Find matching route
    const route = app._router.stack.find((layer: any) => {
      if (layer.route) {
        return layer.route.path === path && layer.route.methods[httpMethod.toLowerCase()];
      }
      return false;
    });

    if (route) {
      await route.handle(req, res, () => {});
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  // Return Netlify response format
  return {
    statusCode: res.statusCode,
    headers: res.headers,
    body: res.body,
  };
}; 