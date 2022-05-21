import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Home from './icons/Home'
import Collection from "./icons/Collection"
import { BsMusicNoteList, BsFolderPlus } from "react-icons/bs"
import { useDataContext } from '../context/Data'
import Alert from './Alert'
import { useMainContext } from '../context/Main'

const Sidebar = ({ setter }) => {
	const router = useRouter()
	const [route, setRoute] = useState(0)
	const { savedData } = useDataContext()
	const { alert, setAlert } = useMainContext()
	useEffect(() => {
		switch (router.pathname) {
			case "/":
				setRoute(0)
				break;
			case "/collection":
				setRoute(1)
				break;

			default:
				break;
		}
	}, []);
	return (
		<>
			<div className='h-screen w-screen pointer-events-none fixed'>
				<Alert show={alert} setAlert={setAlert} />
			</div>
			<div className='hidden md:block Nunito w-2/12 fixed h-screen accent text-white z-0'>
				<div className='h-16 w-full light-accent flex items-center justify-center shadow-lg z-50'>
					<div className='flex items-center'>
						<span className='m-0.5 h-7 w-2 bg-cyan-400 rounded-full'></span>
						<span className='m-0.5 h-4 w-2 bg-red-500 rounded-full'></span>
						<span className='m-0.5 h-7 w-2 bg-orange-400 rounded-full'></span>
					</div>
					<p className='text-lg font-bold mx-1'>MixYrr</p>
				</div>
				<p className='px-8 font-semibold mt-9 mb-4 text-lg'>Discover</p>
				<Link href={"/"}>
					<div className={`${route === 0 ? 'text-white' : 'text-gray-400'} flex items-center px-8 cursor-pointer border-b border-gray-800 py-5 hover:bg-white hover:bg-opacity-10 duration-200`}>
						<Home />
						<p className='ml-2'>Home</p>
					</div>
				</Link>
				<Link href={"/"}>
					<div className='text-gray-400 flex items-center px-8 cursor-pointer border-b border-gray-800 py-5 hover:bg-white hover:bg-opacity-10 duration-200'>
						<Collection />
						<p className='ml-2'>Collection</p>
					</div>
				</Link>
				<p className='px-8 font-semibold my-4 text-lg'>Library</p>
				<span onClick={() => { setter(true) }}>
					<div className='text-gray-400 flex items-center px-8 cursor-pointer border-b border-gray-800 py-5 hover:bg-white hover:bg-opacity-10 duration-200'>
						<BsFolderPlus />
						<p className='ml-2'>Create Playlist</p>
					</div>
				</span>
				<div className='h-72 overflow-auto custom-white-scroll rounded-lg'>
					{
						savedData && savedData.map((playlist) => {
							return <Link key={playlist.dataID} href={`/playlist/my/${playlist.dataID}`} >
								<div className='text-gray-400 flex items-center px-8 cursor-pointer border-b border-gray-800 py-5 hover:bg-white hover:bg-opacity-10 duration-200'>
									<BsMusicNoteList />
									<p className='ml-2 capitalize'>{playlist.title}</p>
								</div>
							</Link>
						})
					}
				</div>
				<img src="/assets/music-note-list.svg" alt="" />
				<img src="/assets/vinyl.svg" alt="" />
				<img src="/assets/star.svg" alt="" />
				<img src="/assets/mic.svg" alt="" />
			</div>
		</>
	)
}

export default Sidebar