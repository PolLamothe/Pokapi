'use strict'

import userDAO from "../dao/userDAO.js";
import {User} from "../model/User.js";
import jwt from 'jsonwebtoken';
import CONFIG from "../../const.js";
import bcrypt from "bcrypt";
import {fetchAPI} from "../dao/utility.js";
import {Card} from "../model/Card.js";

/**
 * Génère un JWT
 * @param user
 * @return {String} Le JWT
 */
const generateJWT = (user) => {
    return jwt.sign({
        login: user.login,
        pseudo: user.pseudo,
    }, CONFIG.JWT_SECRET, {
        expiresIn: CONFIG.JWT_EXPIRES
    })
}

const userController = {
    login: async (login, password) => {
        const userFound = await userDAO.findByLogin(login)
        if (userFound !== null && await bcrypt.compare(password, userFound.password)) {
            return generateJWT(userFound)
        }
        return null
    },
    loginWithToken: async (token, generateNew=false) => {
        return jwt.verify(token, CONFIG.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return null
            } else {
                const loggedUSer = await userDAO.findByLogin(decoded.login)
                if (loggedUSer !== null) {
                    if (generateNew) {
                        return generateJWT(loggedUSer)
                    }
                    return true
                }
                return null
            }
        });
    },
    register: async (login, pseudo, password) => {
        if (login.trim().length > 0 && pseudo.trim().length > 0 && password.trim().length > 0) {
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
                return generateJWT(addedUSer)
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
        const url = `${CONFIG.POKAPI_DATA_URL}/open-booster/${setId}`
        const res = await fetchAPI(url)
        if (res.ok) {
            const boosterContent = await res.json()
            boosterContent.forEach(c => {
                for(let i=0; i<userStored.cards.length; i++) {
                    if (userStored.cards[i].id === c.id) {
                        userStored.cards[i].quantity++
                        return
                    }
                }
                const newCard = new Card({
                    id: c.id,
                    quantity: 1
                })
                userStored.cards.push(newCard)
            })
            await userDAO.update(userStored.login, userStored)
            return boosterContent
        }
        throw new Error(`Can't fetch Pokapi-data API : ${res.status} ${res.statusText}`)
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
                userClone.password = password
            } else {
                throw new Error(`Password must not be empty`)
            }
        }
        const updatedUser = await userDAO.update(userClone.login, userClone)
        if (updatedUser === null) throw new Error(`Database error`)
        return generateJWT(updatedUser)
    },
    addSearched: async (user, cardId) => {
        const userStored = await userDAO.findByLogin(user.login)
        if (userStored == null) {
            throw new Error(`${user.login} does not exist`)
        }
        if (userStored.searched.filter(c => c.id === cardId).length === 0) {
            const newCard = new Card({
                id: cardId
            })
            userStored.searched.push(newCard)
            return await userDAO.update(user.login, userStored)
        }
        throw new Error('Requested card is already marked as searched')
    },
}

export default userController
