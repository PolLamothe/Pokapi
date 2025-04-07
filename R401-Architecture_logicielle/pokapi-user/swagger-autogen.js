import swaggerAutogen from 'swagger-autogen';
import CONFIG from './const.js'

const outputFile = './swagger.json';
const endpointsFiles = ['./api/route/*.js'];

const config = {
    info: {
        title: 'pokapi-user API Documentation',
        description: '',
    },
    tags: [ ],
    host: CONFIG.HOST+':'+CONFIG.PORT+CONFIG.API_PATH,
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, config);
