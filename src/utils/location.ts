import { LocationData } from '@/types/location'

export const getLocationName = ({ cityName, countryCode }: LocationData) => {
	if (!cityName) return null

	return !countryCode ? cityName : `${cityName}, ${countryCode}`
}

export const getLocationData = (res: {
	LocalizedName: string
	Country: {
		ID: string
	}
	Key: string
}): LocationData => {
	return {
		locationKey: res.Key,
		cityName: res.LocalizedName,
		countryCode: res.Country.ID,
	}
}
