const fs = require('fs')
const process = require('process')
const urlApi = require('url')

const URL_REGEXP = /(?:href|src|cite|formaction|icon|action|manifest|profile|background|longdesc|classid|codebase|data|poster)="([^"]+)"/g
const parsedUrl = urlApi.parse(process.argv[2])
const host = parsedUrl.host
const urlBase = parsedUrl.protocol + '//' + host

const parsedUrls = new Map()

main()

async function main() {
	await analyzeUrl(process.argv[2])

	let ok = ''
	let okCount = 0
	let bad = ''
	let badCount = 0

	parsedUrls.forEach((status, url) => {
		if ([200].includes(status)) {
			ok += status + ' ' + url + '\n'
			++okCount
		}
		else {
			bad += status + ' ' + url + '\n'
			++badCount
		}
	})

	ok += `${okCount}\n${new Date(Date.now()).toLocaleString('ru-RU')}\n`
	bad += `${badCount}\n${new Date(Date.now()).toLocaleString('ru-RU')}\n`
	fs.writeFileSync('ok.txt', ok)
	fs.writeFileSync('bad.txt', bad)
}

async function analyzeUrl(url) {
	return new Promise(async resolve => {
		if (parsedUrls.has(url)) {
			resolve()
			return
		}
		const rawData = await makeRequest(url) || ''
		const urlsArray = [...rawData.matchAll(URL_REGEXP)]
		for (let item of urlsArray) {
			item = item[1]
			if (item.startsWith('http://') || item.startsWith('https://')) {
				await analyzeUrl(item)
			}
			else if (item[0] === '/') {
				await analyzeUrl(urlBase + '/' + item)
			}
			else {
				await analyzeUrl(urlBase + '//' + item)
			}
		}
		resolve()
	})
}

function makeRequest(url) {
	return new Promise(resolve => {
		const http = url.startsWith('https') ? require('https') : require('http')
		try {
			http.get(url, (res) => {
				const {statusCode} = res
				const contentType = res.headers['content-type']

				parsedUrls.set(url, statusCode)

				if (!(statusCode === 200 && contentType && contentType.includes('text/html'))) {
					res.resume()
					resolve()
					return
				}

				res.setEncoding('utf8')
				let rawData = ''
				res.on('data', chunk => rawData += chunk)
				res.on('end', () => resolve(rawData))
			})
				.on('error', () => resolve())
		}
		catch {
			console.warn('Not url: ', url)
		}
	})
}
