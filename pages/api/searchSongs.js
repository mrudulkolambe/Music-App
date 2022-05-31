const url = `https://www.jiosaavn.com/api.php?p=1&q=abcd&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=4&__call=search.getResults`


import axios from "axios"

export default async function handler(req, res) {
	const url = `https://www.jiosaavn.com/api.php?p=${req.query.p}&q=${req.query.q}&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=20&__call=search.getResults`
	const response = await axios.get(url)
	res.send(response.data)
}
