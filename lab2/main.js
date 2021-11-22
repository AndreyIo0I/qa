const fs = require('fs')
const process = require('process')
const urlApi = require('url')

const URL_REGEXP = /href="([^#"]+)[#"]/g
const parsedUrl = urlApi.parse(process.argv[2])
const host = parsedUrl.host
const urlBase = parsedUrl.protocol + '//' + host

const analyzedUrls = new Map()

main()

async function main() {
	fs.writeFileSync('output.txt', '')
	await analyzeUrl(process.argv[2])

	let ok = ''
	let okCount = 0
	let bad = ''
	let badCount = 0

	analyzedUrls.forEach((status, url) => {
		if (status >= 200 && status < 300) {
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
		if (analyzedUrls.has(url)) {
			resolve()
			return
		}
		const rawData = await makeRequest(url) || ''
		const urlsArray = [...rawData.matchAll(URL_REGEXP)]
		Promise.all(urlsArray.map(item => {
			let newUrl = item[1]
			if (newUrl[0] === '/') {
				newUrl = urlBase + newUrl
			}
			else if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
				if (!url.endsWith('/')) {
					newUrl = '/' + newUrl
				}
				newUrl = url + newUrl
			}
			fs.appendFileSync('output.txt', newUrl + '\n')
			return analyzeUrl(newUrl)
		})).finally(() => resolve())
	})
}

function makeRequest(url) {
	if (!analyzedUrls.has(url)) {
		analyzedUrls.set(url, -1)
	}
	return new Promise(resolve => {
		const http = url.startsWith('https') ? require('https') : require('http')
		try {
			http.get(url, (res) => {
				const {statusCode} = res
				const contentType = res.headers['content-type']

				analyzedUrls.set(url, statusCode)

				if (host === urlApi.parse(url).host) {
					res.setEncoding('utf8')
					let rawData = ''
					res.on('data', chunk => rawData += chunk)
					res.on('end', () => resolve(rawData))
				}
				else {
					res.resume()
					resolve()
				}
			})
				.on('error', (err) => {
					if (analyzedUrls.get(url) !== -1) {
						setTimeout(() => {
							analyzedUrls.set(url, -1)
							makeRequest(url).finally(() => resolve())
						}, 200)
					}
					else {
						analyzedUrls.set(url, err.code)
						resolve()
					}
				})
		}
		catch {
			console.warn('Not url: ', url)
		}
	})
}
