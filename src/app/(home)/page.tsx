import { ForecastProvider } from '@/contexts/forecastContext'
import { LocationProvider } from '@/contexts/locationContext'

import { Header } from '@/components/Header/Header'
import { CurrentWeatherSection } from './_sections/CurrentWeatherSection'
import { ForecastSection } from './_sections/ForecastSection'
import { LocationSearchSection } from './_sections/LocationSearchSection'

export default function Home() {
	return (
		<ForecastProvider>
			<LocationProvider>
				<main>
					<Header />
					<LocationSearchSection />
					<CurrentWeatherSection />
					<ForecastSection />
					<section>Chart</section>
				</main>
			</LocationProvider>
		</ForecastProvider>
	)
}
