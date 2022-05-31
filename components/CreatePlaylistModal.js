import React, { useState } from 'react'
import { useAuthContext } from '../context/Auth'
import Loader from './Loader'
import { XIcon } from "@heroicons/react/outline"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../context/firebase_config'
import { useMainContext } from '../context/Main'

const CreatePlaylistModal = ({ setter, show }) => {
	const { user } = useAuthContext()
	const [loading, setLoading] = useState(false)
	const [playlistName, setPlaylistName] = useState("")
	const [playlistDescription, setPlaylistDescription] = useState("")
	const { setAlert } = useMainContext()
	const createPlaylist = async () => {
		setLoading(true)
		const obj = {
			title: playlistName,
			subtitle: playlistDescription,
			uid: user && user.uid,
			username: user && user.displayName,
			list: [],
			image: "",
			timestamp: serverTimestamp()
		}
		await addDoc(collection(db, "PLAYLIST"), obj)
			.then((res) => {
				setLoading(false)
				setter(false)
				setAlert("Playlist Created!")
			})
			.catch((err) => {
				setAlert("Something Went Wrong!")
			})
	}
	return (
		<>
			<div className={show ? 'zindex1000 h-screen w-screen bg-black bg-opacity-40 backdrop-blur-md fixed top-0 left-0 duration-300' : 'zindex1000 h-screen w-screen bg-black bg-opacity-0 backdrop-blur-none fixed -top-10 left-0 duration-300 pointer-events-none'}></div>
			<div className={show ? 'Nunito px-2 zindex2000 flex items-center justify-center shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg flex-col duration-500 opacity-100' : 'Nunito px-2 zindex2000 flex items-center justify-center shadow-lg fixed -top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg flex-col duration-300 opacity-0'}>
				<div className='py-3 border-b w-full px-4 flex items-center justify-between'>
					<p className='font-bold text-lg'>Create Playlist</p>
					<button onClick={() => { setter(false) }}><XIcon className='text-gray-700 h-6 w-6' /></button>
				</div>
				<div className='w-full flex py-4 justify-center flex-col items-center'>
					<input type="text" className='mb-2 font-semibold text-gray-700 outline-none p-2 px-5 bg-black bg-opacity-10 focus:bg-opacity-5 duration-150 placeholder:text-gray-400 placeholder:font-normal rounded-lg w-10/12' placeholder='Enter Playlist Name' value={playlistName} onChange={(e) => { setPlaylistName(e.target.value) }} />
					<input type="text" className='font-semibold text-gray-700 outline-none p-2 px-5 bg-black bg-opacity-10 focus:bg-opacity-5 duration-150 placeholder:text-gray-400 placeholder:font-normal rounded-lg w-10/12' placeholder='Enter Playlist Description' value={playlistDescription} onChange={(e) => { setPlaylistDescription(e.target.value) }} />
				</div>
				<div className='py-2 border-t w-full px-4 flex items-center justify-between'>
					<p onClick={() => { setter(false) }} className='cursor-pointer font-bold text-red-600 py-1 px-3 rounded hover:bg-red-500 hover:text-white duration-300'>Cancel</p>
					<button className='flex items-center justify-center disabled:bg-green-800 cursor-pointer font-bold text-white py-1 px-3 rounded bg-green-600 hover:bg-green-500  duration-300' onClick={createPlaylist} disabled={loading}>{loading ? <Loader /> : null}Create</button>
				</div>
			</div>
		</>
	)
}

export default CreatePlaylistModal