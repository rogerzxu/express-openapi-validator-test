import express, {Router} from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import {OpenApiValidator} from "express-openapi-validator/dist";

const app = express();

const swaggerDocument = YAML.load('./campaign-openapi.yml');

app
    .use('/api-docs', swaggerUi.serve)
    .get('/api-docs', swaggerUi.setup(swaggerDocument));

new OpenApiValidator({
    apiSpec: './campaign-openapi.yml',
    validateRequests: true,
    validateResponses: true
}).installSync(app);

const router = Router();

router.post('/campaign', function createCampaign(request: express.Request, response: express.Response) {
    return response.status(200).json({
        id: 1,
        name: "name",
        description: "description",
        startDate: new Date(),
        endDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    });
});

app.use(router);

app.listen(9000, '0.0.0.0', function () {
    console.log(`Started server on port 9000`);
});
