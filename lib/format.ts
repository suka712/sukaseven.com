export const formatMsToSecond = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export const truncateWords = (text: string, wordNum: number) => {
  return text.split(' ').length > wordNum ? text.split(' ').slice(0, wordNum).join(' ') + '...' : text
}

export const truncateText = (text: string, limit: number) => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}