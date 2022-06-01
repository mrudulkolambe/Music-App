import axios from "axios"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
	console.log(req.query)
	const lyrics = axios.get(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=04ceee518eb78d871a51a900f2ce7010&format=json&q_track=${req.query.track}&q_artist=${req.query.artist}`)
	res.json({ lyrics })
}
