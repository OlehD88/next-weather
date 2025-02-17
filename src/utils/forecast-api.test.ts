import axios from 'axios'
import fiveDaysForcast from '@/tests/mocks/fiveDaysForcast.json'
import currentConditionsHistory from '@/tests/mocks/currentConditionsHistory.json'
import currentConditions from '@/tests/mocks/currentConditions.json'
import {
	fetchFewDaysForecast,
	fetchCurrentWeatherConditions,
	fetchWeatherConditionsHistory,
} from './forecast-api'
import { ForecastDayItem, TemperatureUnit } from '@/types/forecast'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('forecast-api utils functions', () => {
	describe('fetchFewDaysForecast', () => {
		it('should fetch few days forecast', async () => {
			mockedAxios.get.mockResolvedValue({ data: fiveDaysForcast })
			const result = await fetchFewDaysForecast('215854', TemperatureUnit.Celsius)
			const expectedResult: ForecastDayItem[] = [
				{
					date: '2025-02-15T07:00:00+01:00',
					icon: 8,
					maxTemperature: 4,
					minTemperature: -2,
					weatherInfo: 'Dreary',
				},
				{
					date: '2025-02-16T07:00:00+01:00',
					icon: 4,
					maxTemperature: 4,
					minTemperature: -4,
					weatherInfo: 'Intermittent clouds',
				},
				{
					date: '2025-02-17T07:00:00+01:00',
					icon: 3,
					maxTemperature: 4,
					minTemperature: -3,
					weatherInfo: 'Partly sunny',
				},
				{
					date: '2025-02-18T07:00:00+01:00',
					icon: 7,
					maxTemperature: 5,
					minTemperature: -1,
					weatherInfo: 'Cloudy',
				},
				{
					date: '2025-02-19T07:00:00+01:00',
					icon: 6,
					maxTemperature: 8,
					minTemperature: 2,
					weatherInfo: 'Mostly cloudy',
				},
			]
			expect(result).toEqual(expectedResult)
		})

		it('should throw error if failed to fetch few days forecast', async () => {
			mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'))
			await expect(fetchFewDaysForecast('215854', TemperatureUnit.Celsius)).rejects.toThrow(
				'Failed to fetch',
			)
		})
	})

	describe('fetchWeatherConditionsHistory', () => {
		it('should fetch weather conditions history', async () => {
			mockedAxios.get.mockResolvedValue({ data: currentConditionsHistory })
			const result = await fetchWeatherConditionsHistory('215854')
			expect(result).toHaveLength(24)
			expect(result[0]).toEqual({
				date: '2025-02-16T21:00:00+01:00',
				temperature: {
					C: -1,
					F: 30,
				},
				weatherInfo: 'Clear',
			})
		})

		it('should throw error if failed to fetch weather conditions history', async () => {
			mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'))
			await expect(fetchWeatherConditionsHistory('215854')).rejects.toThrow('Failed to fetch')
		})
	})

	describe('fetchCurrentWeatherConditions', () => {
		it('should fetch current weather conditions', async () => {
			mockedAxios.get.mockResolvedValue({ data: currentConditions })
			const result = await fetchCurrentWeatherConditions('215854')
			expect(result).toEqual({
				date: '2025-02-15T11:51:00+01:00',
				temperature: { C: 3, F: 36 },
				weatherInfo: 'Light snow',
			})
		})

		it('should throw error if failed to fetch current weather conditions', async () => {
			mockedAxios.get.mockRejectedValue(new Error('Failed to fetch'))
			await expect(fetchCurrentWeatherConditions('215854')).rejects.toThrow('Failed to fetch')
		})
	})
})
