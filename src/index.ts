import express from 'express';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());

// Swagger setup
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Question Rotation API',
    version: '1.0.0',
    description: 'API for dynamic question assignment',
  },
  paths: {
    // Add your API paths here
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default app;