import { onMount, createSignal, createEffect } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import { createResizeObserver } from '@solid-primitives/resize-observer'
import { createAllParagraphs } from '../../providers/ParagraphProviders.jsx'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'

export const Slider = (props) => {
  let sliderRef
  let percentScrolled
  let intersectionObserver

  const [currentPage, setCurrentPage] = createSignal(0)
  const [textOnScreen, setTextOnScreen] = createSignal(' ')
  const [windowWidth, setWindowWidth] = createSignal(0)
  const [windowHeight, setWindowHeight] = createSignal(0)
  const [scrollWidth, setScrollWidth] = createSignal(0)

  const [searchParams, setSearchParams] = useSearchParams()

  const allParagraphs = createAllParagraphs()

  const maxPage = () => Math.ceil(scrollWidth() / windowWidth() - 1)

  const intersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTextOnScreen(entry)
      }
    })
  }

  const intersectionObserverOptions = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 1.0, // visible amount of item shown in relation to root
  }

  const handleWindowChange = async () => {
    if (textOnScreen() !== ' ') {
      await scrollIntoView(textOnScreen().target, {
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
          allParagraphs().forEach((paragraph) =>
            intersectionObserver.observe(paragraph)
          )
          percentScrolled = 0
        })
    }
  }

  const scroll = (scrollOffset) =>
    (props.fullTextRef.scrollLeft += scrollOffset)

  onMount(() => {
    props.rootDivRef.addEventListener('keydown', () => {
      if (event.key === 'ArrowLeft')
        setCurrentPage(Math.max(0, currentPage() - 1))
      if (event.key === 'ArrowRight')
        setCurrentPage(Math.min(maxPage(), currentPage() + 1))
    })

    createResizeObserver(document.body, ({ width, height }, el) => {
      setScrollWidth(props.fullTextRef.scrollWidth)
      if (el === document.body && width !== windowWidth()) {
        setWindowWidth(width)
        setWindowHeight(height)
        handleWindowChange()
      }
      if (el === document.body && height !== windowHeight()) {
        allParagraphs().forEach((paragraph) =>
          intersectionObserver.unobserve(paragraph)
        )
        setWindowWidth(width)
        setWindowHeight(height)
        handleWindowChange()
      }
    })

    intersectionObserver = new IntersectionObserver(
      intersectionObserverCallback,
      intersectionObserverOptions
    )

    allParagraphs().forEach((paragraph) =>
      intersectionObserver.observe(paragraph)
    )

    return () => {
      allParagraphs().forEach((paragraph) =>
        intersectionObserver.unobserve(paragraph)
      )
    }
  })

  createEffect(() => sliderRef.setAttribute('max', maxPage()))

  createEffect(() => {
    if (textOnScreen() !== ' ') {
      const chapter = textOnScreen().target.id.split(' ')[1]
      const paragraph =
        currentPage() === 0 || currentPage() === 1
          ? null
          : textOnScreen().target.id.split(' ')[3]
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
