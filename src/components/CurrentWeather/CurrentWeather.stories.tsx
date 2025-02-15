import type { Meta, StoryObj } from '@storybook/react'

import { CurrentWeather } from './CurrentWeather'
import { TemperatureUnit } from '@/types/weather'

const meta = {
	title: 'CurrentWeather',
	component: CurrentWeather,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div className="bg-[var(--secondary-bg)] p-8">
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CurrentWeather>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
	args: {
		location: 'Amsterdam, NL',
		temperature: 7,
		weatherInfo: 'Light rain',
		date: '2025-02-15T11:51:00+01:00',
		unit: TemperatureUnit.Celsius,
		onUnitChange: () => {},
	},
}
