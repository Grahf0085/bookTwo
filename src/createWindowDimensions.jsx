import { createSignal, createEffect } from 'solid-js'

const getWindowDimensions = () => {
  const width = window.innerWidth
  return width
}

export const createWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = createSignal(
    getWindowDimensions()
  )

  createEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return windowDimensions
}
