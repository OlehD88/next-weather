import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export const GET = async (
	req: NextRequest,
	{ params }: { params: Promise<{ locationKey: string }> },
) => {
	const locationKey = (await params).locationKey
	const apikey = process.env.WEATHER_API_KEY
	const baseApiUrl = process.env.WEATHER_BASE_API_URL
	const apiUrl = `${baseApiUrl}/currentconditions/v1/${locationKey}`

	try {
		const response = await axios.get(apiUrl, {
			params: {
				apikey,
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
