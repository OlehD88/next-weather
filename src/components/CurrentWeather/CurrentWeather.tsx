import clsx from 'clsx'

import { TEMPERATURE_SIGN } from '@/consts'
import { TemperatureUnit } from '@/types/weather'
import { getDayNameFromDate } from '@/utils/weather'

type CurrentWeatherProps = {
	location: string
	temperature: number
	weatherInfo: string
	date: string
	unit: TemperatureUnit
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
	location,
	temperature,
	weatherInfo,
	date,
	unit,
}) => {
	const dayName = getDayNameFromDate(date)

	const units = [
		{
			name: 'C',
			unit: TemperatureUnit.Celsius,
			active: unit === TemperatureUnit.Celsius,
		},
		{
			name: 'F',
			unit: TemperatureUnit.Fahrenheit,
			active: unit === TemperatureUnit.Fahrenheit,
		},
	]

	return (
		<div className="font-black place-items-center text-center max-w-md">
			<div className="text-4xl mb-9">{location}</div>
			<div className="flex place-items-center space-x-4 mb-9">
				<div className="text-8xl text-[var(--secondary-color)] mr-16">
					{temperature}
					{TEMPERATURE_SIGN}
				</div>
				<div className="flex flex-col space-y-2">
					{units.map((unitInfo) => (
						<button
							key={unitInfo.name}
							className={clsx(
								'place-items-center w-12 h-12 text-4xl card-gradient rounded-xl',
								'hover:text-[var(--secondary-color)]',
								{
									'text-[var(--secondary-color)] cursor-default':
										unitInfo.active,
								},
							)}
						>
							{unitInfo.name}
						</button>
					))}
				</div>
			</div>
			<div className="text-2xl font-black">
				{dayName}, {weatherInfo}
			</div>
		</div>
	)
}
