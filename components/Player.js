import React, { useState, useEffect, useRef } from 'react'
import { useMainContext } from '../context/Main'
import { formatDuration } from '../utilities'
import Play from "./icons/Play"
import Pause from "./icons/Pause"
import SkipStart from './icons/SkipStart'
import SkipEnd from './icons/SkipEnd'
import Speaker2 from './icons/Speaker2'
import Speaker1 from './icons/Speaker1'
import Speaker0 from './icons/Speaker0'

const Player = () => {
  const video = useRef()
  const { play, setPlay, volume, setVolume, queue, currentQueueItem, setCurrentQueueItem, setCurrentSong, song } = useMainContext()
  const [duration, setDuration] = useState(0)
  const [speakerIcon, setSpeakerIcon] = useState(2)
  const handleProgress = (e) => {
    const progressTime = e.target.currentTime
    const duration = Number(video.current.duration)
    const quotient = progressTime / duration
    setDuration(quotient * 10000)
  }
  const handleSeeking = (e) => {
    const value = (e.target.value) / 10000;
    const duration = Number(video.current.duration)
    const progressTime = duration * value
    video.current.currentTime = progressTime
    setDuration(e.target.value)
  }
  const handlePlaying = () => {
    if (play) {
      video.current.pause()
      setPlay(false)
    }
    else {
      video.current.play()
      setPlay(true)
    }
  }

  useEffect(() => {
    if (video && video.current && video.current.currentTime !== video.current.duration) {
      play ? video.current.play() : video.current.pause()
    }
    if (song) {
      setPlay(true)
      setDuration(0)
    }
  }, [play, song]);

  const handleVolume = (e) => {
    setVolume((e.target.value) / 10000)
    if (volume <= 1) {
      video.current.volume = volume
    }
    window.localStorage.setItem("volume", volume)
  }
  useEffect(() => {
    if (volume === 0) {
      video.current.muted = true
      setSpeakerIcon(0)
    }
    else if (volume > 0 && volume <= 0.5) {
      video.current.muted = false;
      setSpeakerIcon(1)
    }
    else if (volume > 0.5 && volume <= 1) {
      video.current.muted = false;
      setSpeakerIcon(2)
    }
  }, [volume]);
  const handleMuted = () => {
    video.current.muted ? setVolume(1) : setVolume(0)
  }
  const handleSongEnding = (e) => {
    if (queue) {
      if (currentQueueItem <= queue.length) {
        setCurrentQueueItem(currentQueueItem + 1)
      }
      else {
        return
      }
    }
  }
  useEffect(() => {
    setCurrentSong({ song: queue && queue[currentQueueItem] && queue[currentQueueItem].perma_url, id: currentQueueItem })
  }, [currentQueueItem]);

  const handlePrevious = () => {
    if (queue) {
      if (currentQueueItem >= 0) {
        setCurrentQueueItem(currentQueueItem - 1)
      }
      else {
        return
      }
    }
  }

  const handleNext = () => {
    if (queue) {
      if (currentQueueItem !== queue.length) {
        setCurrentQueueItem(currentQueueItem + 1)
      }
      else {
        return
      }
    }
  }
  return (
    <>
      <div className='zindex2000 flex items-center py-2 fixed bottom-0 h-20 light-accent w-full z-50'>
        <div className='relative'>
          <video onPlay={() => {
            setPlay(true)
          }} on onEnded={handleSongEnding} onPause={() => { setPlay(false) }} onTimeUpdate={handleProgress} ref={video} src={song !== undefined && song.downloadUrl && song.downloadUrl[4].link} controls className='hidden'></video>
        </div>
        <div className='flex items-center text-white Nunito w-2/12 pl-8'>
          <div className='relative w-12'>
            <img className='h-10 constraint_player_image w-10 rounded-lg' src={song && song.image && song.image[2].link} alt="" />
            <img className='h-10 constraint_player_image w-10 blur -z-10 rounded-lg absolute top-0' src={song && song.image && song.image[2].link} alt="" />
          </div>
          <div className='font-bold ml-4 w-full'>
            <p className='w-8/12 whitespace-nowrap text-ellipsis overflow-hidden' dangerouslySetInnerHTML={{ __html: song.name }}></p>
            <p className='text-xs font-normal text-gray-400 w-8/12 whitespace-nowrap text-ellipsis overflow-hidden' dangerouslySetInnerHTML={{ __html: song.primaryArtists }}></p>
          </div>
        </div>
        <div className='w-10/12 pl-8 flex items-center' >
          <div className='flex items-center w-1/12'>
            <span onClick={handlePrevious} className='text-3xl text-white cursor-pointer'>
              <SkipStart />
            </span>
            <span onClick={handlePlaying} className='bg-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer mx-2'>
              {!play ? <Play className='text-3xl text-white cursor-pointer' /> : <Pause className='text-3xl text-white cursor-pointer' />}
            </span>
            <span onClick={handleNext} className='text-3xl text-white cursor-pointer'>
              <SkipEnd />
            </span>
          </div>
          <div className='relative w-7/12 mr-3 -top-0.5'>
            <input value={duration} onChange={handleSeeking} min={0} max={10000} type="range" className="z-50 absolute cursor-pointer w-full outline-none slider" />
            <span className='rounded-lg absolute left-0 h-1 bg-orange-400' style={{ width: (duration / 100) + "%" }}></span>
          </div>
          <div className='text-xs text-gray-400 font-semibold Nunito flex items-center'>
            <span>{formatDuration(video && video.current && video.current.currentTime) || "00:00"}</span>
            <span>&nbsp;/&nbsp;</span>
            <span>{formatDuration(video && video.current && video.current.duration) || "00:00"}</span>
          </div>

          <div className='w-1/12 ml-3 items-center flex'>
            <span className='text-white cursor-pointer' onClick={handleMuted}>
              {speakerIcon === 0 ? <Speaker0 className='text-2xl stroke-1 mx-2' /> : speakerIcon === 1 ? <Speaker1 className='text-2xl stroke-1 mx-2' /> : <Speaker2 className='text-2xl stroke-1 mx-2' />}
            </span>
            <div className='relative w-full -top-0.5'>
              <input value={volume * 10000} step={1} type="range" min={0} max={10000} onChange={handleVolume} className="z-50 absolute cursor-pointer w-full outline-none slider" />
              <span className='rounded-lg absolute left-0 h-1 bg-orange-400' style={{ width: (volume * 100) + "%" }}></span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Player