'use strict'

import express from 'express'

import boosterContent from './assets/booster.json' with {type: 'json'}
import rarestCards from './assets/rarest.json' with {type: 'json'}
import sets from './assets/sets.json' with {type: 'json'}

const router = express.Router()

// ---
// Data
// ---

router.route("/open-booster/:SETID").get((req,res)=>{
    res.status(200).send(boosterContent)
})

router.route("/card/:ID").get((req,res)=>{
    res.status(200).send(rarestCards[0])
})

router.route("/cards").post((req,res) => {
    res.status(200).send(rarestCards)
})

router.route("/card/evolution/:ID").get((req,res) => {
    res.status(200).send(rarestCards[0])
})

router.route("/set/presentation/:SETID").get((req,res) => {
    const finalObject = {}
    finalObject.set = sets.data[0]
    finalObject.images = []
    for (let i=0; i<4; i++) {
        finalObject.images.push(boosterContent[i].images.large)
    }
    res.status(200).send(finalObject)
})

router.route("/set/:SETID").get((req,res) => {
    res.status(200).send(rarestCards)
})

router.route("/sets").get((req,res) => {
    res.status(200).send(sets)
})

router.route("/deck-price").post((req,res) => {
    res.status(200).send(53.2)
})

// ---
// User
// ---
const stubToken = "TGVzQ2hhdXNzZXR0ZXNEZUwnYXJjaGlEdWNoZXNzZVNvbnRFbGxlc1PDqGNoZXM="
const stubLogin = "admin"
const stubPassword = "admin"

router.route("/login").post((req,res)=>{
    if (req.body.login === stubLogin && req.body.password === stubPassword) {
        res.status(200).send({
            token : stubToken
        })
    } else {
        res.status(401).send()
    }
})

router.route("/register").post((req,res)=>{
    if(req.body.login === stubLogin && req.body.password === stubPassword){
        res.status(401).send()
    } else {
        res.status(200).send({
            token : stubToken
        })
    }
})

router.route("/my-cards").get((req,res)=>{
    if(req.headers["authentification-token"] !== stubToken){
        res.status(401).send()
        return
    }
    res.status(200).send(rarestCards)
})

router.route("/user/:PSEUDO").get((req,res)=>{
    res.status(200).send({
        login: stubLogin,
        pseudo: req.params.PSEUDO
    })
})

router.route("/searched/add").post((req,res)=>{
    if(req.headers["authentification-token"] !== stubToken){
        res.status(401).send()
        return
    }
    res.status(200).send()
})

router.route("/searched").get((req,res)=>{
    if(req.headers["authentification-token"] !== stubToken){
        res.status(401).send()
        return
    }
    res.status(200).send(boosterContent)
})

router.route("/info").get((req,res)=>{
    if(req.headers["authentification-token"] !== stubToken){
        res.status(401).send()
        return
    }
    res.status(200).send({
        login: stubLogin,
        pseudo : "Thomas"
    })
})

router.route("/update").put((req,res)=>{
    if(req.headers["authentification-token"] !== stubToken){
        res.status(401).send()
        return
    }
    res.status(200).send()
})

router.route("/searched/popular").get((req,res)=>{
    res.status(200).send(rarestCards)
})

export default router