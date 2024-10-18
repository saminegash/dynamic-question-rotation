import swaggerUi from "swagger-ui-express";

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Question Rotation API",
    version: "1.0.0",
    description: "API for dynamic question assignment system",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  paths: {
    "/api/question": {
      get: {
        summary: "Get a question for a user",
        parameters: [
          {
            in: "query",
            name: "userId",
            required: true,
            schema: {
              type: "string",
            },
            description: "The ID of the user",
          },
          {
            in: "query",
            name: "region_id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "The ID of the region",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    question: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const swaggerUiOptions = {
  explorer: true,
};

export const swaggerUiSetup = swaggerUi.setup(
  swaggerDocument,
  swaggerUiOptions
);
