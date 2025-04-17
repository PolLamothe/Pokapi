"use strict"
import express from 'express'
import cardController from "../controller/cardController.js";
import setController from "../controller/setController.js";
import typeController from "../controller/typeController.js";
import raritiesController from "../controller/raritiesController.js";

const router = express.Router()

router.route("/open-booster/:setId").get(async (req, res) => {
    // #swagger.summary = "Ouvrir un booster"
    // #swagger.description = "Permet d'ouvrir un paquet de 5 cartes aléatoire à partir d'une série (set)."
    // #swagger.tags = ['Data']
    /*
    #swagger.parameters['setId'] = {
        in: 'path',
        description: "Id du set à ouvrir",
        required: true,
        type: "string",
    }
    #swagger.responses[200] = {
        description: "Un tableau avec la liste des cartes obtenues",
    }
    #swagger.responses[404] = {
        description: "Aucun set avec cet id trouvé",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
    try {
        const booster = await cardController.openBooster(req.params.setId)
        return res.status(200).json(booster)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/card/:id").get(async (req, res) => {
    // #swagger.summary = "Récupérer les informations d'une carte"
    // #swagger.description = "Permet de consulter les informations détaillées d'une carte."
    // #swagger.tags = ['Data']
    /*
    #swagger.parameters['id'] = {
        in: 'path',
        description: "Id de la carte",
        required: true,
        type: "string",
    }
    #swagger.responses[200] = {
        description: "La carte recherchée",
    }
    #swagger.responses[404] = {
        description: "Aucune carte avec cet id trouvé",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
    try {
        const card = await cardController.findCard(req.params.id)
        return res.status(200).json(card)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/cards").post(async (req,res) => {
    // #swagger.summary = "Récupérer les informations de plusieurs cartes"
    // #swagger.description = "Permet de consulter les informations détaillées de plusieurs cartes."
    // #swagger.tags = ['Data']
    /*
    #swagger.requestBody = {
        in: 'body',
        description: "Renseigner la liste des id des cartes",
        required: true,
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/ListString" } }
        }
    }
    #swagger.responses[200] = {
        description: "Un tableau avec les cartes recherchées",
    }
    */
    const cards = await cardController.findCards(req.body.cards)
    return res.status(200).json(cards)
})

router.route("/card/evolution/:id").get(async (req, res) => {
    // #swagger.summary = "Récupérer toutes les évolutions possibles d'une carte dans le même set"
    // #swagger.description = "Permet de trouver toutes les évolutions possibles d'une carte dans le même set."
    // #swagger.tags = ['Data']
    /*
    #swagger.parameters['id'] = {
        in: 'path',
        description: "Id de la carte",
        required: true,
        type: "string",
    }
    #swagger.responses[200] = {
        description: "Un tableau avec les cartes des évolutions disponibles",
    }
    #swagger.responses[400] = {
        description: "Cette carte n'a pas d'évolution possible dans ce set",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    #swagger.responses[404] = {
        description: "Aucune carte avec cet id trouvé",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
    try {
        const evolution = await cardController.findEvolution(req.params.id)
        if (evolution == null) {
            return res.status(400).json({message: "This Pokémon has no evolution in this set"})
        }
        return res.status(200).json(evolution)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/set/cards/:setId").get(async (req, res) => {
    // #swagger.summary = "Récupérer toutes les cartes d'un set"
    // #swagger.description = "Permet de récupérer la liste des cartes appartenant à un set en particulier."
    // #swagger.tags = ['Data']
    /*
    #swagger.parameters['setId'] = {
        in: 'path',
        description: "Id du set à consulter",
        required: true,
        type: "string",
    }
    #swagger.responses[200] = {
        description: "La liste des cartes de ce set",
    }
    #swagger.responses[404] = {
        description: "Aucune set avec cet id trouvé",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
    try {
        const cards = await cardController.findSetCards(req.params.setId)
        return res.status(200).json(cards)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/set/presentation/:setId").get(async (req, res) => {
    // #swagger.summary = "Récupérer les informations d'un set et 3 images de cartes de celui-ci"
    // #swagger.description = "Permet de récupérer la présentation d'un set. Celle-ci contiendra les informations du set et 4 images de cartes composant ce set."
    // #swagger.tags = ['Data']
    /*
    #swagger.parameters['setId'] = {
        in: 'path',
        description: "Id du set à consulter",
        required: true,
        type: "string",
    }
    #swagger.responses[200] = {
        description: "Les informations du set et 4 images de cartes composant ce set.",
    }
    #swagger.responses[404] = {
        description: "Aucune set avec cet id trouvé",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
    try {
        const setPresentation = await cardController.setPresentation(req.params.setId)
        return res.status(200).json(setPresentation)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/set/:setId").get(async (req, res) => {
    // #swagger.summary = "Récupérer les informations d'un set"
    // #swagger.description = "Permet de consulter les informations d'un en particulier."
    // #swagger.tags = ['Data']
    /*
    #swagger.parameters['setId'] = {
        in: 'path',
        description: "Id du set à consulter",
        required: true,
        type: "string",
    }
    #swagger.responses[200] = {
        description: "Les informations du set",
    }
    #swagger.responses[404] = {
        description: "Aucune set avec cet id trouvé",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
    try {
        const set = await setController.find(req.params.setId)
        return res.status(200).json(set)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/sets").get(async (req, res) => {
    // #swagger.summary = "Récupérer tous les sets"
    // #swagger.description = "Permet de récupérer la liste de tous les sets disponibles."
    // #swagger.tags = ['Data']
    /*
    #swagger.responses[200] = {
        description: "La liste de tous les sets.",
    }
    #swagger.responses[503] = { $ref: "#/components/responses/APIError" }
    */
    try {
        const allSets = await setController.findAll()
        return res.status(200).json(allSets)
    } catch (e) {
        return res.status(503).json({message: e.message})
    }
})

router.route("/deck-price").post(async (req, res) => {
    // #swagger.summary = "Donne le prix d'un deck de cartes"
    // #swagger.description = "Permet de savoir le prix total d'une liste de cartes (deck)."
    // #swagger.tags = ['Data']
    /*
    #swagger.requestBody = {
        in: 'body',
        description: "Renseigner la liste des id des cartes",
        required: true,
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/ListString" } }
        }
    }
    #swagger.responses[200] = {
        description: "Le prix total.",
    }
    #swagger.responses[404] = {
        description: "Une des cartes n'a pas été trouvée",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
    try {
        const deckPrice = await cardController.deckPrice(req.body.deck)
        return res.status(200).json(deckPrice)
    } catch (e) {
        return res.status(404).json({message: e.message})
    }
})

router.route("/types").get(async (req,res) => {
    // #swagger.summary = "Récupérer tous les types"
    // #swagger.description = "Permet de récupérer la liste des types disponibles."
    // #swagger.tags = ['Data']
    /*
    #swagger.responses[200] = {
        description: "Un tableau avec la liste des types",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/ListString" } }
        }
    }
    */
    const types = await typeController.findAll()
    return res.status(200).json(types)
})

router.route("/rarities").get(async (req,res) => {
    // #swagger.summary = "Récupérer toutes les raretés"
    // #swagger.description = "Permet de récupérer la liste des raretés disponibles."
    // #swagger.tags = ['Data']
    /*
    #swagger.responses[200] = {
        description: "Un tableau avec la liste des raretés",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/ListString" } }
        }
    }
    */
    const rarities = await raritiesController.findAll()
    return res.status(200).json(rarities)
})

export default router