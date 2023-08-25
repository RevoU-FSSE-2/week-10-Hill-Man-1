require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const dbMiddleware = require('./middleware/db-middleware');
const authRouter = require('./routes/auth-routes');
const transferRouter = require('./routes/transfer-routes');
const authMiddleware = require('./middleware/auth-middleware');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yaml')
const fs = require('fs')
const OpenApiValidator = require('express-openapi-validator');

const openApiPath = './doc/openapi.yaml'
const file = fs.readFileSync(openApiPath, 'utf8')
const swaggerDocument = yaml.parse(file)

const app = express()

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(OpenApiValidator.middleware({
    apiSpec: openApiPath,
    validateRequests: true,
}))

app.use(dbMiddleware);

app.get('/', (req, res) => {
    res.send('This is an Interbanking App');
});

// Use the authentication and transfer routers
app.use('/auth', authRouter);
app.use('/transfer', transferRouter);

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Handle other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
