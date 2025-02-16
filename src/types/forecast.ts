export enum TemperatureUnit {
	Celsius = 'C',
	Fahrenheit = 'F',
}

export type ForecastDayItem = {
	date: string
	icon: number
	maxTemperature: number
	minTemperature: number
	weatherInfo: string
}

export type WeatherConditionHistoryItem = {
	date: string
	temperature: {
		[TemperatureUnit.Celsius]: number
		[TemperatureUnit.Fahrenheit]: number
	}
	weatherInfo: string
}
