'use client'

import clsx from 'clsx'

import { TemperatureUnit } from '@/types/weather'
import { getDayNameFromDate } from '@/utils/date'
import { formatTemperature } from '@/utils/weather'

const units = [
	{
		name: 'C',
		unit: TemperatureUnit.Celsius,
	},
	{
		name: 'F',
		unit: TemperatureUnit.Fahrenheit,
	},
]

export type CurrentWeatherProps = {
	location: string
	temperature: number
	weatherInfo: string
	date: string
	unit: TemperatureUnit
	onUnitChange: (unit: TemperatureUnit) => void
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
	location,
	temperature,
	weatherInfo,
	date,
	unit,
	onUnitChange,
}) => {
	const dayName = getDayNameFromDate(date)
	const isActiveUnit = (itemUnit: TemperatureUnit) => itemUnit === unit

	return (
		<div className="font-black place-items-center text-center max-w-md">
			<div className="text-4xl mb-9" data-testid="currentWeather-location">
				{location}
			</div>
			<div className="flex place-items-center space-x-4 mb-9">
				<div
					className="text-8xl text-[var(--secondary-color)] mr-16"
					data-testid="currentWeather-temperature"
				>
					{formatTemperature(temperature)}
				</div>
				<div
					className="flex flex-col space-y-2"
					data-testid="currentWeather-units"
				>
					{units.map((unitInfo) => (
						<button
							key={unitInfo.unit}
							onClick={() => onUnitChange(unitInfo.unit)}
							className={clsx(
								'place-items-center w-12 h-12 text-4xl card-gradient rounded-xl',
								'hover:text-[var(--secondary-color)]',
								{
									'text-[var(--secondary-color)] cursor-default': isActiveUnit(
										unitInfo.unit,
									),
								},
							)}
						>
							{unitInfo.name}
						</button>
					))}
				</div>
			</div>
			<div className="text-2xl font-black" data-testid="currentWeather-info">
				{dayName}, {weatherInfo}
			</div>
		</div>
	)
}
