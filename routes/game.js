const express = require('express')
const router = express.Router()
const FiveCards = require('../models/card').FiveCards
const mysql = require('../mysql')

const GAME_IDLE = 0
const GAME_START = 1
const GAME_OVER = 2

const POINTS_RATE = {
	fiveK: 	500,
	rs: 	250,
	sf: 	150,
	fourK: 	60,
	fh: 	12,
	fl: 	8,
	st: 	6,
	threeK: 3,
	twoP: 	2,
	oneP: 	1
}

/*
 * req: bet_cash
*/
router.post('/pour', (req, res) => {
	let game = req.session.game
	if (!game) game = {}

	if (game.status && game.status !== 0) {
		res.json({
			status: 1,
			desc: '游戏正在进行中，不能下注'
		})
		return
	}

	if (req.body.bet_cash <= 0) {
		res.json({
			status: 1,
			desc: '下注金额必须 > 0'
		})
		return
	}

	let user = req.session.user
	if (!user) {
		res.json({
			status: 1,
			desc: '未登录'
		})
		return
	}

	if (user.cash < req.body.bet_cash) {
		res.json({
			status: 1,
			desc: '余额不足'
		})
		return
	}

	user.cash -= req.body.bet_cash

	let sql = `update user set cash=${user.cash} 
		where username="${user.username}";`
	mysql.query(sql, (err, result) => {
		if (err) {
			console.error(err.message)
			res.json({
				status: 1,
				desc: 'Interal error'
			})
			return
		}

		if (result && result.changedRows === 1) {
			const cards = FiveCards.createRandom()
			game.cards = cards
			game.betCash = req.body.bet_cash
			game.status = GAME_START
			req.session.game = game

			res.json({
				status: 0,
				cards: cards,
				cash: user.cash,
				desc: 'OK'
			})
		} else {
			console.error(result)
			res.json({
				status: 1, 
				desc: 'Internal error'
			})
		}
	})

	
})

router.post('/switch', (req, res) => {

})

router.post('/game_over', (req, res) => {

})

module.exports = router