'use strict'

import express from 'express'

import boosterContent from './assets/booster.json' with {type: 'json'}
import rarestCards from './assets/rarest.json' with {type: 'json'}
import sets from './assets/sets.json' with {type: 'json'}
import types from './assets/types.json' with {type: 'json'}
import rarities from './assets/rarities.json' with {type: 'json'}

const router = express.Router()

// ---
// OpenAI
// ---

router.route("/openai/presentation/:cardId").get((req,res)=>{
    res.status(200).send({text : "*Pika pika!* Je suis Pikachu, le Pokémon Électrique le plus mignon et le plus populaire de tous! *Pika pika!*"})
})

router.route("/openai/pokemonResponse/:cardId").post((req,res)=>{
    res.status(200).send({text : "grave !"})
})

// ---
// Data
// ---

router.route("/data/open-booster/:SETID").get((req,res)=>{
    if (req.params.SETID === "wrong")
        return res.status(404).json({message: "This set does not exist"})
    res.status(200).send(boosterContent)
})

router.route("/data/card/:ID").get((req,res)=>{
    res.status(200).send(rarestCards[0])
})

router.route("/data/cards").post((req,res) => {
    res.status(200).send(rarestCards)
})

router.route("/data/card/evolution/:ID").get((req,res) => {
    res.status(200).send(rarestCards[0])
})

router.route("/data/set/presentation/:SETID").get((req,res) => {
    const finalObject = {}
    finalObject.set = sets.data[0]
    finalObject.images = []
    for (let i=0; i<4; i++) {
        finalObject.images.push(boosterContent[i].images)
    }
    res.status(200).send(finalObject)
})

router.route("/data/set/:SETID").get((req,res) => {
    res.status(200).send(rarestCards)
})

router.route("/data/sets").get((req,res) => {
    res.status(200).send(sets.data)
})

router.route("/data/deck-price").post((req,res) => {
    res.status(200).send(53.2)
})

router.route("/data/types").get((req,res) => {
    res.status(200).send(types)
})

router.route("/data/rarities").get((req,res) => {
    res.status(200).send(rarities)
})

// Data without proxy
router.route("/open-booster/:SETID").get((req,res)=>{
    if (req.params.SETID === "wrong")
        return res.status(404).json({message: "This set does not exist"})
    res.status(200).send(boosterContent)
})

router.route("/card/:ID").get((req,res)=>{
    res.status(200).send(rarestCards[0])
})

router.route("/cards").post((req,res) => {
    res.status(200).send(rarestCards)
})

// ---
// User
// ---
const stubToken = "Bearer TGVzQ2hhdXNzZXR0ZXNEZUwnYXJjaGlEdWNoZXNzZVNvbnRFbGxlc1PDqGNoZXM="
const stubLogin = "admin"
const stubPassword = "admin"

router.route("/user/login").post((req,res)=>{
    if ((req.body.login === stubLogin && req.body.password === stubPassword) || req.headers.authorization === stubToken) {
        res.status(200).send({
            token : "TGVzQ2hhdXNzZXR0ZXNEZUwnYXJjaGlEdWNoZXNzZVNvbnRFbGxlc1PDqGNoZXM="
        })
    } else {
        res.status(401).send()
    }
})

router.route("/user/register").post((req,res)=>{
    if(req.body.login === stubLogin){
        res.status(400).send({message: "User already exist"})
    } else {
        res.status(200).send({
            token : "TGVzQ2hhdXNzZXR0ZXNEZUwnYXJjaGlEdWNoZXNzZVNvbnRFbGxlc1PDqGNoZXM="
        })
    }
})

router.route("/user/my-cards").get((req,res)=>{
    if(req.headers.authorization !== stubToken){
        res.status(401).send()
        return
    }
    const myCards = rarestCards.map((card, index) => {
        return {
            card: card,
            quantity: index
        }
    })
    res.status(200).send(myCards)
})

router.route("/user/my-cards/:cardId").get((req,res)=>{
    if(req.headers.authorization !== stubToken){
        return res.status(401).send()
    }
    res.status(200).send({
        card: rarestCards[0],
        quantity: 42
    })
})

router.route("/user/pseudo/:PSEUDO").get((req,res)=>{
    res.status(200).send({
        login: stubLogin,
        pseudo: req.params.PSEUDO
    })
})

router.route("/user/searched/add").post((req,res)=>{
    if(req.headers.authorization !== stubToken){
        res.status(401).send()
        return
    }
    res.status(200).send()
})

router.route("/user/searched").get((req,res)=>{
    if(req.headers.authorization !== stubToken){
        res.status(401).send()
        return
    }
    res.status(200).send(boosterContent)
})

router.route("/user/info").get((req,res)=>{
    if(req.headers.authorization !== stubToken){
        res.status(401).send()
        return
    }
    res.status(200).send({
        login: stubLogin,
        pseudo : "Thomas"
    })
})

router.route("/user/update").put((req,res)=>{
    if(req.headers.authorization !== stubToken){
        res.status(401).send()
        return
    }
    res.status(200).send()
})

router.route("/user/searched/popular").get((req,res)=>{
    res.status(200).send(rarestCards)
})

router.route("/user/open-booster/:SETID").get((req,res)=>{
    if (req.params.SETID === "wrong")
        return res.status(404).json({message: "This set does not exist"})
    res.status(200).send(boosterContent)
})

export default router
