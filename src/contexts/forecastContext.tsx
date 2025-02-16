'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import axios from 'axios'
import { ForecastDayItem, TemperatureUnit, WeatherConditionHistoryItem } from '@/types/forecast'
import {
	getForcastItemsFromFewDaysForcast,
	getWeatherConditionHistoryItems,
} from '@/utils/forecast'

type ForecastContextType = {
	temperatureUnit: TemperatureUnit
	setTemperatureUnit: (temperatureUnit: TemperatureUnit) => void
	fewDaysForcast: ForecastDayItem[]
	fetchFewDaysForecast: (locationKey: string) => void
	weatherConditionsHistory: WeatherConditionHistoryItem[]
	fetchWeatherConditionsHistory: (locationKey: string) => void
	currentWeatherConditions?: WeatherConditionHistoryItem
	fetchCurrentWeatherConditions: (locationKey: string) => void
}

const ForecastContext = createContext<ForecastContextType | undefined>(undefined)

export const useForecast = (): ForecastContextType => {
	const context = useContext(ForecastContext)

	if (context === undefined) {
		throw new Error('useForecast must be used within a ForecastProvider')
	}

	return context
}

type ForecastProviderProps = {
	children: ReactNode
}

export const ForecastProvider: React.FC<ForecastProviderProps> = ({ children }) => {
	const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(TemperatureUnit.Celsius)
	const [fewDaysForcast, setFewDaysForcast] = useState<ForecastDayItem[]>([])
	const [currentWeatherConditions, setCurrentWeatherConditions] =
		useState<WeatherConditionHistoryItem>()
	const [weatherConditionsHistory, setWeatherConditionsHistory] = useState<
		WeatherConditionHistoryItem[]
	>([])

	const fetchFewDaysForecast = async (locationKey: string) => {
		try {
			const res = await axios.get(`/api/fiveDaysForcast/${locationKey}`, {
				params: { metric: temperatureUnit === TemperatureUnit.Celsius },
			})
			const daysForecast = getForcastItemsFromFewDaysForcast(res.data)
			setFewDaysForcast(daysForecast)
		} catch (error) {
			console.error('Failed to fetch few days forcast', error)
		}
	}

	const fetchWeatherConditionsHistory = async (locationKey: string) => {
		try {
			const res = await axios.get(`/api/currentConditionsHistory/${locationKey}`)
			const historyItems = getWeatherConditionHistoryItems(res.data)
			setWeatherConditionsHistory(historyItems)
		} catch (error) {
			console.error('Failed to fetch weather conditions history', error)
		}
	}

	const fetchCurrentWeatherConditions = async (locationKey: string) => {
		try {
			const res = await axios.get(`/api/currentConditions/${locationKey}`)
			const currentConditions = getWeatherConditionHistoryItems(res.data)[0]

			setCurrentWeatherConditions(currentConditions)
		} catch (error) {
			console.error('Failed to fetch current conditions', error)
		}
	}

	const values: ForecastContextType = {
		temperatureUnit,
		setTemperatureUnit,
		fewDaysForcast,
		fetchFewDaysForecast,
		weatherConditionsHistory,
		fetchWeatherConditionsHistory,
		currentWeatherConditions: currentWeatherConditions,
		fetchCurrentWeatherConditions: fetchCurrentWeatherConditions,
	}

	return <ForecastContext.Provider value={values}>{children}</ForecastContext.Provider>
}
