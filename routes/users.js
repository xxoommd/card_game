const express = require('express')
const router = express.Router()
const mysql = require('../mysql')
const md5 = require('../md5')

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource')
})

const reg_username = /^[a-zA-Z]\w{3,}/

/*{
	"status": 0 / 成功，1 / 失败
	"desc": ''
}
*/
router.post('/create', (req, res) => {
	console.log('req.body:', req.body)
	const username = req.body.username
	const password = req.body.password

	// 1. 检查用户名的合法性
	if (username.length === 0 || password.length === 0 
		|| !reg_username.test(username)) {
		res.json({
			status: 1,
			desc: `invalid input`
		})
		return
	}

	// 2. 重复用户名判断
	let sql = `select id from User 
		where username="${username}"`;
	mysql.query(sql, (err, result) => {
		if (err) {
			console.error(err.message)
			res.json({
				status: 1,
				desc: 'Internal error'
			})
			return
		}

		if (result.length > 0) {
			res.json({
				status: 1,
				desc: `User:${req.body.username} already exists`
			})
			return
		}

		// code of register:
		let passSalt = md5.encode(`${username}+${Date.now()}`)
		let passHash = md5.encode(`${password}+${passSalt}`)

		sql = `insert into User(username, pass_hash, pass_salt)
			values(
				"${username}",
				"${passHash}",
				"${passSalt}"
		)`
		mysql.query(sql, (err, result) => {
			if (err) {
				console.error(err.message)
				res.json({
					status: 1,
					desc: 'failed'
				})
				return
			}

			res.json({
				status: 0,
				desc: 'OK'
			})
		})
	})

	
})

router.post('/login', (req, res) => {
	const username = req.body.username
	const password = req.body.password

	let sql = `select * from user where username="${username}"`
	mysql.query(sql, (err, result) => {
		if (err) {
			console.error(err.message)
			res.json({status: 1, desc: "DB error"})
			return
		}

		console.log('resutl: ', result)
		if (result.length === 0) {
			res.json({
				status: 0,
				desc: 'User not exists'
			})
			return
		}

		const user = result[0]
		const passHash = md5.encode(`${password}+${user.pass_salt}`)
		
		if (user.pass_hash !== passHash) {
			res.json({
				status: 1,
				desc: 'Wrong password'
			})
			return
		}

		res.json({
			status: 0,
			desc: 'OK'
		})
	})
})

module.exports = router