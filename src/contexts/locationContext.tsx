'use client'
import { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { LocationData } from '@/types/location'
import { fetchLocationByPosition } from '@/utils/location-api'

type LocationContextType = {
	locationData: LocationData | null
	setLocationData: (locationData: LocationData) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export const useLocation = (): LocationContextType => {
	const context = useContext(LocationContext)

	if (context === undefined) {
		throw new Error('useForecast must be used within a ForecastProvider')
	}

	return context
}

type LocationProviderProps = {
	children: ReactNode
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
	const [locationData, setLocationData] = useState<LocationData | null>(null)

	const handleInitUserLocation = async () => {
		if (navigator?.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const locationData = await fetchLocationByPosition(position)
					setLocationData(locationData)
				},
				(error) => {
					console.error(
						"We can't show your current location weather. Please share with us your location to see the weather in your city",
						error,
					)
				},
			)
		} else {
			console.error('Failec to get your location. Geolocation is not supported by this browser')
		}
	}

	useEffect(() => {
		handleInitUserLocation()
	}, [])

	return (
		<LocationContext.Provider value={{ locationData, setLocationData }}>
			{children}
		</LocationContext.Provider>
	)
}
