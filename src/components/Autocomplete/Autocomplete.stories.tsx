import type { Meta, StoryObj } from '@storybook/react'

import { Autocomplete } from './Autocomplete'

const meta = {
	title: 'Autocomplete',
	component: Autocomplete,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<div className="bg-[var(--main-bg)] p-8 h-80">
				<Story />
			</div>
		),
	],
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

export const Main: Story = {
	args: {
		label: 'City name',
		searchResults: [
			{ label: 'Apple', value: '215854' },
			{ label: 'Pear', value: '343164' },
			{ label: 'Cherry', value: '17887' },
		],
		onSearchCallback: (search: string) => console.log('search', search),
		onSearchResultClick: (value: string) => console.log('value', value),
	},
}
