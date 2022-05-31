import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/Main.css'
import { MainContextProvider } from '../context/Main'
import { AuthContextProvider } from '../context/Auth'
import Player from '../components/Player'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import CreatePlaylistModal from "../components/CreatePlaylistModal"
import { DataContextProvider } from '../context/Data'
import { motion, AnimatePresence } from "framer-motion"
import LoadingBar from 'react-top-loading-bar'


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [player, setPlayer] = useState(false)
  useEffect(() => {
    router.route.includes("auth") ? setPlayer(false) : setPlayer(true)
  }, [router]);
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false)

  const handleMouseEvents = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    // window.addEventListener('error', () => {
    //   console.clear()
    // })
    window.addEventListener("contextmenu", handleMouseEvents)
    return () => {
      window.removeEventListener("contextmenu", handleMouseEvents)
    };

  }, []);

  const ref = useRef(null)

  return (
    <>
      <AuthContextProvider>
        <DataContextProvider>
          <MainContextProvider>
            <LoadingBar color='#f11946' ref={ref} />
            <Component {...pageProps} />
            {player ? <>
              <Player />
              <Sidebar setter={setShowCreatePlaylistModal} />
              <Topbar />
            </> : null}
            <CreatePlaylistModal setter={setShowCreatePlaylistModal} show={showCreatePlaylistModal} />
          </MainContextProvider>
        </DataContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default MyApp
