'use strict'

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from './swagger.json' with {type: 'json'};
import CONFIG from "./const.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express()

const userURL = `http://${CONFIG.USER_HOST}:${CONFIG.USER_PORT}${CONFIG.USER_API_PATH}`

//Pour le CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
    next();
})

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

//pour traiter les body en json
app.use(express.json())
app.use(cookieParser());

// logger
app.use((req,res,next) => {
    console.log(`${new Date().toDateString()} : ${req.url}`);
    next()
})

//Authentification
app.use(async (req,res,next)=>{
    if(req.path == "doc"){
        next()
    }else{
        const response = await fetch(`${userURL}/info`,{
            method : "GET",
            headers : {
                "Authentification-Token" : req.headers["authentification-token"]
            }
        })
        if(response.status == 200){
            next()
        }else{
            res.status(response.status).send(response.statusText)
        }
    }
})

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
for (let signal of ["SIGTERM", "SIGINT", "SIGUSR2"])
    process.on(signal,  () => {
        console.info(`${signal} signal received.`)
        console.log("Closing http server.");
        server.close(async (err) => {
        console.log("Http server closed.")
        process.exit(err ? 1 : 0)
    });
});
