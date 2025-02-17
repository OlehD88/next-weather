import { act, fireEvent, render } from '@testing-library/react'
import { Autocomplete, AutocompleteProps } from './Autocomplete'

jest.useFakeTimers()

describe('Autocomplete', () => {
	const inputId = 'input-autocomplete'
	const customRender = (props: Partial<AutocompleteProps> = {}) => {
		const defaultProps: AutocompleteProps = {
			label: 'Search',
			inputId,
			searchResults: [
				{ label: 'Result 1', value: 'result1' },
				{ label: 'Result 2', value: 'result2' },
			],
			onSearchCallback: jest.fn(),
			onSearchResultClick: jest.fn(),
		}
		return render(<Autocomplete {...defaultProps} {...props} />)
	}

	it('should render the Autocomplete component', () => {
		const { getByLabelText, getByTestId } = customRender()
		const inputSection = getByTestId('autocomplete-input-section')

		expect(inputSection).toBeInTheDocument()
		expect(inputSection.getElementsByTagName('label')).toHaveLength(1)
		expect(getByLabelText('Search')).toBeInTheDocument()
		expect(inputSection.getElementsByTagName('input')).toHaveLength(1)
	})

	it('should call onSearchCallback when the input value changes', async () => {
		const onSearchCallback = jest.fn()
		const { getByTestId } = customRender({ onSearchCallback })
		const input = getByTestId(inputId)
		expect(getByTestId('autocomplete-results').className).toContain('hidden')
		act(() => {
			fireEvent.focus(input)
			fireEvent.change(input, { target: { value: 'Amsterdam' } })
			expect(input).toHaveValue('Amsterdam')
			jest.runAllTimers()
		})
		expect(onSearchCallback).toHaveBeenCalledWith('Amsterdam')
		expect(getByTestId('autocomplete-results').className).toContain('block')

		act(() => {
			fireEvent.blur(input)
			jest.runAllTimers()
		})
		expect(getByTestId('autocomplete-results').className).toContain('hidden')
	})
})
