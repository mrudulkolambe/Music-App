import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SongCard from '../../components/SongCard'
import { useMainContext } from '../../context/Main'
import InfiniteScroll from "react-infinite-scroll-component";

const SearchAlbum = () => {
	let source = axios.CancelToken.source()
	const { search, mainSearchResultSong, setMainSearchResultSong, p, setP } = useMainContext()
	const [totalResults, setTotalResults] = useState(0)
	useEffect(() => {
		let unmount = false
		if (search.length !== 0) {
			const finalURL = `${window.location.origin}/api/searchAlbum/?q=${search}&p=${p}`;
			axios.get(finalURL, { cancelToken: source.token })
				.then((res) => {
					if (!unmount) {
						setMainSearchResultSong(res.data.results)
						setTotalResults(res.data.total)
						console.log(res.data)
					}
				})
				.catch((err) => {
					console.log(err)
				})
			return () => {
				unmount = true
			};
		}
	}, [search]);
	const fetchData = () => {
		let storedQuery = window.localStorage.getItem('search')
		const finalURL = `${window.location.origin}/api/searchAlbum/?q=${storedQuery}&p=${p + 1}`;
		axios.get(finalURL)
			.then((res) => {
				let data = mainSearchResultSong && mainSearchResultSong.concat(res.data.results)
				setMainSearchResultSong(data)
				setP(p + 1)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	return (
		<>
			<div className="absolute left-pos-16 top-16 w-10/12 Nunito">
				<div className='bg-gray-200 shadow-xl p-4 py-12 z-0 text-2xl'>
					<h1>Search Results For <span className='font-semibold capitalize'>{search}</span></h1>
					<h1 className='hidden'>Search Results For <span className='font-semibold capitalize'>{search}</span></h1>
					<div>
					</div>
				</div>

				<div className='p-4'>
					<h1 className='text-2xl font-bold mt-4'>Songs</h1>
					<div className='mt-2 w-full overscroll-auto pb-16'>
						<InfiniteScroll
							dataLength={mainSearchResultSong && mainSearchResultSong.length}
							next={fetchData}
							hasMore={mainSearchResultSong && mainSearchResultSong.length <= totalResults}
							loader={<h4>Loading...</h4>}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>Yay! You have seen it all</b>
								</p>
							}
						>
							{
								mainSearchResultSong && mainSearchResultSong.map((song, i) => {
									return <SongCard song={song} key={i} item={i} data={mainSearchResultSong} />
								})
							}
						</InfiniteScroll>
					</div>
				</div>
			</div>
		</>
	)
}

export default SearchAlbum