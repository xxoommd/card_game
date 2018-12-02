const crypto = require('crypto')

function encode (words) {
	const hash = crypto.createHash('md5')
	hash.update(words)
	return hash.digest('hex')
}

module.exports = {
	encode: encode
}