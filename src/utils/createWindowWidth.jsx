import { createSignal, createEffect } from 'solid-js'

const getWindowWidth = () => {
  const windowWidth = window.innerWidth
  return windowWidth
}

export const createWindowWidth = () => {
  const [windowWidth, setWindowWidth] = createSignal(getWindowWidth())

  createEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return windowWidth
}
