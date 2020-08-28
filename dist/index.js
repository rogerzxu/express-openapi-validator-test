"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importStar(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const dist_1 = require("express-openapi-validator/dist");
startServer();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        const swaggerDocument = yamljs_1.default.load('./campaign-openapi.yml');
        app
            .use('/api-docs', swagger_ui_express_1.default.serve)
            .get('/api-docs', swagger_ui_express_1.default.setup(swaggerDocument));
        app.use(body_parser_1.default.json());
        yield new dist_1.OpenApiValidator({
            apiSpec: './campaign-openapi.yml',
            validateRequests: true,
            validateResponses: true
        }).install(app);
        const router = express_1.Router();
        router.post('/campaign', function createCampaign(request, response) {
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
            console.log(`Swagger docs served at http://localhost:9000/api-docs`);
        });
    });
}
//# sourceMappingURL=index.js.map