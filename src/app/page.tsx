import { CurrentWeatherContainer } from '@/components/CurrentWeather/CurrentWeather.container'
import { Header } from '@/components/Header/Header'

export default function Home() {
	return (
		<main>
			<Header />
			<section>Location Search</section>
			<CurrentWeatherContainer />
			<section>Forecast</section>
			<section>Chart</section>
		</main>
	)
}
