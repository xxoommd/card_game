const TYPE_NAME = [
	'joker',
	'spade', 
	'diamond', 
	'heart', 
	'club'
]

const buttons = {
	pour: 	$('#btn_pour'),
	switch: $('#btn_switch'),
	add: 	$('#btn_add'),
	sub: 	$('#btn_sub'),
	clear: 	$('#btn_clear'),
	game: 	$('#btn_game')
}

const cards = []
for (let i = 1; i <= 5; i++) {
	const card = $(`#card_${i}`)
	card.checkBox = $(`checkbox_${i}`)
	cards.push(card)
}

const labels = {
	bonus: {
		fiveK: 	$('#bonus_5k'),
		rs: 	$('#bonus_rs'),
		sf: 	$('#bonus_sf'),
		fourk: 	$('#bonus_4k'),
	},
	pokers: {
		fiveK: 	$('#pokers_5k'),
		rs: 	$('#pokers_rs'),
		sf: 	$('#pokers_sf'),
		fourK: 	$('#pokers_4k'),
		fh: 	$('#pokers_fh'),
		fl: 	$('#pokers_fl'),
		st: 	$('#pokers_st'),
		threeK: $('#pokers_3k'),
		twoP: 	$('#pokers_2p'),
		oneP: 	$('#pokers_1p'),
	},
	bet: $('#label_bet')
}

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

// TODO 根据betCash刷新Pokers Points
let betCash = 0
let updateBetCash = function () {
	labels.bet.text(`下注金额：${betCash}`)
}

buttons.add.on('click', function () {
	betCash += 100
	updateBetCash()
})

buttons.sub.on('click', function () {
	betCash -= 100
	if (betCash < 0) betCash = 0
	updateBetCash()
})

buttons.clear.on('click', function () {
	betCash = 0
	updateBetCash()
})

buttons.game.on('click', function () {
	$.post('/game/pour', {bet_cash: betCash}, res => {
		if (res.status !== 0) {
			alert(res.desc)
			return
		}

		for (let i = 0; i < 5; i++) {
			const card = res.cards[i]
			const imgURL = `images/cards/${TYPE_NAME[card.type]}_${card.value}.png`
			cards[i].attr('src', imgURL)
		}
	})
})

buttons.switch.on('click', function () {
	$.get('/random', res => {
		console.log(res)
		for (let i = 0; i < 5; i++) {
			const card = res.cards[i]
			const imgURL = `images/cards/${TYPE_NAME[card.type]}_${card.value}.png`
			// console.log(imgURL)
			cards[i].attr('src', imgURL)
		}

		let r = res.result
		if (!r) r = 'No bonus'
		buttons.switch.text(`Switch: ${r}`)
	})
})