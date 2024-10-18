import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './config/database';

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


AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized")
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
}).catch((err) => {
    console.error("Error during Data Source initialization", err)
})