import { LocationData } from '@/types/location'

export const getLocationName = ({ cityName, countryCode }: LocationData) => {
	if (!cityName) return null

	return !countryCode ? cityName : `${cityName}, ${countryCode}`
}
