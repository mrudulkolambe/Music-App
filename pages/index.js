import AlbumCard from "../components/AlbumCard";
import { useState, useEffect } from "react"
import Alert from "../components/Alert";
import { useMainContext } from "../context/Main";
import Head from "next/head";

export default function Home({ }) {
  const { results } = useMainContext()
  const [alert, setAlert] = useState("")
  return (
    <>

      <Head>
        <title>Musify | Home</title>
      </Head>
      <Alert show={alert} />
      <div className="absolute left-pos-16 top-16 w-10/12 z-0">

        {/* New Releases */}
        <div className="pl-10">
          <div className="flex justify-between items-center">
            <h1 className="py-10 pb-4  text-4xl Nunito text-gray-400 font-light">
              <span className="text-black font-bold">New</span>
              {" "}Releases
            </h1>
            {/* <div className="pr-12">arrow</div> */}
          </div>
          <div className="pl-3 gap-x-4 pb-3 flex items-center overflow-x-auto border-b">
            {
              results && results.new_albums.map((album) => {
                return <AlbumCard album={album} key={album.id} />
              })
            }
          </div>
        </div>

        {/* Trending Now */}
        <div className="pl-10">
          <h1 className="py-10 pb-4  text-4xl Nunito text-gray-400 font-light"><span className="text-black font-bold">Trending</span>{" "}Now</h1>
          <div className="pl-3 gap-x-4 pb-3 flex items-center overflow-x-auto border-b">
            {
              results && results.new_trending.map((album) => {
                return <AlbumCard album={album} key={album.id} />
              })
            }
          </div>
        </div>

        {/* Top Charts */}
        <div className="pl-10">
          <h1 className="py-10 pb-4  text-4xl Nunito text-gray-400 font-light"><span className="text-black font-bold">Top</span>{" "}Charts</h1>
          <div className="pl-3 gap-x-4 pb-3 flex items-center overflow-x-auto border-b">
            {
              results && results.charts.map((album, i) => {
                return <AlbumCard key={i} album={album} />
              })
            }
          </div>
        </div>

        {/* Editorial Picks */}
        <div className="pl-10">
          <h1 className="py-10 pb-4  text-4xl Nunito text-gray-400 font-light"><span className="text-black font-bold">Editorial</span>{" "}Picks</h1>
          <div className="pl-3 gap-x-4 pb-3 flex items-center overflow-x-auto border-b">
            {
              results && results.top_playlists.map((album, i) => {
                return <AlbumCard key={i} album={album} />
              })
            }
          </div>
        </div>

        {/* What's Hot */}
        <div className="pl-10">
          <h1 className="py-10 pb-4  text-4xl Nunito text-gray-400 font-light"><span className="text-black font-bold">{"What's"}</span>{" "}Hot</h1>
          <div className="pl-3 gap-x-4 pb-3 flex items-center overflow-x-auto border-b">
            {
              results && results.city_mod.map((album, i) => {
                if (album.type !== 'radio_station') {
                  return <AlbumCard key={i} album={album} />
                }
              })
            }
          </div>
        </div>

        {/* Fresh Hits */}
        <div className="pl-10">
          <h1 className="py-10 pb-4  text-4xl Nunito text-gray-400 font-light"><span className="text-black font-bold">Fresh</span>{" "}Hits</h1>
          <div className="pl-3 gap-x-4 pb-3 flex items-center overflow-x-auto border-b">
            {
              results && Object.entries(results)[9][1].map((album, i) => {
                return <AlbumCard key={i} album={album} />
              })
            }
          </div>
        </div>

        {/* Top Genres & Moods */}
        <div className="pl-10">
          <h1 className="py-10 pb-4  text-4xl Nunito text-gray-400 font-light"><span className="text-black font-bold">Top</span>{" Genres & Moods"}</h1>
          <div className="pl-3 gap-x-4 pb-3 flex items-center overflow-x-auto border-b">
            {
              results && Object.entries(results)[10][1].map((album, i) => {
                return <AlbumCard key={i} album={album} />
              })
            }
          </div>
        </div>

        {/* Devotional */}
        <div className="pl-10">
          <h1 className="py-10 pb-4  text-4xl Nunito text-gray-400 font-light"><span className="text-black font-bold">Devotional</span></h1>
          <div className="pl-3 gap-x-4 pb-3 flex items-center overflow-x-auto border-b">
            {
              results && Object.entries(results)[11][1].map((album, i) => {
                return <AlbumCard key={i} album={album} />
              })
            }
          </div>
        </div>

        {/* Summer Ki Dhun */}
        <div className="pl-10 mb-20 hidden">
          <h1 className="py-10 pb-4  text-4xl Nunito text-gray-400 font-light"><span className="text-black font-bold">Summer</span>{" Ki Dhun"}</h1>
          <div className="pl-3 gap-x-4 pb-3 flex items-center overflow-x-auto border-b">
            {
              results && Object.entries(results)[11] && Object.entries(results)[11][1].forEach((album, i) => {
                return <AlbumCard key={i} album={album} />
              })
            }
          </div>
        </div>



      </div>
    </>
  )
}