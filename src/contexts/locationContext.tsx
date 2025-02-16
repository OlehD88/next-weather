'use client'
import { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { LocationData } from '@/types/location'
import { getLocationData } from '@/utils/location'

type LocationContextType = {
	locationData: LocationData | null
	setLocationData: (locationData: LocationData) => void
	getCitiesSuggestions: (searchQuery: string) => Promise<LocationData[]>
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

	const fetchLocationByPosition = async (
		position: GeolocationPosition,
	): Promise<LocationData | null> => {
		const { latitude, longitude } = position.coords
		try {
			const res = await axios.get('/api/geopositionSearch', {
				params: { lat: latitude, lon: longitude },
			})
			const locationData = getLocationData(res.data)
			return locationData
		} catch (error) {
			console.error('Failed to fetch location data', error)
			return null
		}
	}

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

	const getCitiesSuggestions = async (searchQuery: string) => {
		try {
			const res = await axios.get('/api/citiesAutocomplete', {
				params: { searchQuery },
			})
			const locationDataList = res.data.map(getLocationData)
			return locationDataList
		} catch (error) {
			console.error('Failed to fetch cities suggestions', error)
			return []
		}
	}

	useEffect(() => {
		handleInitUserLocation()
	}, [])

	return (
		<LocationContext.Provider value={{ locationData, setLocationData, getCitiesSuggestions }}>
			{children}
		</LocationContext.Provider>
	)
}
