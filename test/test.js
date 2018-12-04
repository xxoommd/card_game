const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('../app')
expect = chai.expect


describe('1. Testing Array', function () {
	it('should return -1 when the value is not present', function () {
		let x = [1, 2, 3].indexOf(4)
		expect(x).to.equal(-1)
	})
})

describe('2. Testing get /users', function () {
	it('should return OK when access /users path', function () {
		chai.request(app)
			.get('/users')
			.end((err, res) => {
				expect(err).to.be.null
				expect(res).to.have.status(200)
				expect(res).to.be.json
				expect(res).to.have.property('body')
				expect(res.body).to.have.all.keys('status', 'desc')
				expect(res.body).to.have.property('status', 0)
				expect(res.body).to.have.property('desc', 'OK')
			})
	})
})