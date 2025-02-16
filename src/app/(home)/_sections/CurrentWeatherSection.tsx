'use client'

import { useEffect } from 'react'

import { CurrentWeather } from '@/components/CurrentWeather/CurrentWeather'
import { useForecast } from '@/contexts/forecastContext'
import { useLocation } from '@/contexts/locationContext'
import { getLocationName } from '@/utils/location'
import Image from 'next/image'

export const CurrentWeatherSection = () => {
	const {
		temperatureUnit,
		setTemperatureUnit,
		currentWeatherConditions,
		fetchCurrentWeatherConditions,
	} = useForecast()
	const { locationData } = useLocation()

	useEffect(() => {
		if (locationData?.locationKey) {
			fetchCurrentWeatherConditions(locationData.locationKey)
		}
	}, [locationData?.locationKey])

	const locationName = getLocationName(locationData)
	const currentWeather = currentWeatherConditions

	return (
		<section className="dark-section pt-14 pb-32 flex justify-center">
			{!currentWeather ? (
				<div>
					<Image
						src="/spinner.svg"
						alt="Loading"
						width={160}
						height={160}
						className="animate-spin"
					/>
				</div>
			) : (
				<CurrentWeather
					unit={temperatureUnit}
					location={locationName || ''}
					temperature={currentWeather?.temperature?.[temperatureUnit]}
					weatherInfo={currentWeather?.weatherInfo}
					date={currentWeather?.date}
					onUnitChange={setTemperatureUnit}
				/>
			)}
		</section>
	)
}
