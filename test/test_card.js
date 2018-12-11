const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('../app')
expect = chai.expect


describe('1. Testing Cards Array', function () {
	it('should return -1 when the value is not present', function () {
		let x = [1, 2, 3].indexOf(4)
		expect(x).to.equal(-1)
	})
})