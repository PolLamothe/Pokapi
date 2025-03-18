"use strict"
import express from 'express'

const router = express.Router()

//TODO
router
    .route('/todo')
    .get(async (req, res) => {
        res.status(200).send({message: "TODO"})
    })

export default router