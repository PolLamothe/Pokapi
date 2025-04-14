"use strict"
import express from 'express'
import cardController from "../controller/cardController.js";
import setController from "../controller/setController.js";

const router = express.Router()

router.route("/open-booster/:SETID").get(async (req, res) => {
    const booster = await cardController.openBooster(req.params.SETID)
    return res.status(200).json(booster)
})

router.route("/card/:ID").get(async (req, res) => {
    const card = await cardController.findCard(req.params.ID)
    return res.status(200).json({card})
})

router.route("/cards").post((req,res) => {

})

router.route("/card/evolution/:ID").get(async (req, res) => {
    const evolution = await cardController.findEvolution(req.params.ID)
    if (evolution == null) {
        return res.status(404).json({message: "Le Pokémon n'a pas d'évolution"})
    }
    return res.status(200).json({evolution})
})

router.route("/set/presentation/:SETID").get(async (req, res) => {
    const setPresentation = await cardController.setPresentation(req.params.SETID)
    return res.status(200).json({setPresentation})

})

router.route("/set/:SETID").get(async (req, res) => {
    const set = await setController.find(req.params.SETID)
    return res.status(200).json({set})

})

router.route("/sets").get(async (req, res) => {
    const allSets = await setController.findAll()
    return res.status(200).json({allSets})
})

router.route("/deck-price").post(async (req, res) => {
    const deckPrice = await cardController.deckPrice(req.body.deck)
    return res.status(200).json({deckPrice})
})

router.route("/types").get((req,res) => {

})

router.route("/rarities").get((req,res) => {

})

export default router