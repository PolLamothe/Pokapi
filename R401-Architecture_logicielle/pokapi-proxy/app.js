'use strict'

import express from "express";
import swaggerUi from 'swagger-ui-express'
import swaggerJson from './swagger.json' with {type: 'json'};
import CONFIG from './const.js'
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express()

//Pour le CORS
//app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type,Authorization');
    next();
})

// Logger middleware
app.use((req,res,next) =>{
    if (CONFIG.LOGS) {
        req.time = new Date(Date.now()).toUTCString();
        console.log(req.method, req.hostname, req.path, req.time);
    }
    next();
});

//route pour swagger
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerJson))

// Proxy

const dataMiddleware = createProxyMiddleware({
    target: CONFIG.POKAPI_DATA_URL,
    changeOrigin: true,
});

app.use(CONFIG.API_PATH + '/data', dataMiddleware);

const userMiddleware = createProxyMiddleware({
    target: CONFIG.POKAPI_USER_URL,
    changeOrigin: true,
});

app.use(CONFIG.API_PATH + '/user', userMiddleware);

const openaiMiddleware = createProxyMiddleware({
    target: CONFIG.POKAPI_OPENAI_URL,
    changeOrigin: true,
});

app.use(CONFIG.API_PATH + '/openai', openaiMiddleware);

app.use((error, req, res, next) => {
    console.log(error)
    return res.status(error.statusCode || 500).json({message: error.message})
})

export default app;
