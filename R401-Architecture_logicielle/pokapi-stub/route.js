'use strict'

import express from 'express'

import boosterContent from './assets/booster.json' with {type: 'json'}
import rarestCards from './assets/rarest.json' with {type: 'json'}

const router = express.Router()

// ---
// Data
// ---

router.route("/openBooster/:SETID").get((req,res)=>{
    res.send(boosterContent)
})

router.route("/getRarestCard").get((req,res)=>{
    res.status(200).send(rarestCards)
})

router.route("/getMostSearchedCard").get((req,res)=>{
    res.send(rarestCards)
})

// ---
// User
// ---

router.route("/getBestUsersCollections").get((req,res)=>{
    res.send([
        {
            pseudo : "Kiki",
            collection : rarestCards
        },
        {
            pseudo : "Toto",
            collection : boosterContent
        }
    ])
})

router.route("/login").post((req,res)=>{
    if(req.body.login === "admin" && req.body.password === "thomas"){
        res.cookie('token', "LesChaussettesDeL'archiDuchesseSontEllesSèches", {
            httpOnly: true, 
            secure: true,
            sameSite: 'None',
            partitioned: true
          });
        res.status(200).send()
    }else{
        res.status(401).send()
    }
})

router.route("/register").post((req,res)=>{
    if(req.body.login === "admin" && req.body.password === "thomas"){
        res.status(401).send()
    }else{
        res.cookie('token', "LesChaussettesDeL'archiDuchesseSontEllesSèches", {
            secure: true,
            sameSite: 'None',
          });
        res.status(200).send()
    }
})

router.route("/getInfo").get((req,res)=>{
    if(req.cookies["token"] == "LesChaussettesDeL'archiDuchesseSontEllesSèches"){
        res.status(200).send()
    }else{
        res.status(401).send()
    }
})

export default router