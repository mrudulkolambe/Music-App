import { HeartIcon, PlayIcon } from '@heroicons/react/outline'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDataContext } from '../context/Data';
import { db } from '../context/firebase_config';
import { useMainContext } from '../context/Main';
import { formatDuration } from '../utilities';
import { useRouter } from 'next/router'

const SongCard = ({ song, item, data, customPlaylist }) => {
	const [displayPlay, SetdisplayPlay] = useState(false);
	const [menu, setMenu] = useState(false);
	const { setCurrentSong, setCurrentQueueItem, handleQueue, setAlert } = useMainContext()
	const { savedData } = useDataContext()
	const handleMenu = () => {
		menu ? setMenu(false) : setMenu(true)
	}
	const router = useRouter()

	const addToPlaylist = async (docRef) => {
		const obj = {
			image: song && song.image,
			perma_url: song && song.perma_url,
			subtitle: song && song.subtitle,
			title: song && song.title,
			more_info: {
				album: song && song.more_info.album,
				duration: song && song.more_info.duration
			}
		}
		const ref = doc(db, "PLAYLIST", docRef);
		await updateDoc(ref, {
			list: arrayUnion(obj),
			image: song && song.image,
		}).then(() => {
			console.log("Updated")
			setAlert("Song Added!")
		})
			.catch((err) => {
				setAlert("Something Went Wrong!")
			})
	}
	const handleRemove = async () => {
		const obj = {
			image: song && song.image,
			perma_url: song && song.perma_url,
			subtitle: song && song.subtitle,
			title: song && song.title,
			more_info: {
				album: song && song.more_info.album,
				duration: song && song.more_info.duration
			}
		}
		const { savedPlaylist } = router.query
		const ref = doc(db, "PLAYLIST", savedPlaylist);
		await updateDoc(ref, {
			list: arrayRemove(obj),
		}).then(() => {
			setAlert("Song Removed")
		})
			.catch((err) => {
				setAlert("Something Went Wrong!")
			})
	}
	return (
		<>
			<div onMouseOver={() => { SetdisplayPlay(true) }} onMouseLeave={() => { SetdisplayPlay(false) }} className='text-black cursor-pointer flex items-center p-3 hover:bg-black hover:bg-opacity-10 duration-200 rounded-lg mb-2 justify-between pr-3 song-width'>
				{displayPlay ? <PlayIcon onClick={() => {
					setCurrentSong({ song: song.perma_url, id: item })
					setCurrentQueueItem(item)
					handleQueue(data)
				}} className='w-6 h-6 mr-4' /> : <p className='flex item justify-center w-6 h-6 mr-4'>{item + 1}</p>}
				<div onClick={() => {
					setCurrentSong({ song: song.perma_url, id: item })
					setCurrentQueueItem(item)
					handleQueue(data)
				}} className='relative'>
					<img className='h-16 w-16 rounded-lg' src={song.image} alt="" />
					<img className='absolute top-0 blur-md -z-10 h-16 w-16 rounded-lg' src={song.image} alt="" />
				</div>
				<div onClick={() => {
					setCurrentSong({ song: song.perma_url, id: item })
					setCurrentQueueItem(item)
					handleQueue(data)
				}} className='ml-4'>
					<p className='font-bold w-64 whitespace-nowrap nunito text-ellipsis overflow-hidden' dangerouslySetInnerHTML={{ __html: song.title }}></p>
					<p className='text-sm text-gray-600 w-64 whitespace-nowrap text-ellipsis overflow-hidden' dangerouslySetInnerHTML={{ __html: song.subtitle || song.title }}></p>
				</div>
				<div className='ml-9'>
					<p className='text-gray-600 w-64 whitespace-nowrap text-ellipsis overflow-hidden' dangerouslySetInnerHTML={{ __html: song.more_info.album }}></p>
				</div>
				<div className='ml-9'>
					<p className='text-sm text-gray-800 w-64 whitespace-nowrap text-ellipsis overflow-hidden'>{formatDuration(song && song.more_info && song.more_info.duration)}</p>
				</div>
				<div className='ml-9'>
					<HeartIcon className='w-6 h-6 mr-4 text-gray-600' />
				</div>
				<button type='button' className='relative ml-9 flex items-center mb-4 text-3xl' onFocus={handleMenu} onBlur={handleMenu}>
					<span>...</span>
					{<div className={!menu ? 'absolute right-10 w-0 bg-white rounded-lg shadow-lg top-10 duration-200 overflow-hidden ' : 'duration-200 overflow-hidden absolute right-10 w-56 bg-white rounded-lg shadow-lg top-10'}>
						<div className='p-1 bg-white shadow-lg'>
							<ul className='p-2 h-48 overflow-auto custom-white-scroll scroll-mr-2'>
								{customPlaylist ? <li onClick={handleRemove} className='my-2 text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold text-center py-2 rounded-lg px-3 w-full bg-black duration-150 bg-opacity-5 hover:bg-opacity-10'>Remove From The Playlist</li> : null}
								{/* <li className='text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold text-center py-1 px-3 w-full bg-black duration-150 bg-opacity-5 hover:bg-opacity-10'>Add To Queue</li> */}
								{
									savedData && savedData.map((playlist) => {
										return <li key={playlist.dataID} onClick={() => { addToPlaylist(playlist.dataID) }} className='my-2 text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold text-center py-2 rounded-lg px-3 w-full bg-black duration-150 bg-opacity-5 hover:bg-opacity-10'>Add To {playlist.title}</li>
									})
								}
							</ul>
						</div>
					</div>}
				</button>
			</div>
		</>
	)
}

export default SongCard