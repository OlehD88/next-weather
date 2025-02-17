'use client'
import { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { LocationData } from '@/types/location'
import { fetchLocationByPosition } from '@/utils/location-api'
import { toast } from 'react-toastify'

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
				() => {
					toast.error(
						'Unable to display weather for your current location. Please enable location services in your browser settings.',
						{ autoClose: 5000 },
					)
				},
			)
		} else {
			toast.error(
				'Unable to display weather for your current location. Geolocation is not supported by this browser',
				{ autoClose: 5000 },
			)
			console.error('Failed to get your location. Geolocation is not supported by this browser')
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
