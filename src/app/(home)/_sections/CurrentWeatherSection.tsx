'use client'

import { useQuery } from '@tanstack/react-query'

import { CurrentWeather } from '@/components/CurrentWeather/CurrentWeather'
import { useForecast } from '@/contexts/forecastContext'
import { useLocation } from '@/contexts/locationContext'
import { getLocationName } from '@/utils/location'
import { Spinner } from '@/components/Spinner/Spinner'
import { fetchCurrentWeatherConditions } from '@/utils/forecast-api'

export const CurrentWeatherSection = () => {
	const { temperatureUnit, setTemperatureUnit } = useForecast()
	const { locationData } = useLocation()

	const {
		data = {
			temperature: { C: 0, F: 0 },
			weatherInfo: 'Fetching weather data...',
			date: Date(),
		},
		isLoading,
	} = useQuery({
		queryKey: ['currentWeatherConditions', locationData?.locationKey],
		queryFn: () => fetchCurrentWeatherConditions(locationData?.locationKey!),
		enabled: !!locationData?.locationKey,
	})

	const locationName = getLocationName(locationData)

	return (
		<section className="dark-section pt-14 pb-32 px-4">
			{isLoading ? (
				<Spinner />
			) : (
				<CurrentWeather
					unit={temperatureUnit}
					location={locationName || 'Checking your location'}
					temperature={data?.temperature?.[temperatureUnit]}
					weatherInfo={data?.weatherInfo}
					date={data?.date}
					onUnitChange={setTemperatureUnit}
				/>
			)}
		</section>
	)
}
