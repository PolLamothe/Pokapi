import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
    PORT: process.env.PORT || 8083,
    APIPATH: process.env.API_PATH || '/api/v0',
    HOST: process.env.HOST || "localhost",
    ENV: process.env.ENV || 'PROD',
    API_KEY : process.env.API_KEY || null,
    DATA_HOST : process.env.DATA_HOST || "localhost",
    DATA_PORT : process.env.DATA_PORT || "8081",
    DATA_API_PATH : process.env.DATA_API_PATH || "/api/v0",
    USER_HOST : process.env.USER_HOST || "localhost",
    USER_PORT : process.env.USER_PORT || "8082",
    USER_API_PATH : process.env.USER_API_PATH || "/api/v0"
}

export default CONFIG
