const chai = require('chai')
const card = require('../card')
const FiveCards = card.FiveCards
const Card = card.Card

const [JOKER, SPADE, DIAMOND, HEART, CLUB] = [0, 1, 2, 3, 4]

expect = chai.expect


describe('1. Testing Cards', function () {
	it(`should return 1P`, function () {
		const cards = new FiveCards()
		cards.push(new Card(SPADE, 5))
		cards.push(new Card(DIAMOND, 2))
		cards.push(new Card(HEART, 3))
		cards.push(new Card(CLUB, 8))
		cards.push(new Card(JOKER, 15))
		const re = cards.getResult()
		expect(re).to.equal('oneP')
	})

	it(`should return 2P`, function () {
		const cards = new FiveCards()
		cards.push(new Card(SPADE, 5))
		cards.push(new Card(DIAMOND, 2))
		cards.push(new Card(HEART, 2))
		cards.push(new Card(CLUB, 8))
		cards.push(new Card(HEART, 8))
		const re = cards.getResult()
		expect(re).to.equal('twoP')
	})

	it(`should return 3k`, function () {
		const cards = new FiveCards()
		cards.push(new Card(SPADE, 5))
		cards.push(new Card(DIAMOND, 2))
		cards.push(new Card(HEART, 2))
		cards.push(new Card(CLUB, 8))
		cards.push(new Card(SPADE, 2))
		expect(cards.getResult()).to.equal('threeK')

		cards[2] = new Card(JOKER, 15)
		expect(cards.getResult()).to.equal('threeK')
	})

	it(`should return st`, function () {
		const cards = new FiveCards()
		cards.push(new Card(DIAMOND, 8))
		cards.push(new Card(DIAMOND, 7))
		cards.push(new Card(HEART, 5))
		cards.push(new Card(CLUB, 6))
		cards.push(new Card(JOKER, 14))
		const re = cards.getResult()
		expect(re).to.equal('st')
	})

	it(`should return fl`, function () {
		const cards = new FiveCards()
		cards.push(new Card(DIAMOND, 8))
		cards.push(new Card(DIAMOND, 7))
		cards.push(new Card(DIAMOND, 2))
		cards.push(new Card(DIAMOND, 10))
		cards.push(new Card(DIAMOND, 3))
		expect(cards.getResult()).to.equal('fl')

		cards[3] = new Card(JOKER, 14)
		expect(cards.getResult()).to.equal('fl')
	})

	it(`should return fh`, function () {
		const cards = new FiveCards()
		cards.push(new Card(DIAMOND, 8))
		cards.push(new Card(DIAMOND, 2))
		cards.push(new Card(HEART, 2))
		cards.push(new Card(CLUB, 8))
		cards.push(new Card(JOKER, 14))
		expect(cards.getResult()).to.equal('fh')
		cards[4] = new Card(SPADE, 8)
		expect(cards.getResult()).to.equal('fh')
	})

	it(`should return 4K`, function () {
		const cards = new FiveCards()
		cards.push(new Card(DIAMOND, 8))
		cards.push(new Card(DIAMOND, 2))
		cards.push(new Card(HEART, 2))
		cards.push(new Card(CLUB, 2))
		cards.push(new Card(SPADE, 2))
		expect(cards.getResult()).to.equal('fourK')
		cards[4] = new Card(JOKER, 15)
		expect(cards.getResult()).to.equal('fourK')
	})

	it(`should return royal rs`, function () {
		const cards = new FiveCards()
		cards.push(new Card(DIAMOND, 10))
		cards.push(new Card(DIAMOND, 11))
		cards.push(new Card(DIAMOND, 12))
		cards.push(new Card(DIAMOND, 13))
		cards.push(new Card(DIAMOND, 1))
		expect(cards.getResult()).to.equal('rs')
	})

	it(`should return 5K`, function () {
		const cards = new FiveCards()
		cards.push(new Card(DIAMOND, 3))
		cards.push(new Card(SPADE, 3))
		cards.push(new Card(HEART, 3))
		cards.push(new Card(CLUB, 3))
		cards.push(new Card(JOKER, 15))
		expect(cards.getResult()).to.equal('fiveK')
	})
})