'use client'

import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="text-center">
				<h2 className="text-4xl mb-4">Oops! Something went wrong.</h2>
				<p className="text-lg mb-8">
					An unexpected error has occurred in the application. Please try reloading the page. If the
					problem persists, contact support.
				</p>
				<button
					onClick={() => reset()}
					className="px-4 py-2 bg-[var(--secondary-color)] rounded-md"
				>
					Reload Application
				</button>
			</div>
		</div>
	)
}
