import React, { useState, useEffect } from 'react'
import { useMainContext } from '../context/Main';
import { useRouter } from 'next/router';
import Play from '../components/icons/Play'

const SearchResultCard = ({ data }) => {
	const { type, id } = data;
	const [searchType, setSearchType] = useState(type);
	const [showOptions, setShowOptions] = useState(false);
	useEffect(() => {
		setSearchType(type)
	}, [type])

	const { setSearchFocus, setCurrentSong, setQueue } = useMainContext()
	const imgURL = data.image.replace(".webp", ".jpg")
	const router = useRouter()
	const url = data && searchType === "album" ? `/album/${id}` : data && searchType === "playlist" ? `/playlist/${id}` : data && searchType === "song" ? null : null
	return (
		<>
			{
				url !== null ? <div onClick={() => {
					router.push(url)
					setSearchFocus(false)
				}}>
					<div onMouseOver={() => { setShowOptions(true) }} onMouseOut={() => { setShowOptions(false) }} className='mt-3 flex items-center w-11/12 p-2 rounded-lg bg-black bg-opacity-5 hover:bg-opacity-10 duration-150 cursor-pointer'>
						<div className='relative'>
							<div className='z-10'>{showOptions ? <Play /> : null}</div>
							<img className='h-12 w-12 rounded-lg' src={imgURL} alt="" />
							<img className='absolute blur top-0 -z-10 h-12 w-12 rounded-lg' src={imgURL} alt="" />
						</div>
						<div className='ml-4'>
							<p className='font-bold w-48 text-ellipsis overflow-hidden whitespace-nowrap' dangerouslySetInnerHTML={{ __html: data.title }}></p>
							<p className='text-xs font-bold text-gray-500 capitalize w-48 text-ellipsis overflow-hidden whitespace-nowrap' dangerouslySetInnerHTML={{ __html: data.searchType }}></p>
						</div>
					</div>
				</div> :
					<div onClick={() => {
						setCurrentSong({ song: data.perma_url, id: 0 })
						setQueue([])
						setSearchFocus(false)
					}}>
						<div className='mt-3 flex items-center w-11/12 p-2 rounded-lg bg-black bg-opacity-5 hover:bg-opacity-10 duration-150 cursor-pointer'>
							<div className='relative'>
								<img className='h-12 w-12 rounded-lg' src={imgURL} alt="" />
								<img className='absolute blur top-0 -z-10 h-12 w-12 rounded-lg' src={imgURL} alt="" />
							</div>
							<div className='ml-4'>
								<p className='font-bold w-48 text-ellipsis overflow-hidden whitespace-nowrap' dangerouslySetInnerHTML={{ __html: data.title }}></p>
								<p className='text-xs font-bold text-gray-500 capitalize w-48 text-ellipsis overflow-hidden whitespace-nowrap' dangerouslySetInnerHTML={{ __html: data.searchType }}></p>
							</div>
						</div>
					</div>
			}
		</>
	)
}

export default SearchResultCard