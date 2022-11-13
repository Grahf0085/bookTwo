import { createEffect, createSignal } from 'solid-js'
import { createScrollWidth } from './utils/createScrollWidth.jsx'
import { useWindowSize } from '@solid-primitives/resize-observer'
import { useSearchParams } from '@solidjs/router'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'

export const Slider = (props) => {
  let sliderRef
  let windowWidth
  let scrollWidth

  const [currentPage, setCurrentPage] = createSignal(0)
  const [maxPage, setMaxPage] = createSignal(0)
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
      setMaxPages()
      handleWindowChange(textOnScreen())
    }
    return windowWidth
  }, windowSize.width)

  const handleWindowChange = async (text) => {
    const textOnScreen = document.getElementById(text)
    await scrollIntoView(textOnScreen, {
      behavior: 'smooth',
      block: 'nearest',
    }).then(() =>
      createEffect(() => {
        scrollWidth = createScrollWidth(props.fullTextRef)
        const totalWidth = scrollWidth() - windowWidth
        const percentScrolled = props.fullTextRef.scrollLeft / totalWidth
        setCurrentPage(Math.ceil(maxPage() * percentScrolled))
      })
    )
  }

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
        currentPage() === 0 || currentPage() === 1
          ? null
          : chapterAndParagraph.split(' ')[3]
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
      setCurrentPage(0)
      setMaxPages()
    }
    return book
  }, '')

  createEffect((prev) => {
    const currentSlider = currentPage()
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

  createEffect(() => {
    const currentChapter = props.percentScrolledToChapter
    if (currentChapter !== undefined) {
      setChapterClicked(true)
      setCurrentPage(Math.ceil(maxPage() * props.percentScrolledToChapter))
    }
    props.setPercentScrolledToChapter(undefined)
  })

  createEffect(() => {
    props.rootDivRef.addEventListener('keydown', () =>
      handleSliderChange(event)
    )
  })

  const setMaxPages = () => {
    setTimeout(() => {
      scrollWidth = createScrollWidth(props.fullTextRef)
      setMaxPage(Math.ceil(scrollWidth() / windowWidth - 1))
      sliderRef.setAttribute('max', maxPage())
    }, 300)
  }

  const scroll = (scrollOffset) => {
    props.fullTextRef.scrollLeft += scrollOffset
  }

  const handleSliderChange = (event) => {
    if (event.which === 37 && currentPage() !== 0) {
      setChapterClicked(false)
      setResized(false)
      setCurrentPage(currentPage() - 1)
    }
    if (event.which === 39 && currentPage() !== maxPage()) {
      setChapterClicked(false)
      setResized(false)
      setCurrentPage(currentPage() + 1)
    }
  }

  return (
    <div class='grid grid-cols-1 gap-5 w-11/12 self-center py-5 mt-auto pointer-events-auto'>
      <input
        ref={sliderRef}
        type='range'
        value={currentPage()}
        onKeyDown={() => event.preventDefault()}
        onChange={() => {
          setChapterClicked(false)
          setResized(false)
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

//
