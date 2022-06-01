import Image from 'next/image'
import React, { useEffect } from 'react'
import { useAuthContext } from '../context/Auth'
import { useMainContext } from '../context/Main'
import Link from 'next/link'

const settings = () => {

	const { user } = useAuthContext()
	const { quality, setQuality, version, streamingQuality } = useMainContext()
	return (
		<>
			<div className="Nunito absolute left-pos-16 top-16 w-10/12 z-0 p-9">
				<div className='mb-5'>
					<h1 className='text-3xl font-extrabold'>Account</h1>
				</div>
				<div>
					<h2 className='mb-2 text-xl font-bold'>Avatar</h2>
					<div className='flex items-center'>
						<Image height={80} width={80} className='rounded-full' src={user && user.photoURL || "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"} />
						<div className='flex items-center ml-6'>
							<button className='mx-2 px-2 py-1 font-bold rounded-lg border-gray-300 border-2'>Upload</button>
							<button className='mx-2 px-2 py-1 font-bold rounded-lg border-gray-300 border-2'>Remove</button>
						</div>
					</div>
					<hr className='bg-gray-400 my-5' />
					<div className=''>
						<div className='w-11/12 mb-2 flex items-center justify-around'>
							<div className='flex flex-col w-6/12'>
								<label htmlFor='displayName' className='text-sm font-bold mb-1'>Display Name</label>
								<input id='displayName' type="text" className='px-4 py-3 outline-none focus:border-blue-500 rounded border hover:border-blue-500 duration-150' placeholder='Name*' value={user && user.displayName} />
							</div>
							<div className='flex flex-col w-6/12 ml-10'>
								<label htmlFor='email' className='text-sm font-bold mb-1'>Email-Id</label>
								<input id='email' type="text" className='px-4 py-3 outline-none focus:border-blue-500 rounded border hover:border-blue-500 duration-150' placeholder='Email*' value={user && user.email} readOnly />
							</div>
						</div>
					</div>
					<h2 className='my-2 mt-6 text-xl font-bold'>Settings</h2>
					<div className='w-11/12 mb-2 flex items-center justify-around mt-4'>
						<div className='flex flex-col w-6/12'>
							<label className='text-sm font-bold mb-1'>Streaming Quality</label>
							<select value={quality} onChange={(e) => {
								setQuality(e.target.value)
								window.localStorage.setItem('streamingQuality', e.target.value)
							}} readOnly className='px-2 py-3 outline-none focus:border-blue-500 rounded border hover:border-blue-500 duration-150' >
								{streamingQuality.map((data) => {
									return <option value={data.value} key={`${data.value}StreamingQuality`}>{data.quality}</option>
								})}
							</select>
						</div>
						<div className='flex flex-col w-6/12 ml-10'>
							<label className='text-sm font-bold mb-1'>Download Quality</label>
							<select value={quality} readOnly className='px-2 py-3 outline-none focus:border-blue-500 rounded border hover:border-blue-500 duration-150'>
								<option value="0" key="0">12kbps</option>
								<option value="1" key="1">48kbps</option>
								<option value="2" key="2">96kbps</option>
								<option value="3" key="3">160kbps</option>
								<option value="4" key="4">320kbps</option>
							</select>
						</div>
					</div>
					<h2 className='my-2 mt-6 text-xl font-bold Nunito'>About</h2>
					<div className='w-11/12 mb-2 flex items-center justify-around mt-6'>
						<div className='flex items-center w-6/12 justify-between'>
							<div>
								<h1 className='font-bold'>Version</h1>
								<h3 className='text-gray-500 text-sm'>Current Version Of Web-App</h3>
							</div>
							<span>{version}</span>
						</div>
						<div className='flex items-center w-6/12 ml-10 justify-between'>
							<div>
								<h1 className='font-bold'>Share</h1>
								<h3 className='text-gray-500 text-sm'>Let your friends know about us!</h3>
							</div>
							<span className='cursor-pointer' onClick={() => { window.navigator.share({ title: "Musify", url: window.location.href }) }}>Share</span>
						</div>
					</div>
					<div className='w-11/12 mb-2 flex items-center justify-around my-7'>
						<Link href={'/about'}><a className='underline underline-offset-2'>More Info</a></Link>
					</div>
				</div>
			</div >
		</>
	)
}

export default settings