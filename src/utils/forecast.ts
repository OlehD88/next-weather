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
			maxTemperature: Math.round(day.Temperature.Maximum.Value),
			minTemperature: Math.round(day.Temperature.Minimum.Value),
			weatherInfo: day.Day.IconPhrase,
		}
	})
	return daysForecast
}

type PartialWeatherConditionHistoryItem = {
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
}
export const getWeatherConditionHistoryItems = (
	history: PartialWeatherConditionHistoryItem[],
): WeatherConditionHistoryItem[] => {
	const historyItems = history.map((item) => {
		return {
			date: item.LocalObservationDateTime,
			weatherInfo: item.WeatherText,
			temperature: {
				[TemperatureUnit.Celsius]: Math.round(item.Temperature.Metric.Value),
				[TemperatureUnit.Fahrenheit]: Math.round(item.Temperature.Imperial.Value),
			},
		}
	})
	return historyItems
}

export const buildWeatherHistoryChartData = (
	data: WeatherConditionHistoryItem[],
	unit: TemperatureUnit,
) => {
	const threeHoursStepData = data.filter((_, index) => index % 3 === 0)
	const reversed = threeHoursStepData.reverse()

	const chartData = reversed.map((item) => {
		const hours = new Date(item.date).getHours()
		const temperature = item.temperature[unit]

		return {
			time: `${hours}:00`,
			temperature: temperature,
		}
	})
	return chartData
}
