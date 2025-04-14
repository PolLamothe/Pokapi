'use strict'

import express from 'express'
import OpenAI from 'openai';
import CONFIG from "./const.js"

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

const dataURL = `http://${CONFIG.DATA_HOST}:${CONFIG.DATA_PORT}${CONFIG.DATA_API_PATH}`

async function fetchCard(cardId){
	const dataResponse = await fetch(`${dataURL}/card/${cardId}`)
	if(dataResponse.status != 200){
		throw Error("The data server return an error")
	}
	return await dataResponse.json()
}

router.route("/presentation/:cardId").get(async (req,res)=>{
	const card = await fetchCard(req.params.cardId)
    const response = await client.responses.create({
        model: model,
        instructions: instructions+JSON.stringify(retrieveUsefulData(card)),
        input: 'Présente toi et pose une question à l\'utilisateur',
      });
    res.send(response.output.content[0].text)
})

export default router