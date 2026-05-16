const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'streaming',
      version: '1.0.0',
      description: 'API documentation for streaming app',
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? process.env.PROD_API_URL
            : process.env.DEV_API_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.resolve(__dirname, '../../routes/**/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;