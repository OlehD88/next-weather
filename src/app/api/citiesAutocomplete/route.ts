import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export const GET = async (req: NextRequest) => {
	const searchParams = req.nextUrl.searchParams
	const searchQuery = searchParams.get('searchQuery')
	const apikey = process.env.WEATHER_API_KEY
	const baseApiUrl = process.env.WEATHER_BASE_API_URL
	const apiUrl = `${baseApiUrl}/locations/v1/cities/autocomplete`

	try {
		const response = await axios.get(apiUrl, {
			params: {
				apikey,
				q: searchQuery,
			},
		})
		return NextResponse.json(response.data, {
			status: 200,
		})
	} catch (e) {
		if (e instanceof AxiosError) {
			return NextResponse.json({ error: e.message }, { status: e.status })
		}
	}
}
