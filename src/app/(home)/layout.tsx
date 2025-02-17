import type { Metadata } from 'next'
import { ToastContainer, Bounce } from 'react-toastify'

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
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					pauseOnHover
					theme="light"
					transition={Bounce}
				/>
			</body>
		</html>
	)
}
