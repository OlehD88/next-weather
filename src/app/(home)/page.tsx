import { CurrentWeatherSection } from '@/app/(home)/_sections/CurrentWeatherSection'
import { Header } from '@/components/Header/Header'
import { ForecastProvider } from '@/contexts/forecastContext'
import { LocationProvider } from '@/contexts/locationContext'

export default function Home() {
	return (
		<ForecastProvider>
			<LocationProvider>
				<main>
					<Header />
					<section>Location Search</section>
					<CurrentWeatherSection />
					<section>Forecast</section>
					<section>Chart</section>
				</main>
			</LocationProvider>
		</ForecastProvider>
	)
}
