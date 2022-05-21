import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import SongCard from '../../components/SongCard';
import { useMainContext } from '../../context/Main';
import Head from 'next/head';

const DynamicAlbum = () => {
	const { albumData, setAlbumData, setCurrentSong, setCurrentQueueItem, handleQueue } = useMainContext()
	const [image, setImage] = useState("")
	const router = useRouter()
	useEffect(() => {
		if (router.query) {
			axios.get(`${window.location.origin}/api/album?id=${router.query.album}`)
				.then((res) => {
					setAlbumData(res.data)
					setImage(res.data && res.data.image && res.data.image.replace("-150x150", "-500x500"))
				})
		}
	}, [router.query]);
	const handlePlayButton = () => {
		setCurrentSong({ song: albumData.list[0].perma_url, id: 0 })
		setCurrentQueueItem(0)
		handleQueue(albumData.list)
	}
	return (
		<>
			<Head>
				<title>MixYrr | {albumData && albumData.title || "Album"}</title>
			</Head>
			<div className="absolute left-pos-16 top-16 w-10/12 ml-3 Nunito">
				<div className='relative w-full bg-gray-200 shadow-xl p-4 z-0'>
					{
						albumData === undefined ? <p className='text-2xl font-bold text-center'>Fetching Results...</p> :
							<div>
								<div className='flex'>
									<div className='relative'>
										<img className='relative h-60 w-60 rounded-xl z-30' src={image} alt="" />
										<img className='absolute top-0 blur-lg z-10 h-60 w-60 rounded-xl' src={image} alt="" />
									</div>
									<div className='ml-8 py-10'>
										<p className='text-3xl font-extrabold text-gray-800' dangerouslySetInnerHTML={{ __html: albumData && albumData.title || "Loading..." }}></p>
										<p className='mt-2 font-bold text-gray-800' dangerouslySetInnerHTML={{ __html: albumData && `${albumData !== undefined && albumData.subtitle} - ${albumData && albumData.list_count} Songs` || "Loading..." }}></p>
										<div className='flex items-center'>
											<button onClick={handlePlayButton} className='mt-4 w-40 py-2 accent rounded-lg hover:bg-stone-700 duration-200 text-white font-bold'>Play</button>
											<p className='ml-6 mt-2 font-extrabold text-lg cursor-pointer'>. . .</p>
										</div>
									</div>

								</div>
							</div>
					}
				</div>
				<div className='p-4'>
					<h1 className='text-2xl font-bold mt-4'>Songs</h1>
					<div className='mt-2 w-full overscroll-auto pb-16'>
						{
							albumData !== undefined && albumData.list && albumData.list.map((song, i) => {
								return <SongCard song={song} key={i} item={i} data={albumData.list} />
							})
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default DynamicAlbum