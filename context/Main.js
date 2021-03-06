import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router"


const MainContext = createContext();

export function MainContextProvider({ children }) {

	const version = "v1.0.0"
	let source = axios.CancelToken.source()
	const [results, setResults] = useState();
	const [play, setPlay] = useState(false);
	const [currentSong, setCurrentSong] = useState({ song: "", id: 0 });
	const [search, setSearch] = useState("")
	const [primarySearchResult, setPrimarySearchResult] = useState()
	const [searchFocus, setSearchFocus] = useState(false)
	const [enableFocus, setEnableFocus] = useState(false)
	const [trendingSearch, setTrendingSearch] = useState()
	const [playlistData, setPlaylistData] = useState()
	const [albumData, setAlbumData] = useState()
	const [playlistRoute, setPlaylistRoute] = useState("")
	const [song, setSong] = useState({})
	const [volume, setVolume] = useState(1)
	const [queue, setQueue] = useState([])
	const [currentQueueItem, setCurrentQueueItem] = useState(0)
	const [alert, setAlert] = useState("")
	const [mainSearchResultSong, setMainSearchResultSong] = useState([])
	const [lyrics, setLyrics] = useState("")
	const [p, setP] = useState(1)
	const [loop, setLoop] = useState(false)
	const [openQueue, setOpenQueue] = useState(false)
	const [quality, setQuality] = useState(4)
	const [songQuality, setSongQuality] = useState(quality)

	const handleTrendingSearch = () => {
		if (searchFocus) {
			const finalURL = `${window.location.origin}/api/getTrendingSearch/`;
			axios.get(finalURL)
				.then((res) => {
					setTrendingSearch(res.data)
				})
		}
		// else {
		// 	setTrendingSearch()
		// 	setPrimarySearchResult()
		// }
	}

	const streamingQuality = [
		{
			quality: '12kbps',
			value: 0
		},
		{
			quality: '48kbps',
			value: 1
		},
		{
			quality: '96kbps',
			value: 2
		},
		{
			quality: '160kbps',
			value: 3
		},
		{
			quality: '320kbps',
			value: 4
		}
	]
	useEffect(() => {
		const storageData = JSON.parse(window.localStorage.getItem("current_song"))
		setCurrentSong(storageData)
		setQueue(JSON.parse(window.localStorage.getItem("queue")) || [])
		axios.get(`${window.location.origin}/api/home`)
			.then((res) => {
				setResults(res.data)
			})
	}, []);

	useEffect(() => {
		let storedQuality = window.localStorage.getItem('streamingQuality')
		if (storedQuality) {
			setQuality(storedQuality)
			setSongQuality(storedQuality)
		}
		else {
			window.localStorage.setItem('streamingQuality', 4)
			setQuality(4)
			setSongQuality(4)
		}
	}, []);

	useEffect(() => {
		if (currentSong && currentSong.song && currentSong.song.length !== 0) {
			window.localStorage.setItem("current_song", JSON.stringify(currentSong))
			axios.get(`${window.location.origin}/api/playSong/?url=${currentSong.song}`)
				.then(async (res) => {
					setSong(res.data.results)
					setPlay(true)
					// axios.get(`${window.location.origin}/api/lyrics`, {
					// 	params: {
					// 		track: res.data.results.name,
					// 		artist: res.data.results.artist.split(",")[2]
					// 	}
					// })
					// 	.then((response) => {
					// 		console.log(response)
					// 	})
				})
		}
	}, [currentSong]);
	useEffect(() => {
		let unmount = false
		if (search.length >= 1) {
			setPrimarySearchResult()
			const finalURL = `${window.location.origin}/api/search/?q=${search}`;
			axios.get(finalURL, { cancelToken: source.token })
				.then((res) => {
					if (!unmount) {
						setPrimarySearchResult(res.data)
					}
				})
			return () => {
				unmount = true
			}
		}
	}, [search]);

	useEffect(() => {
		setPlaylistData()
	}, [playlistRoute]);

	useEffect(() => {
		handleTrendingSearch()
	}, [searchFocus]);

	const handleQueue = (data) => {
		let arr = []
		data && data.forEach((song) => {
			let obj = {
				perma_url: song.perma_url,
				image: song.image,
				title: song.title,
				subtitle: song.subtitle,
				more_info: {
					album: song.more_info.album,
					duration: song.more_info.duration
				}
			}
			arr.push(obj)
		})
		window.localStorage.setItem("queue", JSON.stringify(arr))
		setQueue(arr)
	}
	useEffect(() => {
		let timeout = setTimeout(() => {
			setAlert("")
		}, 3000);
		return () => {
			clearTimeout(timeout)
		}
	}, [alert]);
	useEffect(() => {
		if (quality !== songQuality) {
			setAlert(`Updated Streaming Quality to ${streamingQuality[quality].quality}`)
		}
	}, [quality]);
	return (
		<MainContext.Provider value={{ volume, setVolume, results, play, setPlay, currentSong, setCurrentSong, search, setSearch, primarySearchResult, searchFocus, setSearchFocus, trendingSearch, playlistData, setPlaylistData, playlistRoute, setPlaylistRoute, albumData, setAlbumData, song, enableFocus, setEnableFocus, queue, setQueue, currentQueueItem, setCurrentQueueItem, handleQueue, alert, setAlert, mainSearchResultSong, setMainSearchResultSong, p, setP, loop, setLoop, openQueue, setOpenQueue, quality, setQuality, version, songQuality, setSongQuality, streamingQuality }}>
			{children}
		</MainContext.Provider>
	);
}

export function useMainContext() {
	return useContext(MainContext);
}
