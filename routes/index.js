const express = require('express')
const router = express.Router()
const FiveCards = require('../models/card').FiveCards

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Express'
	})
})

router.get('/main', (req, res) => {
	if (req.session && req.session.user) {
		res.json({
			status: 0,
			user: req.session.user,
			desc: 'OK'
		})
	} else {
		res.json({
			status: 1,
			desc: 'No login'
		})
	}
	
})

router.get('/random', (req, res) => {
	const cards = FiveCards.createRandom()
	res.json({
		status: 0,
		cards: cards,
		result: cards.getResult(),
		desc: 'OK'
	})
})

module.exports = router