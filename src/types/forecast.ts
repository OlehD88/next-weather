export enum TemperatureUnit {
	Celsius = 'C',
	Fahrenheit = 'F',
}

export type ForecastDayItem = {
	date: string
	icon: number
	maxTemperature?: number
	minTemperature?: number
	currentTemperature?: number
	weatherInfo: string
}
