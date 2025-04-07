import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

const CONFIG = {
    PORT: process.env.PORT || 8082,
    API_PATH: process.env.API_PATH || '/api/v0',
    HOST: process.env.HOST || "localhost",
    ENV: process.env.ENV || 'PROD',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017',
    MONGO_DB: process.env.MONGO_DB || 'pokapiUserDB',
    JWT_SECRET: process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex'),
    JWT_EXPIRES: process.env.JWT_EXPIRES || '2d',
    POKAPI_DATA_URL: process.env.POKAPI_DATA_URL || 'http://localhost:8081/api/v0',
    PROXY: process.env.PROXY || undefined,
    LOGS: process.env.LOGS || true,
}

export default CONFIG