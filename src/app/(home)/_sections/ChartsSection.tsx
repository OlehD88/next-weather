'use client'

import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts'
import { useQuery } from '@tanstack/react-query'

import { useForecast } from '@/contexts/forecastContext'
import { useLocation } from '@/contexts/locationContext'
import { buildWeatherHistoryChartData } from '@/utils/forecast'
import { fetchWeatherConditionsHistory } from '@/utils/forecast-api'

export const ChartsSection = () => {
	const { temperatureUnit } = useForecast()
	const { locationData } = useLocation()

	const { data = [] } = useQuery({
		queryKey: ['weatherConditionsHistory', locationData?.locationKey],
		queryFn: () => fetchWeatherConditionsHistory(locationData?.locationKey!),
		enabled: !!locationData?.locationKey,
	})

	const chartData = buildWeatherHistoryChartData(data, temperatureUnit)

	return (
		<section className="dark-section pt-24 pb-16 px-4">
			<div className="max-w-5xl w-full">
				<h2 className="text-center md:text-left text-4xl font-bold mb-2">Daily evolution</h2>
				<div className="max-h-96 h-full px-8">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart width={300} height={100} data={chartData}>
							<Line
								type="monotone"
								dataKey="temperature"
								stroke="#F48403"
								strokeWidth={8}
								dot={{ strokeWidth: 12 }}
							/>
							<XAxis
								dataKey="time"
								padding={{ left: 20, right: 20 }}
								axisLine={false}
								tickLine={false}
								tick={{ fill: '#fff' }}
							/>
							<Tooltip
								cursor={false}
								contentStyle={{
									background: '#2C2930',
									border: 'none',
									borderRadius: '8px',
									textAlign: 'center',
									padding: '8px',
								}}
								formatter={(value) => [`${value}° ${temperatureUnit}`]}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</section>
	)
}
