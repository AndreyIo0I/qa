import mbHelper from 'mountebank-helper'

const imposter = new mbHelper.Imposter({
	'imposterPort': 3000,
})

const RUB = 1
const EUR = 83.24
const USD = 73.75

// todo rub, usd, eur, invalid, all

const RUBXratesResponse = {
	'uri': '/xrates/rub$',
	'verb': 'GET',
	'res': {
		'statusCode': 200,
		'responseHeaders': {'Content-Type': 'application/json'},
		'responseBody': JSON.stringify({
			EUR: EUR / RUB,
			USD: USD / RUB,
		}),
	},
}

const EURXratesResponse = {
	'uri': '/xrates/eur$',
	'verb': 'GET',
	'res': {
		'statusCode': 200,
		'responseHeaders': {'Content-Type': 'application/json'},
		'responseBody': JSON.stringify({
			RUB: RUB / EUR,
			USD: USD / EUR,
		}),
	},
}

const USDXratesResponse = {
	'uri': '/xrates/usd$',
	'verb': 'GET',
	'res': {
		'statusCode': 200,
		'responseHeaders': {'Content-Type': 'application/json'},
		'responseBody': JSON.stringify({
			RUB: RUB / USD,
			EUR: EUR / USD,
		}),
	},
}

const AllXratesResponse = {
	'uri': '/xrates$',
	'verb': 'GET',
	'res': {
		'statusCode': 200,
		'responseHeaders': {'Content-Type': 'application/json'},
		'responseBody': JSON.stringify({
			RUB,
			EUR,
			USD,
		}),
	},
}

const Response404 = {
	'uri': '',
	'verb': 'GET',
	'res': {
		'statusCode': 200,
		'responseHeaders': {'Content-Type': 'text/html'},
		'responseBody': '404',
	},
}

imposter.addRoute(RUBXratesResponse)
imposter.addRoute(EURXratesResponse)
imposter.addRoute(USDXratesResponse)
imposter.addRoute(AllXratesResponse)
imposter.addRoute(Response404)

mbHelper.startMbServer(2525)
	.then(function () {
		imposter.postToMountebank()
			.then(() => {
				console.log('Imposter Posted! Go to\n' +
					'http://localhost:3000/xrates/rub,\n' +
					'http://localhost:3000/xrates/eur,\n' +
					'http://localhost:3000/xrates/usd,\n' +
					'http://localhost:3000/xrates,\n' +
					'http://localhost:3000/xrates/404\n'
				)
			})
	})
