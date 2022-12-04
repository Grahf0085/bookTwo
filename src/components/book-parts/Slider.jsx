import { onMount, createSignal, createEffect } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import { createResizeObserver } from '@solid-primitives/resize-observer'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'

export const Slider = (props) => {
  let sliderRef
  let percentScrolled
  let visibleParagraphs = []
  let paragraphs
  let intersectionObserver

  const observerOptions = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 1.0, // visible amount of item shown in relation to root
  }

  const [currentPage, setCurrentPage] = createSignal(0)
  const [textOnScreen, setTextOnScreen] = createSignal(' ')
  const [windowWidth, setWindowWidth] = createSignal(0)
  const [windowHeight, setWindowHeight] = createSignal(0)
  const [scrollWidth, setScrollWidth] = createSignal(0)

  const [searchParams, setSearchParams] = useSearchParams()

  const maxPage = () => Math.ceil(scrollWidth() / windowWidth() - 1)

  onMount(() => {
    props.rootDivRef.addEventListener('keydown', () => {
      if (event.key === 'ArrowLeft' && currentPage() !== 0)
        setCurrentPage(currentPage() - 1)
      if (event.key === 'ArrowRight' && currentPage() !== maxPage())
        setCurrentPage(currentPage() + 1)
    })

    createResizeObserver(document.body, ({ width, height }, el) => {
      setScrollWidth(props.fullTextRef.scrollWidth)
      if (el === document.body && width !== windowWidth()) {
        setWindowWidth(width)
        setWindowHeight(height)
        handleWindowChange(textOnScreen())
      }
      if (el === document.body && height !== windowHeight()) {
        paragraphs.forEach((paragraph) =>
          intersectionObserver.unobserve(paragraph)
        )
        setWindowWidth(width)
        setWindowHeight(height)
        handleWindowChange(textOnScreen())
      }
    })
  })

  const handleWindowChange = async (text) => {
    if (textOnScreen() !== ' ') {
      const textOnScreen = document.getElementById(text)
      await scrollIntoView(textOnScreen, {
        behavior: 'smooth',
        block: 'nearest',
      })
        .then(() =>
          createEffect(() => {
            const totalWidth = scrollWidth() - windowWidth()
            percentScrolled = props.fullTextRef.scrollLeft / totalWidth
            setCurrentPage(Math.ceil(maxPage() * percentScrolled))
          })
        )
        .finally(() => {
          paragraphs.forEach((paragraph) =>
            intersectionObserver.observe(paragraph)
          )
          percentScrolled = 0
        })
    }
  }

  const scroll = (scrollOffset) =>
    (props.fullTextRef.scrollLeft += scrollOffset)

  createEffect(() => sliderRef.setAttribute('max', maxPage()))

  createEffect(() => {
    paragraphs = document.querySelectorAll('.bookParagraphs')
    intersectionObserver = new IntersectionObserver((entries) => {
      visibleParagraphs = []
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleParagraphs.push(entry.target.id)
          setTextOnScreen(visibleParagraphs[0])
        }
      })
    }, observerOptions)
    paragraphs.forEach((paragraph) => intersectionObserver.observe(paragraph))
  })

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
    if (props.percentScrolledToChapter !== undefined)
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
        onChange={() => setCurrentPage(parseInt(event.target.value))}
        class='w-full'
      />
      <h2>
        Page {currentPage()} of {maxPage()}
      </h2>
    </div>
  )
}
