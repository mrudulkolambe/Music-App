const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
	minimumIntegerDigits: 2,
})

function formatDuration(duration) {
	const time = Number(duration)
	const seconds = Math.floor(time % 60)
	const minutes = Math.floor(time / 60) % 60
	const hours = Math.floor(time / 3600)
	if (hours === 0) {
		if (`${minutes}:${leadingZeroFormatter.format(seconds)}`.includes("NaN")) {
			return `00:00`
		}
		else {
			return `${minutes}:${leadingZeroFormatter.format(seconds)}`
		}
	} else {
		if (`${hours}:${leadingZeroFormatter.format(
			minutes
		)}:${leadingZeroFormatter.format(seconds)}`.includes("NaN")) {
			return "00:00"
		}
		else {
			return `${hours}:${leadingZeroFormatter.format(
				minutes
			)}:${leadingZeroFormatter.format(seconds)}`
		}
	}
}

export { formatDuration }