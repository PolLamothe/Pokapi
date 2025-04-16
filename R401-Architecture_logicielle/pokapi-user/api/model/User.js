import {Model, SchemaTypes as S} from "./Model.js";
import {Card} from "./Card.js"

export class User extends Model{
    static schema = {
        pseudo: S.String,
        login: S.String,
        password: S.String,
        cards : {type: "array", objectName: Card, required: true},
        searched : {type: "array", objectName: Card, required: true}
    }

    constructor(data){
        super(data)
    }

    /**
     * Add a list off cards to the user's cards
     * @param cards {Array} An list off cards from Pokapi-data API
     */
    addCards(cards) {
        cards.forEach(c => {
            for(let i=0; i<this.cards.length; i++) {
                if (this.cards[i].id === c.id) {
                    this.cards[i].quantity++
                    return
                }
            }
            const newCard = new Card({
                id: c.id,
                quantity: 1
            })
            this.cards.push(newCard)
        })

        const ids = cards.map(card => card.id)

        this.searched = this.searched.filter(card => !(ids.includes(card.id)))
    }

    /**
     * Add a card to the user's searched cards
     * @param cardId {String} The id off the card to add
     * @throws {Error} If the requested card is already on the list
     */
    addSearchedCard(cardId) {
        if (this.searched.filter(c => c.id === cardId).length === 0) {
            const newCard = new Card({
                id: cardId
            })
            this.searched.push(newCard)
            return
        }
        throw new Error('Requested card is already marked as searched')
    }
}