'use client'

import Image from 'next/image'

export const Spinner = () => {
	return (
		<Image src="/spinner.svg" alt="Loading" width={160} height={160} className="animate-pulse" />
	)
}
