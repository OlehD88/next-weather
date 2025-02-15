import type { Meta, StoryObj } from '@storybook/react'

import { WeatherCard } from './WeatherCard'

const meta = {
	title: 'WeatherCard',
	component: WeatherCard,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div className="bg-[var(--main-bg)] p-8">
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof WeatherCard>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
	args: {
		maxTemperature: 21,
		minTemperature: 10,
		weatherInfo: 'Mostly Cloudy w/ Flurries',
		date: '2025-02-14T11:51:00+01:00',
		icon: 20,
	},
}
