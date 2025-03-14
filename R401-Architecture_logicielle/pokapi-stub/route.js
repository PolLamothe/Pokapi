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
    res.status(200).send(boosterContent)
})

router.route("/getRarestCard").get((req,res)=>{
    res.status(200).send(rarestCards)
})

router.route("/getMostSearchedCard").get((req,res)=>{
    res.status(200).send(rarestCards)
})

export default router