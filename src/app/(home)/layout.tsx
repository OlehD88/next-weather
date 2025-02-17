import type { Metadata } from 'next'
import '../globals.css'
import ReactQueryProvider from './reactQueryProvider'

export const metadata: Metadata = {
	title: 'Next Weather App',
	description: 'A great app to check the weather',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	)
}
