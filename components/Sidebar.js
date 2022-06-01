import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Home from './icons/Home'
import Collection from "./icons/Collection"
import { BsMusicNoteList, BsFolderPlus } from "react-icons/bs"
import { useDataContext } from '../context/Data'
import Alert from './Alert'
import { useMainContext } from '../context/Main'
import { useAuthContext } from '../context/Auth'
import Settings from './icons/Settings'

const Sidebar = ({ setter }) => {
	const router = useRouter()
	const { user } = useAuthContext()
	const [route, setRoute] = useState(0)
	const { savedData } = useDataContext()
	const { alert, setAlert, play } = useMainContext()
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
			<div className='hidden md:block Nunito w-2/12 zindex1000 fixed h-screen accent text-white z-0'>
				<div className='h-16 w-full light-accent flex items-center justify-center shadow-lg z-50'>
					<div className='flex items-center visualizer-container'>
						<span className={play ? "duration-300 bar bar1 m-0.5 h-7 w-2 bg-cyan-400 rounded-full" : "duration-300 bar1 m-0.5 h-4 w-2 bg-cyan-400 rounded-full "}></span>
						<span className={play ? 'duration-300 bar bar2 m-0.5 h-7 w-2 bg-red-500 rounded-full' : 'duration-300 bar2 m-0.5 h-7 w-2 bg-red-500 rounded-full'}></span>
						<span className={play ? 'duration-300 bar bar3 m-0.5 h-7 w-2 bg-orange-400 rounded-full' : 'duration-300 bar3 m-0.5 h-5 w-2 bg-orange-400 rounded-full'}></span>
					</div>
					<p className='text-lg font-bold mx-1'>Musify</p>
				</div>
				<p className='px-8 font-semibold mt-9 mb-4 text-lg'>Discover</p>
				<Link href={"/"}>
					<div className={`${route === 0 ? 'text-white' : 'text-gray-400'} flex items-center px-8 cursor-pointer border-b border-gray-800 py-5 hover:bg-white hover:bg-opacity-10 duration-200`}>
						<Home />
						<p className='ml-2'>Home</p>
					</div>
				</Link>
				{/* <Link href={"/"}>
					<div className='text-gray-400 flex items-center px-8 cursor-pointer border-b border-gray-800 py-5 hover:bg-white hover:bg-opacity-10 duration-200'>
						<Collection />
						<p className='ml-2'>Collection</p>
					</div>
				</Link> */}
				<Link href={"/about"}>
					<div className='text-gray-400 flex items-center px-8 cursor-pointer border-b border-gray-800 py-5 hover:bg-white hover:bg-opacity-10 duration-200'>
						<Collection />
						<p className='ml-2'>About</p>
					</div>
				</Link>
				<Link href={"/settings"}>
					<div className='text-gray-400 flex items-center px-8 cursor-pointer border-b border-gray-800 py-5 hover:bg-white hover:bg-opacity-10 duration-200'>
						<Settings />
						<p className='ml-2'>Settings</p>
					</div>
				</Link>
				<p className='px-8 font-semibold my-4 text-lg'>Library</p>
				<span onClick={() => { user ? setter(true) : router.push("/auth") }}>
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
			</div>
		</>
	)
}

export default Sidebar