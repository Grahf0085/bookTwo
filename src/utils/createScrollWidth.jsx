import { createSignal, createEffect } from 'solid-js'

const getScrollWidth = (div) => {
  const scrollWidth = div.scrollWidth
  return scrollWidth
}

export const createScrollWidth = (div) => {
  const [scrollWidth, setScrollWidth] = createSignal(getScrollWidth(div))

  createEffect(() => {
    const handleResize = () => {
      setScrollWidth(getScrollWidth(div))
    }
    div.addEventListener('MutationObserver', handleResize)
    return () => div.removeEventListener('MutationObserver', handleResize)
  })

  return scrollWidth
}
