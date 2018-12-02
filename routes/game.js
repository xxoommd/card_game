const express = require('express')
const router = express.Router()

const GAME_IDLE = 0
const GAME_POUR = 1
const GAME_START = 2
const GAME_SWITCH = 3
const GAME_WIN = 4
const GAME_OVER = 5

router.post('/pour', (req, res) => {

})

router.post('/start', (req, res) => {

})

router.post('/switch', (req, res) => {

})

router.post('guess', (req, res) => {

})

router.post('win', (req, res) => {

})

module.exports = router