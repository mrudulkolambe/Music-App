import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';

const DynamicAlbum = () => {
	const router = useRouter()
	useEffect(() => {
		axios.get(`${window.location.origin}/api/song?id=${router.query.song}`)
			.then((res) => {
				console.log(res.data)
			})
	}, []);
	return (
		<div className="absolute left-pos-16 top-16 w-10/12 ml-3">{router.query.song}</div>
	)
}

export default DynamicAlbum