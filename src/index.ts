import bodyParser from 'body-parser';
import express, {Router} from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import {OpenApiValidator} from "express-openapi-validator/dist";

startServer();

async function startServer() {
    const app = express();

    const swaggerDocument = YAML.load('./campaign-openapi.yml');
    app
        .use('/api-docs', swaggerUi.serve)
        .get('/api-docs', swaggerUi.setup(swaggerDocument));

    app.use(bodyParser.json());

    await new OpenApiValidator({
        apiSpec: './campaign-openapi.yml',
        validateRequests: true,
        validateResponses: true
    }).install(app);

    const router = Router();
    router.post('/campaign', function createCampaign(request: express.Request, response: express.Response) {
        return response.status(200).json({
            id: 1,
            name: request.body.name,
            description: request.body.description,
            startDate: request.body.startDate,
            endDate: request.body.endDate,
            createdAt: new Date().toJSON(),
            updatedAt: new Date().toJSON()
        });
    });
    app.use(router);

    app.listen(9000, '0.0.0.0', function () {
        console.log(`Started server on port 9000`);
        console.log(`Swagger docs served at http://localhost:9000/api-docs`)
    });
}
