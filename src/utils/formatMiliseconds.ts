export const formatMiliseconds = (ms: number) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = parseInt(((ms % 60000) / 1000).toFixed(0), 10)
  return `${minutes}:${(seconds < 10 ? '0' : '') + seconds}`
}