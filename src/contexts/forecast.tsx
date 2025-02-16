'use client'
import { createContext, ReactNode, useState } from 'react'
import axios from 'axios'
import { ForecastDayItem, TemperatureUnit } from '@/types/forecast'
import { getForcastItemsFromFewDaysForcast } from '@/utils/forecast'

type ForecastContextType = {
	temperatureUnit: TemperatureUnit
	setTemperatureUnit: (temperatureUnit: TemperatureUnit) => void
	fewDaysForcast: ForecastDayItem[]
	fetchFewDaysForecast: (locationKey: string) => void
}

const ForecastContext = createContext<ForecastContextType | undefined>(undefined)

type ForecastProviderProps = {
	children: ReactNode
}

export const ForecastProvider: React.FC<ForecastProviderProps> = ({ children }) => {
	const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(TemperatureUnit.Celsius)
	const [fewDaysForcast, setFewDaysForcast] = useState<ForecastDayItem[]>([])

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

	const values = {
		temperatureUnit,
		setTemperatureUnit,
		fewDaysForcast,
		fetchFewDaysForecast,
	}

	return <ForecastContext.Provider value={values}>{children}</ForecastContext.Provider>
}
