// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default async function handler(req, res) {
	const url = `https://www.jiosaavn.com/api.php?__call=content.getTopSearches&ctx=web6dot0&api_version=4&_format=json&_marker=0`
	const response = await axios.get(url)
	res.send(response.data)
}
