// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default async function handler(req, res) {
	const song_url = `https://www.jiosaavn.com/api.php%3F_format=json&_marker=0&api_version=4&ctx=web6dot0&__call=autocomplete.get&query=${req.query.q}`
	axios.get(song_url)
		.then((response) => {
			res.send(response.data)
		})

}
