const mbHelper = require('mountebank-helper')

const imposter = new mbHelper.Imposter({
	'imposterPort': 3000,
})

const xratesResponse = {
	'uri': '/xrates',
	'verb': 'GET',
	'res': {
		'statusCode': 200,
		'responseHeaders': {'Content-Type': 'application/json'},
		'responseBody': JSON.stringify({
			'AUD': 53.6970,
			'AZN': 43.7743,
			'AMD': 15.5396,
			'BYN': 29.6175,
			'BGN': 42.7453,
			'BRL': 13.3483,
		}),
	},
}

imposter.addRoute(xratesResponse)

mbHelper.startMbServer(2525)
	.then(function () {
		imposter.postToMountebank()
			.then(() => {
				console.log('Imposter Posted! Go to http://localhost:3000/xrates')
			})
	})
