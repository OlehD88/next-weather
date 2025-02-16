import { ForecastProvider } from '@/contexts/forecastContext'
import { LocationProvider } from '@/contexts/locationContext'

import { Header } from '@/components/Header/Header'
import { CurrentWeatherSection } from './_sections/CurrentWeatherSection'
import { ForecastSection } from './_sections/ForecastSection'
import { LocationSearchSection } from './_sections/LocationSearchSection'
import { ChartsSection } from './_sections/ChartsSection'

export default function Home() {
	return (
		<ForecastProvider>
			<LocationProvider>
				<main>
					<Header />
					<LocationSearchSection />
					<CurrentWeatherSection />
					<ForecastSection />
					<ChartsSection />
				</main>
			</LocationProvider>
		</ForecastProvider>
	)
}
