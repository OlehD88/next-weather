'use client'

import { TemperatureUnit } from '@/types/weather'
import { CurrentWeather } from './CurrentWeather'

export const CurrentWeatherContainer = () => {
	const mockData = {
		location: 'New York',
		temperature: 25,
		weatherInfo: 'Sunny',
		date: '2021-08-20T10:00:00Z',
		unit: TemperatureUnit.Celsius,
	}

	const onUnitChange = () => {}

	return (
		<section className="dark-section pt-14 pb-32 flex justify-center">
			<CurrentWeather {...mockData} onUnitChange={onUnitChange} />
		</section>
	)
}
