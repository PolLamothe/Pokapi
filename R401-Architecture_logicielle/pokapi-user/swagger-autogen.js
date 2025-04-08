import swaggerAutogen from 'swagger-autogen';
import CONFIG from './const.js'

const outputFile = './swagger.json';
const endpointsFiles = ['./api/route/*.js'];

const config = {
    info: {
        title: 'pokapi-user API Documentation',
        description: 'Cette API est responsable de la gestion des utilisateurs',
    },
    tags: [
        {
            name: 'User'
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
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            Login: {
                $login: 'johnDoe',
                $password: 'pswd1234',
            },
            Register: {
                $login: 'johnDoe',
                $pseudo: 'John Doe',
                $password: 'pswd1234',
            },
            Update: {
                pseudo: 'John Doe',
                password: 'pswd1234',
            },
            UserInfo: {
                $login: 'johnDoe',
                $pseudo: 'John Doe',
            },
            Token: {
                $token: 'valid.jwt.token',
            },
            UserDeleted: {
                $message: "User deleted"
            },
            Error: {
                $message: 'error message'
            },
            UnauthorizedError: {
                $message : "Unauthorized : invalid or missing authentication token"
            },
            Card: {
                $id: 'xy1-1',
                $quantity: 3,
            },
            CardId: {
                $id: 'xy1-1',
            }
        },
        '@schemas': {
            ListUserInfo: {
                type: "object",
                properties: {
                    count: {
                        type: 'integer',
                        example: "5"
                    },
                    data: {
                        type: 'array',
                        items: {
                            type: "object",
                            properties: {
                                login: {
                                    type: 'string',
                                    example: 'johnDoe',
                                },
                                pseudo: {
                                    type: "string",
                                    example: 'John Doe',
                                }
                            }
                        }
                    }
                }
            },
            ListId: {
                type: 'array',
                items: {
                    type: "string",
                    example: "xy1-1"
                }
            }
        },
        responses: {
            UnauthorizedResponse: {
                description: "Accès refusé",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/UnauthorizedError"
                        }
                    }
                }
            },
            NewToken: {
                description: "Jeton d'authentification actualisé",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/Token"
                        }
                    }
                }
            },
            APIError: {
                description: "Une erreur est survenue avec l'API de gestion des cartes Pokapi-data",
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
