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
    // #swagger.description = "Permet à un utilisateur de se connecter en utilisant soit un jeton d'authentification, soit son identifiant et mot de passe si les deux sont fournis alors la vérification se fait avec les identifiants."
    // #swagger.tags = ['User']
    /*
    #swagger.requestBody = {
        in: 'body',
        description: "Renseigner ses informations de connexion",
        required: false,
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Login" } }
        }
    }
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = { $ref: "#/components/responses/NewToken" }
    #swagger.responses[401] = {
        description: "Jeton ou identifiants invalides",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
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
    // #swagger.description = "Permet à un utilisateur de s'inscrire avec un login, un pseudo et un mot de passe. Le login doit être unique."
    // #swagger.tags = ['User']
    /*
    #swagger.requestBody = {
        in: 'body',
        description: "Renseigner ses informations de pour la création du compte",
        required: true,
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Register" } }
        }
    }
    #swagger.responses[200] = { $ref: "#/components/responses/NewToken" }
    #swagger.responses[400] = {
        description: "Un utilisateur avec ce login existe déjà",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
    try {
        const newToken = await userController.register(req.body.login, req.body.pseudo, req.body.password)
        return res.status(200).json({token: newToken})
    } catch (e) {
        return res.status(400).json({message: e.message})
    }
})

router.route('/my-cards').get(verifyAuth, async (req, res) => {
    // #swagger.summary = "Récupérer toutes les cartes de la collection de l'utilisateur"
    // #swagger.description = "TODO"
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    /*
    #swagger.responses[401] = { $ref: "#/components/responses/UnauthorizedResponse" }
    #swagger.responses[503] = { $ref: "#/components/responses/APIError" }
     */
    try {
        const userCards = await userController.getUserCards(req.user)
        return res.status(200).json(userCards)
    } catch (e) {
        return res.status(503).json({message: e.message})
    }
})

router.route('/my-cards/:cardId').get(verifyAuth, async (req, res) => {
    // #swagger.summary = "Récupérer une carte de la collection de l'utilisateur"
    // #swagger.description = "TODO"
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    /*
    #swagger.responses[401] = { $ref: "#/components/responses/UnauthorizedResponse" }
    #swagger.responses[503] = { $ref: "#/components/responses/APIError" }
     */
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
    // #swagger.description = "Rechercher des utilisateur à partir de leur pseudo, renvoie tous les utilisateurs dont le pseudo commence par la chaîne donnée."
    // #swagger.tags = ['User']
    /*
    #swagger.parameters['pseudo'] = {
        in: 'path',
        description: "Le début du pseudo a rechercher",
        required: true,
        type: "string",
    }
    #swagger.responses[200] = {
        description: "Les informations des utilisateurs trouvés",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/ListUserInfo" } }
        }
    }
    */
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
    // #swagger.description = "TODO"
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    /*
    #swagger.responses[401] = { $ref: "#/components/responses/UnauthorizedResponse" }
    #swagger.responses[503] = { $ref: "#/components/responses/APIError" }
     */
    try {
        const boosterContent = await userController.openBooster(req.user, req.params.setId)
        return res.status(200).json(boosterContent)
    } catch (e) {
        if (e.cause === "API_ERROR")
            return res.status(503).json({message: e.message})
        else
            return res.status(404).json({message: e.message})
    }
})

router.route('/info').get(verifyAuth, async (req, res) => {
    // #swagger.summary = "Récupérer son login et pseudo"
    // #swagger.description = "Permet à un utilisateur de voir les informations de son compte, c'est-à-dire son login et son pseudo."
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    /*
    #swagger.responses[200] = {
        description: "Les informations de l'utilisateur",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/UserInfo" } }
        }
    }
    #swagger.responses[401] = { $ref: "#/components/responses/UnauthorizedResponse" }
     */
    res.status(200).json({
        login: req.user.login,
        pseudo: req.user.pseudo,
    })
})

router.route('/update').put(verifyAuth, async (req, res) => {
    // #swagger.summary = "Mettre à jour son pseudo et mot de passe"
    // #swagger.description = "Permet à un utilisateur de modifier son pseudo et/ou son mot de passe."
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    /*
    #swagger.requestBody = {
        in: 'body',
        description: "Renseigner le nouveau pseudo ou mot de passe",
        required: true,
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Update" } }
        }
    }
    #swagger.responses[200] = { $ref: "#/components/responses/NewToken" }
    #swagger.responses[401] = { $ref: "#/components/responses/UnauthorizedResponse" }
    #swagger.responses[400] = {
        description: "Le nouveau pseudo ou mot de passe est invalide",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
     */
    try {
        const newToken = await userController.updateUser(req.user, req.body.pseudo, req.body.password)
        return res.status(200).json({token: newToken})
    } catch (e) {
        return res.status(400).json({message: e.message})
    }
})

router.route('/delete').delete(verifyAuth, async (req, res) => {
    // #swagger.summary = "Supprimer l'utilisateur"
    // #swagger.description = "Permet à un utilisateur de supprimer son compte."
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    /*
    #swagger.responses[200] = {
        description: "L'utilisateur a été supprimé",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/UserDeleted" } }
        }
    }
    #swagger.responses[401] = { $ref: "#/components/responses/UnauthorizedResponse" }
    #swagger.responses[404] = {
        description: "L'utilisateur n'a pas été trouvé",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
     */
    const result = await userController.delete(req.user)
    if (result)
        return res.status(200).json({message: "User deleted"})
    return res.status(404).json({message: "User not found"})
})

router.route('/searched').get(verifyAuth, async (req, res) => {
    // #swagger.summary = "Récupérer toutes les cartes marquées comme recherchées d'un utilisateur"
    // #swagger.description = "Voir la les ID des cartes qui sont dans la liste des cartes recherchées par l'utilisateur"
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    /*
    #swagger.responses[200] = {
        description: "La liste des ID des cartes",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/ListId" } }
        }
    }
    #swagger.responses[401] = { $ref: "#/components/responses/UnauthorizedResponse" }
     */
    return res.status(200).json(req.user.searched.map(c => c.id))
})

router.route('/searched/add').post(verifyAuth, async (req, res) => {
    // #swagger.summary = "Ajouter une carte dans la liste des cartes recherchées"
    // #swagger.description = "Permet à un utilisateur d'ajouter une carte à la liste des cartes qu'il recherche."
    // #swagger.tags = ['User']
    // #swagger.security = [{ "bearerAuth": [] }]
    /*
    #swagger.requestBody = {
        in: 'body',
        description: "ID de la carte à ajouter à la liste",
        required: true,
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/CardId" } }
        }
    }
    #swagger.responses[200] = {
        description: "La carte a été ajoutée"
    }
    #swagger.responses[401] = { $ref: "#/components/responses/UnauthorizedResponse" }
    #swagger.responses[400] = {
        description: "L'utilisateur n'a pas spécifié d'id ou la carte est déjà dans la liste",
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Error" } }
        }
    }
    */
    if (req.body.id) {
        try {
            await userController.addSearched(req.user, req.body.id)
            return res.status(200).json()
        } catch (e) {
            return res.status(400).json({message: e.message})
        }
    }
    return res.status(400).json({message: 'Missing id field'})
})

export default router