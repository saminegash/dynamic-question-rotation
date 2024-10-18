import { DataSource } from "typeorm";
import { QuestionAssignment } from "../entities/questionAssignment";
import { Cycle } from "../entities/cycle";
import { Region } from "../entities/region";
import { Question } from "../entities/question";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Question, Region, Cycle, QuestionAssignment],
  synchronize: true,
  logging: true,
});
