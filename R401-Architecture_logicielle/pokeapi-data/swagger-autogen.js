import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv'

dotenv.config()

const serverPort = process.env.PORT || 8080
const APIPATH = process.env.API_PATH || '/api/v0'
const HOST = process.env.HOST || "localhost"

const outputFile = './swagger.json';
const endpointsFiles = ['./api/route/*.js'];

const config = {
    info: {
        title: 'pokeapi-data API Documentation',
        description: '',
    },
    tags: [ ],
    host: HOST+':'+serverPort+APIPATH,
    schemes: ['http',],
};

swaggerAutogen(outputFile, endpointsFiles, config);
