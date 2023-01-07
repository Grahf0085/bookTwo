import { onMount, createSignal, createEffect } from 'solid-js'
import { createVisibleParagraphs } from '../../providers/ParagraphProviders.jsx'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'

export const Slider = (props) => {
  let sliderRef
  let percentScrolled
  let intersectionObserver

  const [currentPage, setCurrentPage] = createSignal(0)
  const [windowWidth, setWindowWidth] = createSignal(0)
  const [windowHeight, setWindowHeight] = createSignal(0)
  const [textOnScreen, setTextOnScreen] = createSignal()

  const visibleParagraphs = createVisibleParagraphs()

  const scrollWidth = () => props.fullTextRef.scrollWidth
  const maxPage = () => Math.ceil(scrollWidth() / windowWidth() - 1)

  const intersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setTextOnScreen(entry.target)
    })
  }

  const intersectionObserverOptions = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 1.0, // visible amount of item shown in relation to root
  }

  const handleWindowChangeText = () => {
    scrollIntoView(textOnScreen(), {
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
        visibleParagraphs().forEach((paragraph) =>
          intersectionObserver.observe(paragraph)
        )
        percentScrolled = 0
      })
  }

  const handleWindowChange = () => {
    if (window.innerWidth !== windowWidth()) {
      setWindowWidth(window.innerWidth)
      handleWindowChangeText()
    }
    if (window.innerHeight !== windowHeight()) {
      visibleParagraphs().forEach((paragraph) =>
        intersectionObserver.unobserve(paragraph)
      )
      setWindowHeight(window.innerHeight)
      handleWindowChangeText()
    }
  }

  const scroll = (scrollOffset) =>
    (props.fullTextRef.scrollLeft += scrollOffset)

  onMount(() => {
    window.addEventListener('keydown', () => {
      if (event.key === 'ArrowLeft')
        setCurrentPage(Math.max(0, currentPage() - 1))
      if (event.key === 'ArrowRight')
        setCurrentPage(Math.min(maxPage(), currentPage() + 1))
    })

    setWindowHeight(window.innerHeight)
    setWindowWidth(window.innerWidth)

    window.onresize = handleWindowChange

    intersectionObserver = new IntersectionObserver(
      intersectionObserverCallback,
      intersectionObserverOptions
    )

    visibleParagraphs().forEach((paragraph) =>
      intersectionObserver.observe(paragraph)
    )

    return () => {
      visibleParagraphs().forEach((paragraph) =>
        intersectionObserver.unobserve(paragraph)
      )
    }
  })

  createEffect(() => sliderRef.setAttribute('max', maxPage()))

  createEffect(() => {
    const book = `${props.title} + ${props.translator}`
    if (book) setCurrentPage(0)
  })

  createEffect((prev) => {
    const currentSlider = currentPage()
    if (
      props.percentScrolledToChapter === undefined &&
      !(percentScrolled > 0)
    ) {
      if (currentSlider === 0) props.fullTextRef.scrollLeft = 0
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
      <div class='flex justify-evenly'>
        <h3>
          Page {currentPage()} of {maxPage()}
        </h3>
        <h3>{props.title && props.title.replaceAll('%20', ' ')}</h3>
      </div>
    </div>
  )
}
