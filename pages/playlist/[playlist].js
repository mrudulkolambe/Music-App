import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import SongCard from '../../components/SongCard';
import { useMainContext } from '../../context/Main';
import Head from 'next/head';

const DynamicPlaylist = () => {
	const { playlistData, setPlaylistData, setCurrentSong, setCurrentQueueItem, handleQueue } = useMainContext()
	const [image, setImage] = useState("")
	const [menu, setMenu] = useState(false)
	const router = useRouter()
	useEffect(() => {
		console.log(router)
		if (router.query) {
			axios.get(`${window.location.origin}/api/playlist?id=${router.query.playlist}`)
				.then((res) => {
					setPlaylistData(res.data)
					console.log(res.data)
					setImage(res.data && res.data.image && res.data.image.replace("-150x150", "-500x500"))
				})
		}
	}, [router.query]);

	const handlePlayButton = () => {
		setCurrentSong({ song: playlistData.list[0].perma_url, id: 0 })
		setCurrentQueueItem(0)
		handleQueue(playlistData.list)
	}
	return (
		<>
			<Head>
				<title>MixYrr | {playlistData && playlistData.title || "Playlist"}</title>
			</Head>
			<div className="absolute left-pos-16 top-16 w-10/12 ml-3 Nunito">
				<div className='w-full bg-gray-200 shadow-xl p-4 z-0'>
					{
						playlistData === undefined ? <p className='text-2xl font-bold text-center'>Fetching Results...</p> :
							<div>
								<div className='flex'>
									<div className='relative'>
										<img className='relative h-60 w-60 rounded-xl z-30' src={image} alt="" />
										<img className='absolute top-0 blur-lg z-10 h-60 w-60 rounded-xl' src={image} alt="" />
									</div>
									<div className='ml-8 py-10'>
										<p className='text-3xl font-extrabold select-none text-gray-800' dangerouslySetInnerHTML={{ __html: playlistData && playlistData.title || "Loading..." }}></p>
										<p className='mt-2 font-bold select-none text-gray-800' dangerouslySetInnerHTML={{ __html: playlistData && `${playlistData && playlistData.subtitle} - ${playlistData && playlistData.list && playlistData.list.length} Songs` || "Loading..." }}></p>
										<div className='flex items-center'>
											<button onClick={handlePlayButton} className='mt-4 w-40 py-2 accent rounded-lg hover:bg-stone-700 duration-200 text-white font-bold'>Play</button>
											<span className='relative'>
												<button onFocus={() => { setMenu(true) }} onBlur={() => { setMenu(false) }} className='ml-6 mt-2 font-extrabold text-lg cursor-pointer'>. . .</button>
												<ul className={menu ? 'px-2 duration-300 overflow-hidden origin-top-left scale-1 ease-in-out w-48 bg-white h-48 absolute left-14 rounded-lg shadow-xl list-none' : 'px-2 duration-300 overflow-hidden origin-top-left scale-0 ease-in-out w-48 bg-white h-48 absolute left-14 rounded-lg shadow-xl list-none'}>
													{/* <li className='my-2 text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold text-center py-2 rounded-lg px-3 w-full bg-red-500 duration-150 hover:bg-opacity-80 cursor-pointer text-white'>Delete</li> */}
												</ul>
											</span>
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
							playlistData !== undefined && playlistData.list && playlistData.list.map((song, i) => {
								return <SongCard song={song} key={i} item={i} data={playlistData.list} />
							})
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default DynamicPlaylist