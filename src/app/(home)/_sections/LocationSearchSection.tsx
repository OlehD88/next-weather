'use client'

import { Autocomplete } from '@/components/Autocomplete/Autocomplete'
import { useLocation } from '@/contexts/locationContext'

export const LocationSearchSection = () => {
	const { setLocationData } = useLocation()
	const locationsList = [
		{ cityName: 'New York', locationKey: 'New York', countryCode: 'US' },
		{ cityName: 'London', locationKey: 'London', countryCode: 'GB' },
		{ cityName: 'Paris', locationKey: 'Paris', countryCode: 'FR' },
		{ cityName: 'Berlin', locationKey: 'Berlin', countryCode: 'DE' },
		{ cityName: 'Tokyo', locationKey: 'Tokyo', countryCode: 'JP' },
		{ cityName: 'Sydney', locationKey: 'Sydney', countryCode: 'AU' },
		{ cityName: 'Rome', locationKey: 'Rome', countryCode: 'IT' },
		{ cityName: 'Madrid', locationKey: 'Madrid', countryCode: 'ES' },
		{ cityName: 'Beijing', locationKey: 'Beijing', countryCode: 'CN' },
		{ cityName: 'Seoul', locationKey: 'Seoul', countryCode: 'KR' },
		{ cityName: 'Bangkok', locationKey: 'Bangkok', countryCode: 'TH' },
	]
	const onSearchCallback = (search: string) => {
		// fetch location data
		console.log(search)
	}
	const onSearchResultClick = (value: string) => {
		const newLocationData = locationsList.find((item) => item.locationKey === value)
		if (newLocationData) {
			setLocationData(newLocationData)
		}
	}

	const searchOptions = locationsList.map((location) => ({
		label: `${location.cityName}, ${location.countryCode}`,
		value: location.locationKey,
	}))

	return (
		<section className="flex justify-center pt-16 pb-24 px-4">
			<Autocomplete
				inputId="location-search"
				label="City name"
				searchResults={searchOptions}
				onSearchCallback={onSearchCallback}
				onSearchResultClick={onSearchResultClick}
			/>
		</section>
	)
}
