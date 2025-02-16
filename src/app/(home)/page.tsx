import { ForecastProvider } from '@/contexts/forecastContext'
import { LocationProvider } from '@/contexts/locationContext'

import { Header } from '@/components/Header/Header'
import { CurrentWeatherSection } from './_sections/CurrentWeatherSection'
import { ForecastSection } from './_sections/ForecastSection'

export default function Home() {
	return (
		<ForecastProvider>
			<LocationProvider>
				<main>
					<Header />
					<section>Location Search</section>
					<CurrentWeatherSection />
					<ForecastSection />
					<section>Chart</section>
				</main>
			</LocationProvider>
		</ForecastProvider>
	)
}
