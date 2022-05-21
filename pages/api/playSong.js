// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default async function handler(req, res) {
	const url = `https://saavn.me/songs/?link=${req.query.url}`
	const response = await axios.get(url)
	res.send(response.data)
}
