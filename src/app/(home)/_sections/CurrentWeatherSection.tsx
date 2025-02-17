'use client'

import { useQuery } from '@tanstack/react-query'

import { CurrentWeather } from '@/components/CurrentWeather/CurrentWeather'
import { useForecast } from '@/contexts/forecastContext'
import { useLocation } from '@/contexts/locationContext'
import { getLocationName } from '@/utils/location'
import { fetchCurrentWeatherConditions } from '@/utils/forecast-api'

export const CurrentWeatherSection = () => {
	const { temperatureUnit, setTemperatureUnit } = useForecast()
	const { locationData } = useLocation()

	const initDataToShow = {
		temperature: { C: 0, F: 0 },
		weatherInfo: 'Fetching weather data...',
		date: Date(),
	}
	let dataToShow = initDataToShow

	const {
		data = initDataToShow,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['currentWeatherConditions', locationData?.locationKey],
		queryFn: () => fetchCurrentWeatherConditions(locationData?.locationKey!),
		enabled: !!locationData?.locationKey,
	})

	if (isLoading) {
		dataToShow = initDataToShow
	} else if (isError) {
		dataToShow = {
			temperature: { C: 0, F: 0 },
			weatherInfo: 'Failed to fetch data',
			date: '',
		}
	} else {
		dataToShow = data
	}

	let locationName = 'Checking your location'
	if (locationData) {
		locationName = getLocationName(locationData) || ''
	}

	return (
		<section className="dark-section pt-14 pb-32 px-4">
			<CurrentWeather
				unit={temperatureUnit}
				location={locationName || 'Checking your location...'}
				temperature={dataToShow?.temperature?.[temperatureUnit]}
				weatherInfo={dataToShow?.weatherInfo}
				date={dataToShow?.date}
				onUnitChange={setTemperatureUnit}
			/>
		</section>
	)
}
