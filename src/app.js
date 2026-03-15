const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger.js');
const routes = require('./routes');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes(app);

module.exports = app;
