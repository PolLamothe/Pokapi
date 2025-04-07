'use strict'
import express from 'express'
import userController from "../controller/userController.js";

const router = express.Router()

/**
 * This middleware checks if the user is authenticated otherwise return 401
 */
async function verifyAuth (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const userAuthenticated = await userController.loginWithToken(req.headers.authorization.split(' ')[1])
        if (userAuthenticated !== null) {
            req.user = userAuthenticated
            return next()
        }
    }
    return res.status(401).json({message : "Unauthorized : invalid or missing authentication token"})
}

router.route('/login').post(async (req, res) => {
    // #swagger.summary = "Se connecter à partir des identifiants ou d'un token"
    if (req.body.login && req.body.password) {
        const token = await userController.login(req.body.login, req.body.password)
        if (token !== null) {
            return res.status(200).json({token: token})
        }
        return res.status(401).json({message : "Invalid credentials"})
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const userAuthenticated = await userController.loginWithToken(req.headers.authorization.split(' ')[1])
        if (userAuthenticated !== null) {
            return res.status(200).json({token: userController.generateJWT(userAuthenticated)})
        }
        return res.status(401).json({message : "Invalid authentication token"})
    }
    return res.status(401).json({message : "Missing authentication token or credentials"})
})

router.route('/register').post(async (req, res) => {
    // #swagger.summary = "Inscrire un nouvel utilisateur"
    try {
        const newToken = await userController.register(req.body.login, req.body.pseudo, req.body.password)
        return res.status(200).json({token: newToken})
    } catch (e) {
        return res.status(400).json({message: e.message})
    }
})

router.route('/my-cards').get(verifyAuth, async (req, res) => {
    // #swagger.summary = "Récupérer toutes les cartes de la collection de l'utilisateur"
    try {
        const userCards = await userController.getUserCards(req.user)
        return res.status(200).json(userCards)
    } catch (e) {
        return res.status(503).json({message: e.message})
    }
})

router.route('/my-cards/:cardId').get(verifyAuth, async (req, res) => {
    // #swagger.summary = "Récupérer une carte de la collection de l'utilisateur"
    try {
        const userCard = await userController.getUserCard(req.user, req.params.cardId)
        return res.status(200).json(userCard)
    } catch (e) {
        if (e.cause === "API_ERROR")
            return res.status(503).json({message: e.message})
        else
            return res.status(400).json({message: e.message})
    }
})

router.route('/pseudo/:pseudo').get(async (req, res) => {
    // #swagger.summary = "Trouver un utilisateur à partir de son pseudo"
    const data = await userController.findUserByPseudo(req.params.pseudo)
    res.status(200).json({
        count: data.length,
        data: data.map(u =>  ({
            login: u.login,
            pseudo: u.pseudo
        }))
    })
})

router.route('/open-booster/:setId').get(verifyAuth, async (req, res) => {
    // #swagger.summary = "Ouvrir un booster pour ajouter des cartes dans la collection"
    try {
        const boosterContent = await userController.openBooster(req.user, req.params.setId)
        return res.status(200).json(boosterContent)
    } catch (e) {
        if (e.cause === "API_ERROR")
            return res.status(503).json({message: e.message})
        else
            return res.status(400).json({message: e.message})
    }
})

router.route('/info').get(verifyAuth, async (req, res) => {
    // #swagger.summary = "Récupérer son login et pseudo"
    res.status(200).json({
        login: req.user.login,
        pseudo: req.user.pseudo,
    })
})

router.route('/update').put(verifyAuth, async (req, res) => {
    // #swagger.summary = "Mettre à jour son pseudo et mot de passe"
    try {
        const newToken = await userController.updateUser(req.user, req.body.pseudo, req.body.password)
        return res.status(200).json({token: newToken})
    } catch (e) {
        return res.status(400).json({message: e.message})
    }
})

router.route('/delete').delete(verifyAuth, async (req, res) => {
    // #swagger.summary = "Supprimer l'utilisateur"
    const result = await userController.delete(req.user)
    if (result)
        return res.status(200).json({message: "User deleted"})
    return res.status(404).json({message: "User not found"})
})

router.route('/searched').get(verifyAuth, async (req, res) => {
    // #swagger.summary = "Récupérer toutes les cartes marquées comme recherchées d'un utilisateur"
    return res.status(200).json(req.user.searched.map(c => c.id))
})

router.route('/searched/add').post(verifyAuth, async (req, res) => {
    // #swagger.summary = "Ajouter une carte dans la liste des cartes recherchées"
    if (req.body.id) {
        await userController.addSearched(req.user, req.body.id)
        return res.status(200).json()
    }
    return res.status(400).json({message: 'Missing id field'})
})

export default router