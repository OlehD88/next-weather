import { LocationData } from '@/types/location'
import { getLocationName } from './location'

describe('Location utils functions', () => {
	describe('getLocationName', () => {
		const locationData: LocationData = {
			locationKey: '12345',
			cityName: 'Amsterdam',
			countryCode: 'NL',
		}

		it('should return a proper location name from search object', () => {
			expect(getLocationName(locationData)).toBe('Amsterdam, NL')
		})

		it('should return only city name if country code is not available', () => {
			const withoutCountryCode = { ...locationData, countryCode: undefined }
			expect(getLocationName(withoutCountryCode)).toBe('Amsterdam')
		})

		it('should return null if city name is not available', () => {
			const withoutCityName = {
				...locationData,
				cityName: null,
			} as unknown as LocationData
			expect(getLocationName(withoutCityName)).toBeNull()
		})
	})
})
