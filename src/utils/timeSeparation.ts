const timeSeparation = (timeString: string): string => {
  const time = new Date(timeString)
  const now = new Date()

  const diffInMs = now.getTime() - time.getTime()
  const diffInSec = Math.floor(diffInMs / 1000)
  const diffInMin = Math.floor(diffInSec / 60)
  const diffInHours = Math.floor(diffInMin / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays === 0) {
    return 'TODAY'
  } else if (diffInDays === 1) {
    return 'YESTERDAY'
  } else  if (diffInDays <= 7) {
    return 'WEEK'
  }
  return 'PAST'
}

export default timeSeparation
