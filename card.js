const [JOKER, SPADE, DIAMOND, HEART, CLUB] = 
    [0, 1, 2, 3, 4]
const ICON = ['🃏', '♠️', '♦️', '♥️', '♣️']
const DISPLAY = ['0', 'A', '2', '3', '4', '5',
'6', '7', '8', '9', '10', 'J', 'Q', 'K', 'R', 'B']

class Card {
    constructor(type, value) {
        this.type = type
        this.value = value
    }

    get t() { return this.type }
    get v() { return this.value }

    /**
     * @param
     * @return {Card}
     */
    static createRandom() {
        let value = Math.ceil(Math.random() * 15)
        let type = value > 13 ? JOKER : Math.ceil(Math.random() * 4)
        const card = new Card(type, value)
        return card
    }

    toString() {
        return `${ICON[this.t]} ${DISPLAY[this.v]}`
    }
}

class FiveCards extends Array {
    /**
     * @param 
     * @return {FiveCards}
     */
    static createRandom() {
        const cards = new FiveCards()
        while(cards.length < 5) {
            const card = Card.createRandom()
            if (!cards.include(card)) {
                cards.push(card)
            }
        }
        return cards
	}

    /**
     * @param {Card} card 
     * @return {Boolean}
     */
    include(card) {
        for (const c of this) {
            if (c.t === card.t && c.v === card.v) {
                return true
            }
        }
        return false
	}
	
	/**
     * @param {Number} t
     * @return {Boolean}
     */
	hasType(t) {
		for (const c of this) {
			if (c.t === t) return true
		}
		return false
	}

	/**
     * @param {Number} v 
     * @return {Boolean}
     */
	hasValue(v) {
		for (const c of this) {
			if (c.v === v) return true
		}
		return false
	}

    /**
	 * 分离joker和普通牌，返回的是数组索引
     * @return {Array} [[jokers], [normals]]
     */
    splitJoker() {
        const [j, n] = [[], []]
        this.forEach((c, i) => {
            c.t === JOKER ? j.push(i) : n.push(i)
        })
        return [j, n]
	}
	
	/**
     * 统计相同值的牌数
     * @return {Map}
     */
	_count() {
		const m = new Map()
		this.forEach(c => {
			let x = m.get(c.v)
			if (!x) {
				x = 0
			}
			m.set(c.v, ++x)
		})
		return m
	}

    /**
     * 查找非JOKER牌面最多的卡牌数量
     * @return {Number}
     */
    findMaxValue() {
        const r = this._count()

        let max = -1
		for (let v of r.values()) {
			if (v > max) max = v
		}

        return max
	}
	
	/**
     * 统计最多牌面数 (-> 5K, 4K, 3K, 1P)
     * @return {Number}
     */
	getMostCardsLength() {
		const [jokers, normals] = this.splitJoker()
        let max = this.findMaxValue()
        return jokers.length + max
	}

	/**
     * 统计对子数量(不含Joker)
     * @return {Number}
     */
	getPairCount() {
		const r = this._count()
		let pairCount = 0
		for (let x of r.values()) {
			if (x >= 2) pairCount++
		}

		return pairCount
	}

	/**
     * 判断是否为同花
     * @return {Boolean}
     */
	isFlush() {
		const [jokers, normals] = this.splitJoker()
		let t 
		for (let i of normals) {
			const card = this[i]
			if (!t) {
				t = card.t
				continue
			} else {
				if (t !== card.t) return false
			}
		}

		return true
	}

	/**
     * 判断是否为顺子
     * @return {Boolean}
     */
	isStraight() {
		const counts = this._count()
		if (counts.size !== 5) return false // 有相同的牌不为顺

		let jokerCount = counts.get(14) | 0
		jokerCount += counts.get(15) | 0
		counts.delete(14)
		counts.delete(15)

		let min = Math.min(...counts.keys())
		let max = Math.max(...counts.keys())
		
		if (max - min <= 4) return true // 最大牌面与最小牌面之差不超过4
		if (counts.has(1)) max = 14		// 判断大顺，将A的值替换为14
		return max - min <= 4
	}
	
	/**
     * 返回牌面的结果, '5K', '4K', ...
     * @return {String}
     */
	getResult() {
        return judgeCards(this)
	}
	
	/**
     * 用Emoji打印卡牌信息
     * @return {String}
     */
    toString() {
        let str = ''
        this.forEach(c => {
            str += c.toString() + ' '
        })
        return str
	}
}

const JUDGES = new Map([
    ['fiveK', function(cards) {
        return cards.getMostCardsLength() === 5
    } ],
    ['rs', function(cards) {
		return cards.hasValue(10) && cards.hasValue(1) && cards.isFlush() && cards.isStraight()
	} ],
	['sf', function(cards) {
		return cards.isFlush() && cards.isStraight()
	} ],
    ['fourK', function(cards) {
        return cards.getMostCardsLength() === 4
    } ],
    ['fh', function(cards) {
		return cards.getMostCardsLength() === 3 && cards.getPairCount() === 2
	} ],
    ['fl', function(cards) {
		return cards.isFlush()
	} ],
    ['st', function(cards) {
		return cards.isStraight()
	} ],
    ['threeK', function(cards) { 
        return cards.getMostCardsLength() === 3
	} ],
    ['twoP', function(cards) {
		return cards.getPairCount() === 2
	} ],
    ['oneP', function(cards) {
		return cards.getMostCardsLength() === 2
	} ]
])

/**
 * @param {FiveCards} cards
 * @return {String}
 */
let judgeCards = function(cards) {
    for (let [r, h] of JUDGES.entries()) {
        if (h(cards)) {
            return r
        }
    }

    return null
}

module.exports = {
	Card: Card,
	FiveCards: FiveCards
}