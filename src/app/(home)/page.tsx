import { CurrentWeatherSection } from '@/app/(home)/_sections/CurrentWeatherSection'
import { Header } from '@/components/Header/Header'

export default function Home() {
	return (
		<main>
			<Header />
			<section>Location Search</section>
			<CurrentWeatherSection />
			<section>Forecast</section>
			<section>Chart</section>
		</main>
	)
}
