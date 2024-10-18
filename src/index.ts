import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './config/database';
import {  swaggerUiSetup } from './config/swagger';
import cron from 'node-cron';
import questionRotationService from './services/questionRotationService';

const app = express();

app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUiSetup);

// API routes
app.get('/api/question', async (req: Request, res: Response) => {
  const { userId, region_id } = req.query;
  if (!userId || !region_id) {
    return res.status(400).json({ error: 'userId and regionId are required' });
  }

  try {
    const question = await questionRotationService.getQuestionForUser(parseInt(userId as string), parseInt(region_id as string));
    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//CronJob
// Schedule the creation of the next cycle every Monday at 7 PM SGT
cron.schedule('0 19 * * 1', async () => {
  try {
    await questionRotationService.createNextCycle();
    console.log('Next cycle created successfully');
  } catch (error) {
    console.error('Error creating next cycle:', error);
  }
}, {
  timezone: 'Asia/Singapore'
});

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