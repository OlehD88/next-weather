const https = require('https') // eslint-disable-line
const fs = require('fs') // eslint-disable-line
const path = require('path') // eslint-disable-line
const { JSDOM } = require('jsdom') // eslint-disable-line

const ICONS_URL = 'https://developer.accuweather.com/weather-icons'
const DOWNLOAD_DIR = path.join(__dirname, 'public/icons')

async function fetchIcons() {
	if (fs.existsSync(DOWNLOAD_DIR)) {
		fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true })
	}

	try {
		https
			.get(ICONS_URL, (res) => {
				let data = ''

				res.on('data', (chunk) => {
					data += chunk
				})

				res.on('end', () => {
					const dom = new JSDOM(data)
					const document = dom.window.document

					// Ensure the download directory exists
					if (!fs.existsSync(DOWNLOAD_DIR)) {
						fs.mkdirSync(DOWNLOAD_DIR)
					}

					// Parse the HTML to find icon elements
					const iconRowElements = document
						.getElementById('block-system-main')
						.querySelector('tbody')
						.querySelectorAll('tr')

					iconRowElements.forEach((element) => {
						const iconNumber = Number(element.querySelector('td').textContent)
						const iconUrl = element.querySelector('img').src

						if (iconUrl) {
							const iconName = `${iconNumber}.png`
							const iconPath = path.join(DOWNLOAD_DIR, iconName)
							downloadIcon(iconUrl, iconPath)
						}
					})
				})
			})
			.on('error', (err) => {
				console.error('Error fetching icons:', err)
			})
	} catch (error) {
		console.error('Error fetching icons:', error)
	}
}

function downloadIcon(url, filePath) {
	const file = fs.createWriteStream(filePath)
	https
		.get(url, (response) => {
			response.pipe(file)
			file.on('finish', () => {
				file.close()
				console.log(`Downloaded ${filePath}`)
			})
		})
		.on('error', (err) => {
			fs.unlink(filePath)
			console.error('Error downloading icon:', err)
		})
}

fetchIcons()
