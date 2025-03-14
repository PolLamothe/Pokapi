'use strict'

import express from 'express'

const router = express.Router()

import boosterContent from './assets/booster.json' with {type: 'json'}

import rarestCards from './assets/rarest.json' with {type: 'json'}

router
    .route('/todo')
    .get((req, res) => {
        res.status(200).send({message: "TODO"})
    })

router.route("/openBooster/:SETID").get((req,res)=>{
    res.send(boosterContent)
})

router.route("/getRarestCard").get((req,res)=>{
    res.status(200).send(rarestCards)
})

router.route("/getMostSearchedCard").get((req,res)=>{
    res.send(rarestCards)
})

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
    if(req.body.login == "admin" && req.body.password == "thomas"){
        res.status(200).send()
    }else{
        res.status(401).send()
    }
})

router.route("/register").post((req,res)=>{
    if(req.body.login == "admin" && req.body.password == "thomas"){
        res.status(401).send()
    }else{
        res.status(200).send()
    }
})

export default router