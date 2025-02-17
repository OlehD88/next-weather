'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { TemperatureUnit } from '@/types/forecast'

type ForecastContextType = {
	temperatureUnit: TemperatureUnit
	setTemperatureUnit: (temperatureUnit: TemperatureUnit) => void
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

	const values: ForecastContextType = {
		temperatureUnit,
		setTemperatureUnit,
	}

	return <ForecastContext.Provider value={values}>{children}</ForecastContext.Provider>
}
