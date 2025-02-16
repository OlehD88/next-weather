'use client'

import { useState } from 'react'
import { Autocomplete } from '@/components/Autocomplete/Autocomplete'
import { useLocation } from '@/contexts/locationContext'
import { LocationData } from '@/types/location'

export const LocationSearchSection = () => {
	const { setLocationData, getCitiesSuggestions } = useLocation()
	const [locationsList, setLocationsList] = useState<LocationData[]>([])

	const onSearchCallback = async (search: string) => {
		if (search?.length > 0) {
			const locations = await getCitiesSuggestions(search)
			setLocationsList(locations)
		}
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
