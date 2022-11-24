import { onMount, createSignal, createEffect, createMemo } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import { useWindowSize } from '@solid-primitives/resize-observer'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import { createScrollWidth } from './utils/createScrollWidth.jsx'

export const Slider = (props) => {
  let sliderRef
  let scrollWidth
  let percentScrolled
  let visibleParagraphs = []
  let paragraphs
  let observer

  const observerOptions = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 1.0, // visible amount of item shown in relation to root
  }

  const [currentPage, setCurrentPage] = createSignal(0)
  const [textOnScreen, setTextOnScreen] = createSignal(' ')
  const [windowWidth, setWindowWidth] = createSignal(0)
  const [windowHeight, setWindowHeight] = createSignal(0)

  const [searchParams, setSearchParams] = useSearchParams()

  const windowSize = useWindowSize()

  const maxPage = createMemo(() => {
    if (
      props.paragraphsLoaded === 'ready' &&
      (windowHeight() > 0 || windowWidth() > 0)
    ) {
      const scrollWidth = createScrollWidth(props.fullTextRef)
      return Math.ceil(scrollWidth() / windowWidth() - 1)
    }
  })

  createEffect(() => {
    sliderRef.setAttribute('max', maxPage())
  })

  onMount(() => {
    props.rootDivRef.addEventListener('keydown', () =>
      handleSliderChange(event)
    )
  })

  const handleWindowChange = async (text) => {
    const textOnScreen = document.getElementById(text)
    await scrollIntoView(textOnScreen, {
      behavior: 'smooth',
      block: 'nearest',
    })
      .then(() =>
        createEffect(() => {
          scrollWidth = createScrollWidth(props.fullTextRef)
          const totalWidth = scrollWidth() - windowWidth()
          percentScrolled = props.fullTextRef.scrollLeft / totalWidth
          setCurrentPage(Math.ceil(maxPage() * percentScrolled))
        })
      )
      .finally(() => {
        paragraphs.forEach((paragraph) => observer.observe(paragraph))
        percentScrolled = 0
      })
  }

  const scroll = (scrollOffset) =>
    (props.fullTextRef.scrollLeft += scrollOffset)

  const handleSliderChange = (event) => {
    if (event.which === 37 && currentPage() !== 0)
      setCurrentPage(currentPage() - 1)
    if (event.which === 39 && currentPage() !== maxPage())
      setCurrentPage(currentPage() + 1)
  }

  createEffect(() => {
    if (props.paragraphsLoaded === 'ready') {
      paragraphs = document.querySelectorAll('.bookParagraphs')
      observer = new IntersectionObserver((entries) => {
        visibleParagraphs = []
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleParagraphs.push(entry.target.id)
            setTextOnScreen(visibleParagraphs[0])
          }
        })
      }, observerOptions)
      paragraphs.forEach((paragraph) => observer.observe(paragraph))
    }
  })

  createEffect((prev) => {
    const windowWidth = windowSize.width
    setWindowWidth(windowWidth)
    if (windowWidth !== prev) handleWindowChange(textOnScreen())
    return windowWidth
  }, windowSize.width)

  createEffect((prev) => {
    const windowHeightLocal = windowSize.height
    setWindowHeight(windowHeightLocal)
    if (windowHeightLocal !== prev) {
      paragraphs.forEach((paragraph) => observer.unobserve(paragraph))
      handleWindowChange(textOnScreen())
    }
    return windowHeightLocal
  }, windowSize.height)

  createEffect(() => {
    if (textOnScreen() !== ' ') {
      const chapter = textOnScreen().split(' ')[1]
      const paragraph =
        currentPage() === 0 || currentPage() === 1
          ? null
          : textOnScreen().split(' ')[3]
      setSearchParams({ chapter: chapter, paragraph: paragraph })
      console.log('read this: ', searchParams.paragraph) //what am I supposed to do with this?
    }
  })

  createEffect((prev) => {
    const book = `${props.title} + ${props.translator}`
    if (book !== prev) setCurrentPage(0)
    return book
  })

  createEffect((prev) => {
    const currentSlider = currentPage()
    if (
      props.percentScrolledToChapter === undefined &&
      !(percentScrolled > 0)
    ) {
      if (currentSlider > prev) scroll(windowWidth() * (currentSlider - prev))
      if (currentSlider < prev) scroll(-windowWidth() * (prev - currentSlider))
    }
    return currentSlider
  })

  createEffect(() => {
    const currentChapter = props.percentScrolledToChapter
    if (currentChapter !== undefined)
      setCurrentPage(Math.ceil(maxPage() * props.percentScrolledToChapter))
    Promise.resolve().then(() => props.setPercentScrolledToChapter(undefined))
  })

  return (
    <div class='grid grid-cols-1 gap-5 w-11/12 self-center py-5 mt-auto'>
      <input
        ref={sliderRef}
        type='range'
        value={currentPage()}
        onKeyDown={() => event.preventDefault()}
        onChange={() => {
          setCurrentPage(parseInt(event.target.value))
        }}
        class='w-full'
      />
      <h2>
        Page {currentPage()} of {maxPage()}
      </h2>
    </div>
  )
}
