import swaggerAutogen from 'swagger-autogen';
import CONFIG from './const.js'

const outputFile = './swagger.json';
const endpointsFiles = ['./api/route/*.js'];

const config = {
    info: {
        title: 'pokapi-data API Documentation',
        description: 'Cette API est responsable de la gestion des cartes Pokémon',
    },
    tags: [
        {
            name: 'Data'
        }
    ],
    servers: [
        {
            url: 'http://'+CONFIG.HOST+':'+CONFIG.PORT+CONFIG.API_PATH,
            description: "Serveur hébergé sur le réseau de l'IUT de Nantes nécessite un VPN."
        },
    ],
    host: CONFIG.HOST+':'+CONFIG.PORT+CONFIG.API_PATH,
    schemes: ['http'],
    components: {
        schemas: {
            Error: {
                $message: 'error message'
            },
        },
        '@schemas': {
            ListString: {
                type: 'array',
                items: {
                    type: 'string',
                    example: 'fire',
                }
            }
        },
        responses: {
            APIError: {
                description: "Une erreur est survenue avec l'API externe api.pokemontcg.io",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/Error"
                        }
                    }
                }
            },
        }
    },
};

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, config);
