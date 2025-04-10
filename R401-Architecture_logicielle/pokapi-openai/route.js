'use strict'

import express from 'express'
import OpenAI from 'openai';
import CONFIG from "./const.js"

const client = new OpenAI({
    apiKey: CONFIG.API_KEY
  });

const router = express.Router()

router.route("/test").get(async (req,res)=>{
    const response = await client.responses.create({
        model: 'gpt-4o',
        instructions: 'You are a coding assistant that talks like a pirate',
        input: 'Are semicolons optional in JavaScript?',
      });
    res.send(response)
})

export default router