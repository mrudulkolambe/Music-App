import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SongCard from '../../../components/SongCard';
import { useMainContext } from '../../../context/Main';
import { useDataContext } from '../../../context/Data';
import { useAuthContext } from '../../../context/Auth';
import Head from 'next/head';
import { db } from '../../../context/firebase_config';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

const MyDynamicPlaylist = () => {
	const { playlistData, setPlaylistData, setCurrentSong, setCurrentQueueItem, handleQueue, setAlert } = useMainContext()
	const { savedData } = useDataContext()
	const [image, setImage] = useState("")
	const [menu, setMenu] = useState(false)
	const [edit, setEdit] = useState(false)
	const [deletePlaylist, setDeletePlaylist] = useState(false)
	const router = useRouter()
	const { user } = useAuthContext()
	const [playlistName, setPlaylistName] = useState("")
	const [playlistDescription, setPlaylistDescription] = useState("")
	useEffect(() => {
		if (router.query) {
			savedData && savedData.forEach((savedItem) => {
				if (savedItem.dataID === router.query.savedPlaylist) {
					let newData = savedItem
					setPlaylistData(newData)
					setImage(newData && newData.image && newData.image.replace("-150x150", "-500x500"))
					setPlaylistDescription(savedItem && savedItem.subtitle)
					setPlaylistName(savedItem && savedItem.title)
				}
			})
		}
	}, [router.query, user, savedData]);

	const handlePlayButton = () => {
		setCurrentSong({ song: playlistData.list[0].perma_url, id: 0 })
		setCurrentQueueItem(0)
		handleQueue(playlistData.list)
	}

	const handlePlaylistDelete = async () => {
		await deleteDoc(doc(db, "PLAYLIST", router.query.savedPlaylist))
			.then(() => {
				setMenu(false)
				router.push("/")
				setDeletePlaylist(false)
				setAlert("Playlist Deleted!")
			})
			.catch(() => {
				setAlert("Something Went Wrong!")
			})
	}

	const handleEditPlaylistDetails = async () => {
		const ref = doc(db, "PLAYLIST", router.query.savedPlaylist);
		await updateDoc(ref, {
			title: playlistName,
			subtitle: playlistDescription
		})
			.then(() => {
				setEdit(false)
				setAlert("Details Updated!")
			})
			.catch(() => {
				setEdit(false)
				setAlert("Some Error Occured!")
			})
	}
	return (
		<>
			<Head>
				<title>Musify | {playlistData && playlistData.title || "Playlist"}</title>
			</Head>
			<div>
				<div className={edit ? 'fixed top-0 left-0 h-screen w-screen zindex1000 bg-black bg-opacity-40 backdrop-blur-md duration-300' : 'fixed top-0 left-0 h-screen w-screen zindex1000 bg-black bg-opacity-0 backdrop-blur-0 duration-300 pointer-events-none'}></div>
				<div className={edit ? 'opacity-100 duration-500 w-96 bg-white shadow-lg rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 zindex2000' : 'w-96 bg-white shadow-lg rounded-lg fixed -top-10 opacity-0 duration-500 left-1/2 -translate-x-1/2 -translate-y-1/2 zindex2000'}>
					<div className='w-full flex py-4 justify-center flex-col items-center'>
						<input type="text" className='mb-2 font-semibold text-gray-700 outline-none p-2 px-5 bg-black bg-opacity-10 focus:bg-opacity-5 duration-150 placeholder:text-gray-400 placeholder:font-normal rounded-lg w-10/12' placeholder='Enter Playlist Name' value={playlistName} onChange={(e) => { setPlaylistName(e.target.value) }} />
						<input type="text" className='font-semibold text-gray-700 outline-none p-2 px-5 bg-black bg-opacity-10 focus:bg-opacity-5 duration-150 placeholder:text-gray-400 placeholder:font-normal rounded-lg w-10/12' placeholder='Enter Playlist Description' value={playlistDescription} onChange={(e) => { setPlaylistDescription(e.target.value) }} />
						<div className='flex'>
							<button className='mx-2 Nunito mt-4 bg-red-600 py-1 px-3 rounded-lg hover:bg-red-500 duration-300 text-white font-bold' onClick={() => { setEdit(false) }}>
								Cancel
							</button>
							<button className='mx-2 Nunito mt-4 accent py-1 px-3 rounded-lg hover:bg-gray-800 duration-300 text-white font-bold' onClick={handleEditPlaylistDetails}>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className={deletePlaylist ? 'fixed top-0 left-0 h-screen w-screen zindex1000 bg-black bg-opacity-40 backdrop-blur-md duration-300' : 'fixed top-0 left-0 h-screen w-screen zindex1000 bg-black bg-opacity-0 backdrop-blur-0 duration-300 pointer-events-none'}></div>
				<div className={deletePlaylist ? 'opacity-100 duration-500 w-96 bg-white shadow-lg rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 zindex2000' : 'w-96 bg-white shadow-lg rounded-lg fixed -top-10 opacity-0 duration-500 left-1/2 -translate-x-1/2 -translate-y-1/2 zindex2000'}>
					<div className='w-full flex py-4 justify-center flex-col items-center'>
						<p>Do You Really Want To Delete The Playlist?</p>
						<div className='flex'>
							<button className='mx-2 Nunito mt-4 bg-red-600 py-1 px-3 rounded-lg hover:bg-red-500 duration-300 text-white font-bold' onClick={() => {
								setDeletePlaylist(false)
								setMenu(false)
							}}>
								Cancel
							</button>
							<button className='mx-2 Nunito mt-4 accent py-1 px-3 rounded-lg hover:bg-gray-800 duration-300 text-white font-bold' onClick={handlePlaylistDelete}>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
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
										<div onClick={() => { setEdit(true) }}>
											<p className='text-3xl font-extrabold select-none text-gray-800' dangerouslySetInnerHTML={{ __html: playlistData && playlistData.title || "Loading..." }}></p>
											<p className='mt-2 font-bold select-none text-gray-800' dangerouslySetInnerHTML={{ __html: playlistData && `${playlistData && playlistData.subtitle} - ${playlistData && playlistData.list && playlistData.list.length} Songs` || "Loading..." }}></p>
										</div>
										<div className='flex items-center'>
											<button onClick={handlePlayButton} className='mt-4 w-40 py-2 accent rounded-lg hover:bg-stone-700 duration-200 text-white font-bold'>Play</button>
											<span className='relative'>
												<button onClick={() => { menu ? setMenu(false) : setMenu(true) }} className='ml-6 mt-2 font-extrabold text-lg cursor-pointer'>. . .</button>
												<ul className={menu ? 'px-2 duration-300 overflow-hidden origin-top-left scale-1 ease-in-out w-48 bg-white h-48 absolute left-14 rounded-lg shadow-xl list-none' : 'px-2 duration-300 overflow-hidden origin-top-left scale-0 ease-in-out w-48 bg-white h-48 absolute left-14 rounded-lg shadow-xl list-none'}>
													<li className='my-2 text-ellipsis overflow-hidden whitespace-nowrap text-sm font-bold text-center py-2 rounded-lg px-3 w-full bg-red-500 duration-150 hover:bg-opacity-80 cursor-pointer text-white' onClick={() => { setDeletePlaylist(true) }}>Delete</li>
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
								return <SongCard customPlaylist={true} song={song} key={`${song.title + i}`} item={i} data={playlistData.list} />
							})
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default MyDynamicPlaylist