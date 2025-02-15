import { getDayNameFromDate } from './weather'

describe('Weather utils functions', () => {
	describe('getDayNameFromDate', () => {
		const validDateString = '2025-02-15T11:51:00+01:00'
		const invalidDateString = '2025-02-15hello-worldT11:51:00+01'

		it('should return a proper day name from date', () => {
			expect(getDayNameFromDate(validDateString)).toBe('Saturday')
		})

		it('should return null if the date string is not valid', () => {
			expect(getDayNameFromDate(invalidDateString)).toBeNull()
		})
	})
})
