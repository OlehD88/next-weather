import { ForecastDayItem } from '@/types/forecast'

const TEMPERATURE_SIGN = 'º'

export const formatTemperature = (temperature: number) => {
	return `${temperature}${TEMPERATURE_SIGN}`
}

export const getForcastItemsFromFewDaysForcast = (forecast: {
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
}): ForecastDayItem[] => {
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
