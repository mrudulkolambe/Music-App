import React from 'react'
import { useMainContext } from '../context/Main'

const About = () => {
	const { version } = useMainContext()
	return (
		<div className="Nunito absolute left-pos-16 top-16 w-10/12 z-0 p-9">
			<div className='flex justify-center'>
				<div className='flex justify-center flex-col items-center mt-10'>
					<div className='flex items-center h-12'>
						<span className={"duration-300 barMore bar1 m-0.5 h-10 w-3 bg-cyan-400 rounded-full"}></span>
						<span className={'duration-300 barMore bar2 m-0.5 h-7 w-3 bg-red-500 rounded-full'}></span>
						<span className={'duration-300 barMore bar3 m-0.5 h-10 w-3 bg-orange-400 rounded-full'}></span>
					</div>
					<h1 className='text-4xl font-extrabold'>Musify</h1>
					<h1>{version}</h1>
					<h3 className='text-xl mt-6'>This is an open-source project and can be found on</h3>
					<h3 className='text-2xl Montserrat font-bold'><a href="https://github.com/mrudulkolambe/music-app" target='_blank'>GitHub</a></h3>
					<h3 className='text-xl Montserrat mt-4'>If you liked my work</h3>
					<h3 className='text-xl Montserrat'>show some ❤️ and ⭐ the repo</h3>
				</div>
			</div>
			<footer className='text-center absolute left-0 w-full flex justify-center' style={{ bottom: '-16.5rem' }}>
				Made with ❤️ by <a href="https://github.com/mrudulkolambe" className='ml-1 font-bold'>mrudulkolambe</a>
			</footer>
		</div>
	)
}

export default About