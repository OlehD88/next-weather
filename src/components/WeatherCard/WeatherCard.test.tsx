import { render } from '@testing-library/react'
import { WeatherCard, WeatherCardProps } from './WeatherCard'

describe('WeatherCard', () => {
	const customRender = (props: Partial<WeatherCardProps> = {}) => {
		const defaultProps: WeatherCardProps = {
			date: '2025-02-14T11:51:00+01:00',
			icon: 8,
			maxTemperature: 10,
			minTemperature: 5,
			weatherInfo: 'Light rain',
		}
		return render(<WeatherCard {...defaultProps} {...props} />)
	}

	it('should show main parts of weather card information', () => {
		const { getByTestId } = customRender()

		expect(getByTestId('weatherCard-date')).toHaveTextContent('FRI 14')

		expect(
			getByTestId('weatherCard-icon').getElementsByTagName('img')[0],
		).toHaveAttribute('src', '/_next/image?url=%2Ficons%2F8.png&w=128&q=75')

		const temperatureSection = getByTestId('weatherCard-temperature')
		expect(temperatureSection.children.length).toEqual(2)
		expect(temperatureSection.children[0]).toHaveTextContent('10')
		expect(temperatureSection.children[1]).toHaveTextContent('5')

		expect(getByTestId('weatherCard-weatherInfo')).toHaveTextContent(
			'Light rain',
		)
	})
})
