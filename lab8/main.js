import mbHelper from 'mountebank-helper'

const imposter = new mbHelper.Imposter({
	'imposterPort': 3000,
})

const RUBtoAUD = 64.128

// todo rub, usd, eur, invalid, all

const RUBXratesResponse = {
	'uri': '/xrates/rub',
	'verb': 'GET',
	'res': {
		'statusCode': 200,
		'responseHeaders': {'Content-Type': 'application/json'},
		'responseBody': JSON.stringify({
			'AUD': RUBtoAUD,
		}),
	},
}

const AUDXratesResponse = {
	'uri': '/xrates/aud',
	'verb': 'GET',
	'res': {
		'statusCode': 200,
		'responseHeaders': {'Content-Type': 'application/json'},
		'responseBody': JSON.stringify({
			'RUB': 1 / RUBtoAUD,
		}),
	},
}

imposter.addRoute(RUBXratesResponse)
imposter.addRoute(AUDXratesResponse)

mbHelper.startMbServer(2525)
	.then(function () {
		imposter.postToMountebank()
			.then(() => {
				console.log('Imposter Posted! Go to http://localhost:3000/xrates/rub, http://localhost:3000/xrates/aud')
			})
	})
