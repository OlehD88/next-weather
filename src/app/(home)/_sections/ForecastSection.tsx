'use client'

import { useEffect } from 'react'
import { WeatherCard } from '@/components/WeatherCard/WeatherCard'
import { useForecast } from '@/contexts/forecastContext'
import { useLocation } from '@/contexts/locationContext'
import { Spinner } from '@/components/Spinner/Spinner'

export const ForecastSection = () => {
	const { temperatureUnit, fewDaysForcast, fetchFewDaysForecast } = useForecast()
	const { locationData } = useLocation()

	useEffect(() => {
		if (locationData?.locationKey) {
			fetchFewDaysForecast(locationData.locationKey)
		}
	}, [locationData?.locationKey, temperatureUnit])

	return (
		<section className="flex justify-center pt-24 pb-28 px-4">
			<div className="max-w-5xl w-full">
				<h2 className="text-center md:text-left text-4xl font-bold accent-color mb-24">
					5 Days Forecast
				</h2>
				<div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-stretch justify-center gap-4">
					{!fewDaysForcast.length && <Spinner />}
					{fewDaysForcast.map((day) => (
						<WeatherCard
							key={day.date}
							date={day.date}
							icon={day.icon}
							maxTemperature={day.maxTemperature}
							minTemperature={day.minTemperature}
							weatherInfo={day.weatherInfo}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
