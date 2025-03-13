'use strict'

import express from 'express'

const router = express.Router()

router
    .route('/todo')
    .get((req, res) => {
        res.status(200).send({message: "TODO"})
    })

export default router
