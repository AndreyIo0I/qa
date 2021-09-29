const execSync = require('child_process').execSync;
const fs = require('fs')
const tests = fs.readFileSync('tests.txt', 'utf-8').split(/(?:\r\n)+/).slice(0, -1)

for (let i = 0; i < tests.length; i += 2) {
	const params = tests[i].slice(1)
	const expectedResult = tests[i + 1]
	const result = execSync(`node triangle ${params}`).toString().trim()
	if (result === expectedResult) {
		console.log(`${i / 2 + 1}) success;`)
	}
	else {
		console.log(`${i / 2 + 1}) error; params = '${params}' result = '${result}' expected = '${expectedResult}'`)
	}
}