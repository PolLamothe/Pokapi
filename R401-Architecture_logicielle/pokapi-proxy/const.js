import dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
    PORT: process.env.PORT || 8080,
    API_PATH: process.env.API_PATH || '/api/v0',
    HOST: process.env.HOST || "localhost",
    ENV: process.env.ENV || 'PROD',
    POKAPI_DATA_URL: process.env.POKAPI_DATA_URL || 'http://localhost:8081/api/v0',
    POKAPI_USER_URL: process.env.POKAPI_USER_URL || 'http://localhost:8082/api/v0',
    POKAPI_OPENAI_URL: process.env.POKAPI_OPENAI_URL || 'http://localhost:8083/api/v0',
    LOGS: process.env.LOGS || true,
}

export default CONFIG