const process = require('process')

const a = parseFloat(process.argv[2])
const b = parseFloat(process.argv[3])
const c = parseFloat(process.argv[4])

printTypeOfTriangle()

function printTypeOfTriangle() {
	const MIN_VALUABLE_VALUE = 1e-10
	function equals(a, b) {
		return Math.abs(a - b) < MIN_VALUABLE_VALUE
	}

	function lessOrEquals(a, b) {
		return a - b < MIN_VALUABLE_VALUE
	}

	if (isNaN(a) || isNaN(b) || isNaN(c) || typeof process.argv[5] !== 'undefined') {
		console.log('неизвестная ошибка')
		return
	}

	if (
		lessOrEquals(a, 0)
		|| lessOrEquals(b, 0)
		|| lessOrEquals(c, 0)
		|| lessOrEquals(a + b, c)
		|| lessOrEquals(b + c, a)
		|| lessOrEquals(c + a, b)
	) {
		console.log('не треугольник')
		return
	}

	if (equals(a, b) && equals(b, c)) {
		console.log('равносторонний')
	}
	else if (equals(a, b) || equals(a, c) || equals(b, c)) {
		console.log('равнобедренный')
	}
	else {
		console.log('обычный')
	}
}
