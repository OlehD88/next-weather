import axios from 'axios'

import { ForecastDayItem, TemperatureUnit, WeatherConditionHistoryItem } from '@/types/forecast'
import { getForcastItemsFromFewDaysForcast, getWeatherConditionHistoryItems } from './forecast'

export const fetchFewDaysForecast = async (
	locationKey: string,
	temperatureUnit: TemperatureUnit,
): Promise<ForecastDayItem[]> => {
	try {
		const res = await axios.get(`/api/fiveDaysForcast/${locationKey}`, {
			params: { metric: temperatureUnit === TemperatureUnit.Celsius },
		})
		const daysForecast = getForcastItemsFromFewDaysForcast(res.data)
		return daysForecast
	} catch (error) {
		console.error('Failed to fetch few days forcast', error)
		throw error
	}
}

export const fetchWeatherConditionsHistory = async (
	locationKey: string,
): Promise<WeatherConditionHistoryItem[]> => {
	try {
		const res = await axios.get(`/api/currentConditionsHistory/${locationKey}`)
		const historyItems = getWeatherConditionHistoryItems(res.data)
		return historyItems
	} catch (error) {
		console.error('Failed to fetch weather conditions history', error)
		throw error
	}
}

export const fetchCurrentWeatherConditions = async (
	locationKey: string,
): Promise<WeatherConditionHistoryItem> => {
	try {
		const res = await axios.get(`/api/currentConditions/${locationKey}`)
		const currentConditions = getWeatherConditionHistoryItems(res.data)[0]

		return currentConditions
	} catch (error) {
		console.error('Failed to fetch current conditions', error)
		throw error
	}
}
