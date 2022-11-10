import { createEffect, createSignal } from 'solid-js'
import { createScrollWidth } from './utils/createScrollWidth.jsx'
import { useWindowSize } from '@solid-primitives/resize-observer'
import { useSearchParams } from '@solidjs/router'

export const Slider = (props) => {
  let sliderRef
  let windowWidth
  let scrollWidth

  const [page, setPage] = createSignal(0)
  const [maxScroll, setMaxScroll] = createSignal(0) //rename to maxPage?
  const [chapterClicked, setChapterClicked] = createSignal(false)
  const [resized, setResized] = createSignal(false)
  const [textOnScreen, setTextOnScreen] = createSignal(' ')

  const [searchParams, setSearchParams] = useSearchParams()

  const windowSize = useWindowSize()

  const options = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 1.0, // visible amount of item shown in relation to root
  }

  createEffect(() => {
    if (props.paragraphsLoaded === 'ready') {
      const paragraphs = document.querySelectorAll('.bookParagraphs')
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setTextOnScreen(entry.target.id)
          }
        })
      }, options)
      paragraphs.forEach((paragraph) => {
        observer.observe(paragraph)
      })
    }
  })

  createEffect((prev) => {
    windowWidth = windowSize.width
    if (windowWidth !== prev) {
      setResized(true)
      props.fullTextRef.scrollTop = 0
      setMaxPages()
      document.getElementById(textOnScreen()).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
      setTimeout(() => {
        scrollWidth = createScrollWidth(props.fullTextRef)
        const totalWidth = scrollWidth() - windowWidth
        const percentScrolled = props.fullTextRef.scrollLeft / totalWidth
        setPage(Math.floor(maxScroll() * percentScrolled))
      }, 700)
    }
    return windowWidth
  }, windowSize.width)

  createEffect((prev) => {
    //TODO is this ever used?
    const elementInView = textOnScreen()
    if (elementInView === undefined) setTextOnScreen(prev)
    return elementInView
  })

  createEffect((prev) => {
    const chapterAndParagraph = textOnScreen()
    if (chapterAndParagraph !== prev && chapterAndParagraph !== ' ') {
      const chapter = chapterAndParagraph.split(' ')[1]
      let paragraph =
        page() === 0 || page() === 1 ? null : chapterAndParagraph.split(' ')[3]
      setSearchParams({ chapter: chapter, paragraph: paragraph })
      console.log('read this: ', searchParams.paragraph) //what am I supposed to do with this?
    }
    return chapterAndParagraph
  }, '')

  createEffect((prev) => {
    const book = `${props.title} + ${props.translator}`
    if (book !== prev) {
      setChapterClicked(false)
      setResized(false)
      setPage(0)
      setMaxPages()
    }
    return book
  }, '')

  createEffect((prev) => {
    const currentSlider = page()
    if (
      currentSlider > prev &&
      chapterClicked() === false &&
      resized() === false
    )
      scroll(windowWidth * (currentSlider - prev))
    if (
      currentSlider < prev &&
      chapterClicked() === false &&
      resized() === false
    )
      scroll(-windowWidth * (prev - currentSlider))

    return currentSlider
  })

  createEffect((prev) => {
    const currentChapter = props.percentScrolledToChapter
    if (currentChapter !== prev) {
      setChapterClicked(true)
      setPage(Math.ceil(maxScroll() * props.percentScrolledToChapter))
    }
    return currentChapter
  })

  createEffect(() => {
    props.rootDivRef.addEventListener('keydown', () =>
      handleSliderChange(event)
    )
  })

  const setMaxPages = () => {
    setTimeout(() => {
      scrollWidth = createScrollWidth(props.fullTextRef)
      setMaxScroll(Math.ceil(scrollWidth() / windowWidth - 1))
      sliderRef.setAttribute('max', maxScroll())
    }, 300)
  }

  const scroll = (scrollOffset) => {
    props.fullTextRef.scrollLeft += scrollOffset
  }

  const handleSliderChange = (event) => {
    if (event.which === 37 && page() !== 0) {
      setChapterClicked(false)
      setResized(false)
      setPage(page() - 1)
    }
    if (event.which === 39 && page() !== maxScroll()) {
      setChapterClicked(false)
      setResized(false)
      setPage(page() + 1)
    }
  }

  return (
    <div class='grid grid-cols-1 gap-5 w-11/12 self-center py-5 mt-auto pointer-events-auto'>
      <input
        ref={sliderRef}
        type='range'
        value={page()}
        onKeyDown={() => event.preventDefault()}
        onChange={() => {
          setChapterClicked(false)
          setResized(false)
          setPage(parseInt(event.target.value))
        }}
        class='w-full'
      />
      <h2>
        Page {page()} of {maxScroll()}
      </h2>
    </div>
  )
}
