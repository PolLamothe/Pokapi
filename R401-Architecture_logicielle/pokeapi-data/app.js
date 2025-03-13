'use strict'

import express from "express";
import swaggerUi from 'swagger-ui-express'
import swaggerJson from './swagger.json' with {type: 'json'};
import CONFIG from "./const.js";

const app = express()

//Pour le CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type,Authorization');
    next();
})
//pour traiter les body en json
app.use(express.json())

//route pour swagger
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerJson))

//chargement des routes
const {default: routes} = await import ('./api/route/route.js')
app.use(CONFIG.APIPATH + '/', routes)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.statusCode || 500).json({message: error.message})
})

export default app;