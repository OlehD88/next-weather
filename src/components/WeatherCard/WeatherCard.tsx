'use client'

import Image from 'next/image'
import { getShortDateInfo } from '@/utils/date'
import { formatTemperature } from '@/utils/forecast'

export type WeatherCardProps = {
	date: string
	icon: number
	maxTemperature: number
	minTemperature: number
	weatherInfo: string
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
	date,
	icon,
	maxTemperature,
	minTemperature,
	weatherInfo,
}) => {
	const shortDateInfo = getShortDateInfo(date)
	const iconUrl = '/icons/' + icon + '.png'

	return (
		<div
			data-testid="weatherCard"
			className="font-black px-2 pb-9 pt-12 card-gradient rounded-xl w-44"
		>
			<div data-testid="weatherCard-date" className="text-xl lg:text-2xl mb-7 px-2">
				{shortDateInfo}
			</div>
			<div data-testid="weatherCard-icon" className="mb-5">
				<Image src={iconUrl} width={60} height={60} alt={weatherInfo} />
			</div>
			<div data-testid="weatherCard-temperature" className="flex justify-start items-end mb-5">
				<div className="text-4xl accent-color mr-4">{formatTemperature(maxTemperature)}</div>
				<div className="text-3xl">{formatTemperature(minTemperature)}</div>
			</div>
			<div data-testid="weatherCard-weatherInfo" className="text-lg px-2">
				{weatherInfo}
			</div>
		</div>
	)
}
