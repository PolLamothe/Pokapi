'use strict'

import userDAO from "../dao/userDAO.js";

const userController = {
    login: async (login, password, token) => {
        //TODO
    },
    register: async (login, pseudo, password) => {
        //TODO
    },
    findUserByPseudo: async (pseudo) => {
        return await userDAO.findByPseudo(pseudo)
    },
    openBooster: async (user, setId) => {
        //TODO
    },
    updateUser: async (user, pseudo=null, password=null) => {
        //TODO
    },
    addSearched: async (user, cardId) => {
        const userStored = await userDAO.findByLogin(user.login)
        if (userStored == null) {
            throw new Error(`${user.login} does not exist`)
        }
        if (userStored.searched.filter(c => c.id === cardId).length === 0) {
            userStored.searched.push({id: cardId})
            return await userDAO.update(user.login, userStored)
        }
        throw new Error('Requested card is already marked as searched')
    },
}

export default userController
