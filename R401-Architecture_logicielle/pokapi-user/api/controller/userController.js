'use strict'

import userDAO from "../dao/userDAO.js";
import {User} from "../model/User.js";
import jwt from 'jsonwebtoken';
import CONFIG from "../../const.js";
import bcrypt from "bcrypt";
import {pokapiDataDAO} from "../dao/pokapiDataDAO.js";

const userController = {
    login: async (login, password) => {
        const userFound = await userDAO.findByLogin(login)
        if (userFound !== null && await bcrypt.compare(password, userFound.password)) {
            return userController.generateJWT(userFound)
        }
        return null
    },
    loginWithToken: async (token) => {
        return jwt.verify(token, CONFIG.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return null
            } else {
                return await userDAO.findByLogin(decoded.login)
            }
        });
    },
    generateJWT: (user) => {
        return jwt.sign({
            login: user.login,
            pseudo: user.pseudo,
        }, CONFIG.JWT_SECRET, {
            expiresIn: CONFIG.JWT_EXPIRES
        })
    },
    register: async (login, pseudo, password) => {
        const isAllSet = (login && pseudo && password)
        if (isAllSet && login.trim().length > 0 && pseudo.trim().length > 0 && password.trim().length > 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                login : login,
                pseudo : pseudo,
                password : hashedPassword,
                cards: [],
                searched: []
            })
            const addedUSer = await userDAO.addOne(newUser)
            if (addedUSer !== null) {
                return userController.generateJWT(addedUSer)
            }
            throw new Error(`User already exists`)
        }
        throw new Error(`Fields must not be empty`)
    },
    findUserByPseudo: async (pseudo) => {
        return await userDAO.findByPseudo(pseudo)
    },
    openBooster: async (user, setId) => {
        const userStored = await userDAO.findByLogin(user.login)
        if (userStored == null) {
            throw new Error(`${user.login} does not exist`)
        }
        // Open booster from Pokapi-data API
        const boosterContent = await pokapiDataDAO.openBooster(setId)
        userStored.addCards(boosterContent)
        await userDAO.update(userStored.login, userStored)
        return boosterContent
    },
    updateUser: async (user, pseudo=null, password=null) => {
        let userClone
        try {
            userClone = new User({...user})
        } catch (e) {
            return null
        }
        if (pseudo !== null) {
            if (pseudo.trim().length > 0) {
                userClone.pseudo = pseudo
            } else {
                throw new Error(`Pseudo must not be empty`)
            }
        }
        if (password !== null) {
            if (password.trimEnd().length > 0) {
                const salt = await bcrypt.genSalt(10);
                userClone.password = await bcrypt.hash(password, salt)
            } else {
                throw new Error(`Password must not be empty`)
            }
        }
        const updatedUser = await userDAO.update(userClone.login, userClone)
        if (updatedUser === null) throw new Error(`Database error`)
        return userController.generateJWT(updatedUser)
    },
    addSearched: async (user, cardId) => {
        const userStored = await userDAO.findByLogin(user.login)
        if (userStored == null) {
            throw new Error(`${user.login} does not exist`)
        }
        userStored.addSearchedCard(cardId)
        return await userDAO.update(user.login, userStored)
    },
    getUserCards: async (user) => {
        const cards = await pokapiDataDAO.fetchCards(user.cards.map(c => c.id))
        const userCardsWithContent = []
        user.cards.forEach(userCard => {
            const result = cards.find(apiCard => apiCard.id === userCard.id)
            if (result !== undefined) {
                userCardsWithContent.push({
                    card: result,
                    quantity: userCard.quantity
                })
            }
        })
        return userCardsWithContent
    },
    getUserCard: async (user, cardId) => {
        if (user.cards.some(uCard => uCard.id === cardId)) {
            const result = await pokapiDataDAO.fetchCard(cardId)
            return {
                card: result,
                quantity: user.cards.find(uCard => uCard.id === cardId).quantity
            }
        }
        throw new Error("You don't have this card")
    },
    delete: async (user) => userDAO.deleteOne(user)
}

export default userController
