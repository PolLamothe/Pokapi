import swaggerAutogen from 'swagger-autogen';
import CONFIG from "./const.js";

const outputFile = './swagger.json';
const endpointsFiles = ['./route.js'];

const config = {
    info: {
        title: 'pokapi-OPENAI API Documentation',
        description: '',
    },
    tags: [ ],
    host: CONFIG.HOST+':'+CONFIG.PORT+CONFIG.APIPATH,
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, config);
