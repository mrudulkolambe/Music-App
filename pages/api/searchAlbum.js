import axios from "axios"

export default async function handler(req, res) {
	const url = `https://www.jiosaavn.com/api.php%3F_format=json&_marker=0&api_version=4&ctx=web6dot0&p=${req.query.p}&q=${req.query.q}&n=20&__call=search.getAlbumResults`
	const response = await axios.get(url)
	res.send(response.data)
}
