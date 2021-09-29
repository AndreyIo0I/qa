const http = require('http')
const fs = require('fs')
const process = require('process')
const url = process.argv[2]

const URL_REGEXP = /href="([^"]+)"/g

http.get(url, (res) => {
	const {statusCode} = res
	const contentType = res.headers['content-type']

	let error
	if (statusCode !== 200) {
		error = new Error(`Request Failed. Status Code: ${statusCode}`)
	} else if (contentType !== 'text/html') {
		error = new Error(`Invalid content-type. Expected text/html but received ${contentType}`)
	}
	if (error) {
		console.error(error.message)
		res.resume()
		return
	}

	res.setEncoding('utf8')
	let rawData = ''
	res.on('data', chunk => rawData += chunk)
	res.on('end', () => {
		let output = ''
		const urlsArray = [...rawData.matchAll(URL_REGEXP)]
		urlsArray.forEach(item => output += item[1] + '\n')
		fs.writeFileSync('html.txt', rawData)
		fs.writeFileSync('output.txt', output)
	})
}).on('error', e => {
	console.error(`Got error: ${e.message}`)
})
