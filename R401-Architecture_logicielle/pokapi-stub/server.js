'use strict'

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from './swagger.json' with {type: 'json'};
import CONFIG from "./const.js";

const app = express()

//Pour le CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
    next();
})

//pour traiter les body en json
app.use(express.json())

//chargement des routes
const {default: routes}  = await import ('./route.js')
app.use(CONFIG.APIPATH+'/',routes)

//route pour swagger
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerJson))

//message par defaut
app.use((error,req,res,next)=>{
    console.log(error)
    res.status(error.statusCode || 500).json({message:error.message})
})

const server = app.listen(CONFIG.PORT, () =>
    console.log(`--- Pokapi listening on port ${CONFIG.PORT}! ---`)
)

//Pour les interrucptions utilisateur
for (let signal of ["SIGTERM", "SIGINT"])
    process.on(signal,  () => {
        console.info(`${signal} signal received.`)
        console.log("Closing http server.");
        server.close(async (err) => {
        console.log("Http server closed.")
        process.exit(err ? 1 : 0)
    });
});
