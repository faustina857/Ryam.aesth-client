import { useState, useEffect } from 'react'

export const useTypewriter = (text: string, speed: number = 80, delay: number = 0) => {
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    setDisplayText('')
    setIsDone(false)

    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1))
        index++
        if (index === text.length) {
          clearInterval(interval)
          setIsDone(true)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return { displayText, isDone }
}