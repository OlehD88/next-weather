const TEMPERATURE_SIGN = 'º'

export const formatTemperature = (temperature: number) => {
	return `${temperature}${TEMPERATURE_SIGN}`
}
