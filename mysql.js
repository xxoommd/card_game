const mysql =  require('mysql')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'card_game'
})

connection.connect(err => {
	if (err) {
		console.error('MySQL connection failed:', err.message)
	}
})

module.exports = connection