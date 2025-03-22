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
        res.status(200).send({
            token : "LesChaussettesDeL'archiDuchesseSontEllesSèches"
        })
    }else{
        res.status(401).send()
    }
})

router.route("/register").post((req,res)=>{
    if(req.body.login === "admin" && req.body.password === "thomas"){
        res.status(401).send()
    }else{
        res.status(200).send({
            token : "LesChaussettesDeL'archiDuchesseSontEllesSèches"
        })
    }
})

router.route("/getInfo").get((req,res)=>{
    if(req.cookies["token"] != "LesChaussettesDeL'archiDuchesseSontEllesSèches"){
        res.status(401).send()
        return
    }
    res.status(200).send({
        pseudo : "Thomas"
    })
})

router.route("/update").put((req,res)=>{
    if(req.cookies["token"] != "LesChaussettesDeL'archiDuchesseSontEllesSèches"){
        res.status(401).send()
        return
    }
    res.status(200).send()
})

export default router