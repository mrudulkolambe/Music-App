// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import {lyricsFinder} from 'lyrics-finder'
export default async function handler(req, res) {
	console.log(req.query)
	// const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "No Lyrics Found"
	// res.json({ lyrics })
}
