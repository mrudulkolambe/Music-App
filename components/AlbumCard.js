import Link from 'next/link';
import React from 'react'

const AlbumCard = ({ album }) => {
	const { title, image, subtitle, type, id } = album;
	const imgURL = image.replace(".webp", ".jpg")
	const finalIMGURL = imgURL.replace("-150x150", "-500x500")
	const url = album && type === "album" ? `/album/${id}` : album && type === "playlist" ? `/playlist/${id}` : album && type === "song" ? `/song/${id}` : album && type === "radio_station" ? `/artist/${id}` : null;
	return (
		<>
			{
				album && url !== null || type === "album" || type === "playlist" || type === "song" || type === 'radio_station' ? <Link href={url}>
					<div className='Nunito mx-2 min-w-200 cursor-pointer flex flex-col justify-between'>
						<div className='py-4 px-2 relative'>
							<img className='constraint_card_image h-44 w-44 rounded-2xl rounded-bl-none shadow-xl' src={finalIMGURL} alt="" />
							<img className='constraint_card_image absolute top-6 blur-md -z-20 h-44 w-44 rounded-2xl rounded-bl-none shadow-xl' src={finalIMGURL} alt="" />
						</div>
						<div className='flex justify-between flex-col'>
							<p className='font-bold mt-3 w-11/12 text-ellipsis overflow-hidden whitespace-nowrap' dangerouslySetInnerHTML={{ __html: title }}></p>
							<p className='text-xs text-gray-500 w-11/12 text-ellipsis overflow-hidden whitespace-nowrap' dangerouslySetInnerHTML={{ __html: subtitle || title }}></p>
						</div>
					</div>
				</Link>
					:
					<div className='Nunito mx-2 min-w-200 cursor-pointer flex flex-col justify-between'>
						<div className='py-4 relative'>
							<img className='h-44 w-44 rounded-2xl rounded-bl-none shadow-xl' src={finalIMGURL} alt="" />
							<img className='absolute top-6 blur-md -z-20 h-44 w-44 rounded-2xl rounded-bl-none shadow-xl' src={finalIMGURL} alt="" />
						</div>
						<div className='flex justify-between flex-col'>
							<p className='font-bold mt-3 w-11/12 text-ellipsis overflow-hidden whitespace-nowrap' dangerouslySetInnerHTML={{ __html: title }}></p>
							<p className='text-xs text-gray-500 w-11/12 text-ellipsis overflow-hidden whitespace-nowrap' dangerouslySetInnerHTML={{ __html: subtitle || title }}></p>
						</div>
					</div>

			}
		</>
	)
}

export default AlbumCard