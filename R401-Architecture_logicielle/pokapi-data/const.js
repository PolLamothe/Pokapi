import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
    PORT: process.env.PORT || 8082,
    APIPATH: process.env.API_PATH || '/api/v0',
    HOST: process.env.HOST || "localhost",
    ENV: process.env.ENV || 'PROD',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017',
    MONGO_DB: process.env.MONGO_DB || 'pokapiDataDB',
    API_POKEMON_KEY: process.env.API_POKEMON_KEY || undefined
}

export default CONFIG