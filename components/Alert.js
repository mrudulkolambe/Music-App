import React, { useEffect } from 'react'

const Alert = ({ show }) => {
	return (
		<>
			<div className={show.length !== 0 ? 'shadow-lg Nunito bg-blue-600 zindex500 fixed left-1/2 -translate-x-1/2 bottom-32 font-bold text-white duration-300 px-3 py-2 rounded-md' : 'shadow-lg Nunito bg-blue-600 zindex1000 fixed left-1/2 -translate-x-1/2 bottom-0 duration-300 font-bold text-white px-3 py-2 rounded-md'}>{show}</div>
		</>
	)
}

export default Alert