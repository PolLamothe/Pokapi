'use strict'

import express from 'express'
import OpenAI from 'openai';
import CONFIG from "./const.js"
import cards from "./cards.json" with {type : "json"}

const client = new OpenAI({
    apiKey: CONFIG.API_KEY
  });

function retrieveUsefulData(card){
	return {
		nom : card.name,
		hp : card.hp,
		types : card.types,
		evolueDepuis : card.evolvesFrom,
		capacitées : card.abilities,
		attaques : card.attacks,
		faiblesses : card.weaknesses,
		resistances : card.resistances,
		description : card.flavorText,
		rareté : card.rarity
	}
}

const model = "gpt-3.5-turbo"

const instructions = `Tu dois jouer le role d'un pokemon, 
essaie de répondre aux messages de l'utilisateur comme tel. 
Tu peux par exemple pousser des cris qui pourrait correspondre au Pokemon.
Tu dois imaginer le caractère que le pokemon aurait ex (agressif, passifique, enfantin, hautains, idiot etc..).
Voici la carte (en anglais) de ton Pokemon : `

const router = express.Router()

router.route("/presentation").post(async (req,res)=>{
    const response = await client.responses.create({
        model: model,
        instructions: instructions+JSON.stringify(retrieveUsefulData(req.body.card)),
        input: 'Présente toi',
      });
    res.send(response)
})

export default router