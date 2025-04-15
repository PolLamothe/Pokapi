"use strict"
import express from 'express'
import cardController from "../controller/cardController.js";
import setController from "../controller/setController.js";

const router = express.Router()

router.route("/open-booster/:setId").get(async (req, res) => {
    // #swagger.summary = "Ouvrir un booster"
    try {
        const booster = await cardController.openBooster(req.params.setId)
        return res.status(200).json(booster)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/card/:id").get(async (req, res) => {
    // #swagger.summary = "Récupérer les informations d'une carte"
    try {
        const card = await cardController.findCard(req.params.id)
        return res.status(200).json(card)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/cards").post(async (req,res) => {
    // #swagger.summary = "Récupérer les informations de plusieurs cartes"
    const cards = await cardController.findCards(req.body.cards)
    return res.status(200).json(cards)
})

router.route("/card/evolution/:id").get(async (req, res) => {
    const evolution = await cardController.findEvolution(req.params.id)
    if (evolution == null) {
        return res.status(404).json({message: "Le Pokémon n'a pas d'évolution"})
    }
    return res.status(200).json({evolution})
})

router.route("/set/cards/:setId").get(async (req, res) => {
    // #swagger.summary = "Récupérer toutes les cartes d'un set"
    try {
        const cards = await cardController.findSetCards(req.params.setId)
        return res.status(200).json(cards)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/set/presentation/:setId").get(async (req, res) => {
    // #swagger.summary = "Récupérer les informations d'un set et 3 images de cartes de celui-ci"
    try {
        const setPresentation = await cardController.setPresentation(req.params.setId)
        return res.status(200).json(setPresentation)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/set/:setId").get(async (req, res) => {
    // #swagger.summary = "Récupérer les informations d'un set"
    try {
        const set = await setController.find(req.params.setId)
        return res.status(200).json(set)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/sets").get(async (req, res) => {
    // #swagger.summary = "Récupérer tous les sets"
    try {
        const allSets = await setController.findAll()
        return res.status(200).json(allSets)
    } catch (e) {
        return res.status(503).json({message: e.message})
    }
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