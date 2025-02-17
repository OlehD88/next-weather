import axios from 'axios'

import { LocationData } from '@/types/location'
import { getLocationData } from './location'

export const fetchLocationByPosition = async (
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

export const getCitiesSuggestions = async (searchQuery: string) => {
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
