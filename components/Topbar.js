import Image from 'next/image'
import React, { useState } from 'react'
import { useAuthContext } from '../context/Auth'
import { useMainContext } from '../context/Main'
import SearchResult from './SearchResult'

const Topbar = () => {
	const { search, setSearch, searchFocus, setSearchFocus, enableFocus } = useMainContext()
	const { user, handleSignOut } = useAuthContext()
	const [menu, setMenu] = useState(false);
	return (
		<>
			<div className='left-pos-16 h-16 flex items-center shadow-lg w-10/12 bg-white fixed z-50 pr-8'>
				<div className='relative flex items-center h-full px-8 text-gray-500 justify-between w-full'>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="absolute bi bi-search" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
					</svg>
					<input onFocus={() => { setSearchFocus(true) }} onBlur={() => { enableFocus && setSearchFocus(false) }} value={search} type="text" onChange={(e) => { setSearch(e.target.value) }} className='Nunito font-semibold px-8 outline-none h-full w-48' placeholder='Search...' />
				</div>
				<div className='relative Nunito'>
					<Image onClick={() => { menu ? setMenu(false) : setMenu(true) }} height={35} width={35} className='cursor-pointer rounded-full' src={user && user.photoURL || "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"} alt="" />
					<div className={menu ? 'origin-top-right duration-300 bg-white scale-1 p-2 w-32 absolute right-3 rounded-lg shadow-lg' : 'origin-top-right duration-300 bg-white scale-0 p-2 w-32 absolute right-3 rounded-lg shadow-lg'}>
						<ul className='text-sm font-bold text-center'>
							<li className='bg-black rounded-md py-1 px-2 bg-opacity-5 hover:bg-opacity-10 duration-150 cursor-pointer' onClick={handleSignOut}>Sign Out</li>
						</ul>
					</div>
				</div>
			</div>
			<div className={searchFocus ? 'h-screen w-screen z-40 bg-black bg-opacity-20 fixed top-0 backdrop-blur-lg duration-500' : 'h-screen w-screen z-40 bg-black bg-opacity-0 pointer-events-none fixed top-0 backdrop-blur-none duration-500'}></div>
			<div className={searchFocus ? 'left-pos-16 top-16 flex items-center w-10/12 fixed z-50 shadow-lg duration-500 opacity-100' : 'opacity-0 -top-full duration-500 left-pos-16 flex items-center w-10/12 fixed z-50 shadow-lg'}>
				<SearchResult show={searchFocus} />
			</div>

		</>
	)
}

export default Topbar