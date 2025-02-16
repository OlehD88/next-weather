import { CurrentWeatherSection } from '@/app/(home)/_sections/CurrentWeatherSection'
import { Header } from '@/components/Header/Header'
import { LocationProvider } from '@/contexts/locationContext'

export default function Home() {
	return (
		<LocationProvider>
			<main>
				<Header />
				<section>Location Search</section>
				<CurrentWeatherSection />
				<section>Forecast</section>
				<section>Chart</section>
			</main>
		</LocationProvider>
	)
}
