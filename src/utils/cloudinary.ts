export const optimizeImage = (url: string, width: number = 800): string => {
  if (!url.includes('cloudinary.com')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`)
}