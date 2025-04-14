import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
    PORT: process.env.PORT || 8082,
    API_PATH: process.env.API_PATH || '/api/v0',
    HOST: process.env.HOST || "localhost",
    ENV: process.env.ENV || 'PROD',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017',
    MONGO_DB: process.env.MONGO_DB || 'pokapiDataDB',
    API_POKEMON_KEY: process.env.API_POKEMON_KEY || undefined,
    PROXY: process.env.PROXY || undefined,
    CACHE_EXPIRATION : process.env.CACHE_EXPIRATION || 86400,
    LOGS: process.env.LOGS || true,
}

export default CONFIG