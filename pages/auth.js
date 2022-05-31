import React from 'react'
import { BsGoogle } from "react-icons/bs"
import { useAuthContext } from '../context/Auth'
import Head from "next/head"

const Auth = () => {
	const { handleGoogleSignIn } = useAuthContext()
	return (
		<>
			<Head>
				<title>Musify | Authentication</title>
			</Head>
			<div className='h-screen w-screen accent Nunito flex items-center justify-center'>
				<button onClick={handleGoogleSignIn} type='button' className='text-white flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 duration-200 p-3 rounded-lg'>
					<BsGoogle />
					<p className='text-base font-bold ml-2'>SignIn With Google</p>
				</button>
			</div>
		</>
	)
}

export default Auth