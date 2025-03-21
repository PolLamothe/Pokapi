import assert from "node:assert"
import { describe, it, before, beforeEach, after } from "node:test"
import cardFetchDAO from "../../api/dao/cardFetchDAO.js";
import testCards from '../ressources/cards.json' with {type: 'json'}
import {Card} from "../../api/model/Card.js";

describe('DAO - CardFetchDAO', () => {
    it('Find one card', async () => {
        const res = await cardFetchDAO.findCardById("dp3-1")
        const expected = new Card(testCards.data[0])
        assert.deepEqual(res.id, expected.id)
    })

    it('Find many cards',async () => {
        const expected1 = new Card(testCards.data[0])
        const expected2 = new Card(testCards.data[1])
        const expected3 = new Card(testCards.data[2])
        const res = await cardFetchDAO.findCardsByID(["dp3-1", "ex12-1", "mcd19-1"])
        assert.equal(res.length, 3)
        assert.equal(res[0].id, expected1.id)
        assert.equal(res[1].id, expected2.id)
        assert.equal(res[2].id, expected3.id)
    })

    it('Find set cards',async () => {
        const res = await cardFetchDAO.findSetCards("dp3")
        res.forEach((card) => {
            assert.equal(card.set.id, "dp3")
        })
    })
})