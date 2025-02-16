import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export const GET = async (req: NextRequest) => {
	const searchParams = req.nextUrl.searchParams
	const lat = searchParams.get('lat')
	const lon = searchParams.get('lon')
	const apikey = process.env.WEATHER_API_KEY
	const baseApiUrl = process.env.WEATHER_BASE_API_URL
	const apiUrl = `${baseApiUrl}/locations/v1/cities/geoposition/search`

	try {
		const response = await axios.get(apiUrl, {
			params: {
				apikey,
				q: `${lat},${lon}`,
				toplevel: true,
			},
		})
		return NextResponse.json(response.data, {
			status: 200,
		})
	} catch (e) {
		if (e instanceof AxiosError) {
			return NextResponse.json({ error: e.message }, { status: 400 })
		}
	}
}

// export default handler
