import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
    PORT: process.env.PORT || 8080,
    APIPATH: process.env.API_PATH || '/api/v0',
    HOST: process.env.HOST || "localhost",
    ENV: process.env.ENV || 'PROD',
    API_KEY : process.env.API_KEY || null
}

export default CONFIG
