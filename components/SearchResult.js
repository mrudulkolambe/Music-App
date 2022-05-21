import React from 'react'
import { useMainContext } from '../context/Main'
import SearchResultCard from './SearchResultCard'

const SearchResult = ({ show }) => {
	const { setEnableFocus } = useMainContext()
	const { primarySearchResult, trendingSearch, search } = useMainContext()
	return (
		<>
			<div onMouseEnter={(e) => { setEnableFocus(false) }} onMouseLeave={(e) => { setEnableFocus(true) }} className={show ? 'Nunito p-5 shadow-2xl h-96 w-10/12 left-1/2 absolute top-0 -translate-x-1/2 duration-700 opacity-100 rounded-lg mt-3 bg-white z-50' : 'Nunito p-5 shadow-2xl h-96 w-10/12 left-1/2 absolute opacity-0 duration-700 -translate-x-1/2 rounded-lg mt-3 bg-white z-50 -top-full'}>
				{
					trendingSearch && !primarySearchResult && search.length === 0 && <div className='flex justify-between'>
						<div className='w-full p-2 h-72'>
							<div className='flex justify-between items-center pr-6'>
								<p className='font-bold'>Trending Searches</p>
								{/* <p className='font-bold text-gray-400 text-xs'>See All</p> */}
							</div>
							<div className='mt-3 grid grid-cols-3'>
								{
									trendingSearch && trendingSearch.map((result) => {
										return <SearchResultCard key={result} data={result} />
									})
								}
							</div>
						</div>
					</div>
				}
				{
					primarySearchResult && <div className='flex justify-between'>
						<div className='w-1/3 p-2 border-r pl-6 h-72'>
							<div className='flex justify-between items-center pr-6'>
								<p className='font-bold'>Top Results</p>
								{/* <p className='font-bold text-gray-400 text-xs'>See All</p> */}
							</div>
							<div className='mt-3'>
								{
									primarySearchResult && primarySearchResult.topquery.data.map((result) => {
										return <SearchResultCard key={result.id} data={result} />
									})
								}
							</div>
						</div>
						<div className='w-1/3 p-2 border-r pl-6'>
							<div className='flex justify-between items-center pr-6'>
								<p className='font-bold'>Songs</p>
								<p className='font-bold text-gray-400 text-xs'>See All</p>
							</div>
							<div className='mt-3'>
								{
									primarySearchResult && primarySearchResult.songs.data.map((result) => {
										return <SearchResultCard key={result} data={result} />
									})
								}
							</div>
						</div>
						<div className='w-1/3 p-2 pl-6'>
							<div className='flex justify-between items-center pr-6'>
								<p className='font-bold'>Albums</p>
								<p className='font-bold text-gray-400 text-xs'>See All</p>
							</div>
							<div className='mt-3'>
								{
									primarySearchResult && primarySearchResult.albums.data.map((result) => {
										return <SearchResultCard key={result} data={result} />
									})
								}
							</div>
						</div>
					</div>
				}
			</div>
		</>
	)
}

export default SearchResult