# Dynamic Question Assignment System

This system is designed to assign questions to users based on their region and a configurable cycle duration. It's built using Node.js with TypeScript, TypeORM, and PostgreSQL, and is containerized using Docker for easy deployment and scaling. The project uses pnpm as the package manager and includes Swagger UI for API documentation.

## Architecture

The system consists of the following components:

1. **PostgreSQL Database**: Stores questions, regions, cycles, and question assignments.
2. **Node.js Application with TypeScript**: Handles the business logic for question rotation and assignment.
3. **TypeORM**: Provides an abstraction layer for database operations and ORM capabilities.
4. **Express.js API**: Provides an endpoint for retrieving questions for users.
5. **Cron Job**: Automatically creates new cycles and assigns questions.
6. **Swagger UI**: Provides interactive API documentation.


## Design Considerations

1. **Type Safety**: The system uses TypeScript to provide better type checking and improve code quality.
2. **Scalability**: The system is designed to handle 100k daily active users (DAU) and can scale to support millions of global users.
3. **Flexibility**: Cycle duration is configurable and stored in the database.
4. **Consistency**: Database transactions ensure that question assignments are atomic and consistent across regions.
5. **Efficiency**: Questions are pre-assigned to cycles, reducing the load on read operations.
6. **API Documentation**: Swagger UI provides interactive documentation for the API.

## Pros and Cons

### Pros:
1. Strong type safety with TypeScript.
2. Scalable design that can handle millions of users.
3. Flexible configuration for cycle duration and regions.
4. Efficient read operations for retrieving user questions.
5. Dockerized for easy deployment and scaling.
6. Interactive API documentation with Swagger UI.
7. Fast and efficient package management with pnpm.

### Cons:
1. Relies on a single PostgreSQL database, which could become a bottleneck at extremely high scales.
2. The weekly cron job for creating new cycles could potentially cause a spike in database activity.


## Potential Improvements

1. Implement database sharding for even greater scalability.
2. Add a caching layer (e.g., Redis) to reduce database load for frequently accessed data.
3. Implement a more sophisticated question selection algorithm that takes into account user history or preferences.
4. Add monitoring and alerting for system health and performance.



## Database Setup - migrations does not work need some work

To set up the database and populate it with initial data, follow these steps:

1. Ensure your PostgreSQL database is running and accessible if running locally or use the   `docker-compose up --build`


These steps will create the necessary tables and populate them with sample data.

## Running the Project

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up the database (see Database Setup section)
4. Run the development server: `pnpm run dev`
5. The API will be available at `http://localhost:3000`
6. Access Swagger UI at `http://localhost:3000/api-docs`

## Development

- Run in development mode: `pnpm run dev`
- Build the project: `pnpm run build`
- Run tests: `pnpm test`
- Generate a new migration: `pnpm run migration:generate -- src/migration/MigrationName`
- Run migrations: `pnpm run migration:run`
- Revert last migration: `pnpm run migration:revert`

## Docker Setup

To run the project using Docker:

1. Ensure Docker and Docker Compose are installed on your system.
2. Build and start the containers: `docker-compose up --build`
3. The API will be available at `http://localhost:3000`
4. Access Swagger UI at `http://localhost:3000/api-docs`


## There is some issue with migration so do the following in order to run the project properly

1. `docker ps`
2. `docker exec -it <pg_container_id> bash`
3. `psql -U user -d question_rotation`
4. Copy and paste from `seed.sql `file one by one.



## API Usage

To get a question for a user:

```
GET /api/question?userId=123&regionId=1
```

This will return the current question for the specified user and region.

For detailed API documentation, visit the Swagger UI at `http://localhost:3000/api-docs` when the server is running.