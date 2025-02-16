import { act } from 'react'
import { render } from '@testing-library/react'

import { CurrentWeather, CurrentWeatherProps } from './CurrentWeather'
import { TemperatureUnit } from '@/types/forecast'

describe('CurrentWeather', () => {
	const customRender = (props: Partial<CurrentWeatherProps> = {}) => {
		const defaultProps: CurrentWeatherProps = {
			location: 'Amsterdam, NL',
			temperature: 7,
			weatherInfo: 'Light rain',
			date: '2025-02-15T11:51:00+01:00',
			unit: TemperatureUnit.Celsius,
			onUnitChange: () => {},
		}
		return render(<CurrentWeather {...defaultProps} {...props} />)
	}

	it('should show main parts of current weather information', () => {
		const { getByTestId } = customRender()

		expect(getByTestId('currentWeather-location')).toHaveTextContent('Amsterdam, NL')
		expect(getByTestId('currentWeather-temperature')).toHaveTextContent('7')

		const unitButtons = getByTestId('currentWeather-units').getElementsByTagName('button')
		expect(unitButtons.length).toEqual(2)

		const infoSection = getByTestId('currentWeather-info')
		expect(infoSection).toHaveTextContent('Light rain')
		expect(infoSection).toHaveTextContent('Saturday')
	})

	it('should call onUnitChange on unit button click', () => {
		const onUnitChange = jest.fn()
		const { getByTestId } = customRender({ onUnitChange })

		const unitButtons = getByTestId('currentWeather-units').getElementsByTagName('button')
		expect(onUnitChange).not.toHaveBeenCalled()

		act(() => {
			unitButtons[1].click()
		})

		expect(onUnitChange).toHaveBeenCalledTimes(1)
		expect(onUnitChange).toHaveBeenCalledWith(TemperatureUnit.Fahrenheit)
	})
})
