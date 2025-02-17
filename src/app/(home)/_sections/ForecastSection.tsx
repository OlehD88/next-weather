'use client'

import { useQuery } from '@tanstack/react-query'

import { WeatherCard } from '@/components/WeatherCard/WeatherCard'
import { useForecast } from '@/contexts/forecastContext'
import { useLocation } from '@/contexts/locationContext'
import { Spinner } from '@/components/Spinner/Spinner'
import { fetchFewDaysForecast } from '@/utils/forecast-api'

export const ForecastSection = () => {
	const { temperatureUnit } = useForecast()
	const { locationData } = useLocation()

	const { data = [], isLoading } = useQuery({
		queryKey: ['fewDaysForecast', locationData?.locationKey, temperatureUnit],
		queryFn: () => fetchFewDaysForecast(locationData?.locationKey!, temperatureUnit),
		enabled: !!locationData?.locationKey,
	})

	return (
		<section className="flex justify-center pt-24 pb-28 px-4">
			<div className="max-w-5xl w-full">
				<h2 className="text-center md:text-left text-4xl font-bold accent-color mb-24">
					5 Days Forecast
				</h2>
				<div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-stretch justify-center gap-4">
					{isLoading && <Spinner />}
					{data.map((day) => (
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
