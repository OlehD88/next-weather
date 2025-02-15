import { render } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
	it('should render with app title', () => {
		const { getByText } = render(<Header />)
		expect(getByText('React Weather')).toBeInTheDocument()
	})
})
