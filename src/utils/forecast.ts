import { ForecastDayItem, TemperatureUnit, WeatherConditionHistoryItem } from '@/types/forecast'

const TEMPERATURE_SIGN = 'º'

export const formatTemperature = (temperature: number) => {
	return `${temperature}${TEMPERATURE_SIGN}`
}

type PartialForecastResponse = {
	DailyForecasts: {
		Date: string
		Day: {
			Icon: number
			IconPhrase: string
		}
		Temperature: {
			Maximum: {
				Value: number
			}
			Minimum: {
				Value: number
			}
		}
	}[]
}
export const getForcastItemsFromFewDaysForcast = (
	forecast: PartialForecastResponse,
): ForecastDayItem[] => {
	const daysForecast = forecast.DailyForecasts.map((day) => {
		return {
			date: day.Date,
			icon: day.Day.Icon,
			maxTemperature: day.Temperature.Maximum.Value,
			minTemperature: day.Temperature.Minimum.Value,
			weatherInfo: day.Day.IconPhrase,
		}
	})
	return daysForecast
}

type PartialWeatherConditionHistoryResponse = {
	LocalObservationDateTime: string
	WeatherText: string
	Temperature: {
		Metric: {
			Value: number
		}
		Imperial: {
			Value: number
		}
	}
}[]
export const getWeatherConditionHistoryItems = (
	history: PartialWeatherConditionHistoryResponse,
): WeatherConditionHistoryItem[] => {
	console.log('history', history)
	const historyItems = history.map((item) => {
		return {
			date: item.LocalObservationDateTime,
			weatherInfo: item.WeatherText,
			temperature: {
				[TemperatureUnit.Celsius]: item.Temperature.Metric.Value,
				[TemperatureUnit.Fahrenheit]: item.Temperature.Imperial.Value,
			},
		}
	})
	return historyItems
}
