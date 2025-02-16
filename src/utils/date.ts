export const getDayNameFromDate = (dateString: string, locale: string = 'en-US') => {
	const date = new Date(dateString)
	if (date.toString() === 'Invalid Date') {
		return null
	}

	return date.toLocaleDateString(locale, { weekday: 'long' })
}

export const getShortDateInfo = (dateString: string, locale: string = 'en-US') => {
	const date = new Date(dateString)
	if (date.toString() === 'Invalid Date') {
		return null
	}

	const shortDayName = date.toLocaleDateString(locale, { weekday: 'short' })
	const dayNumber = date.getDate()

	return `${shortDayName.toUpperCase()} ${dayNumber}`
}
