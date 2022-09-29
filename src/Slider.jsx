import { onMount, createEffect, createSignal } from 'solid-js'
import { createScrollWidth } from './utils/createScrollWidth.jsx'
import { useWindowSize } from '@solid-primitives/resize-observer'

export const Slider = (props) => {
  let sliderRef
  let windowWidth
  let scrollWidth

  const [page, setPage] = createSignal(0)
  const [maxScroll, setMaxScroll] = createSignal(0) //rename to maxPage?
  const [chapterClicked, setChapterClicked] = createSignal(false)

  const windowSize = useWindowSize()

  createEffect(() => {
    windowWidth = windowSize.width
  })

  /* createEffect((prev) => { */
  /*   windowWidth = windowSize.width */
  /*   const oldPage = page() */
  /*   const oldMaxPage = maxScroll() */
  /*   if (windowWidth !== prev) { */
  /*     console.log('old page is: ', oldPage) */
  /*     console.log('old max is: ', oldMaxPage) */
  /*     console.log('ratio is: ', oldPage / oldMaxPage) */
  /*     setPage(0) */
  /*     setMaxPages() */
  /*     console.log('old window: ', prev) */
  /*     console.log('new window: ', windowWidth) */
  /*     scrollWidth = createScrollWidth(props.fullTextRef) */
  /*     console.log('testing scroll width: ', scrollWidth()) */
  /*     const totalWidth = scrollWidth() - window.innerWidth */
  /*     console.log('testing total width: ', totalWidth) */
  /*     const percentScrolled = props.fullTextRef.scrollLeft / scrollWidth() */
  /*     console.log('testing percent scroll: ', percentScrolled) */
  /*     setPage(Math.ceil(maxScroll() * percentScrolled)) */
  /*   } */
  /*   return windowWidth */
  /* }) */

  onMount(() => {
    props.rootDivRef.focus()
  })

  createEffect((prev) => {
    const currentWindowWidth = windowSize.width
    const currentScrollWidth = createScrollWidth(props.fullTextRef)
    const currentTotalWidth = currentScrollWidth() - window.innerWidth
    const currentPercentScrolled =
      props.fullTextRef.scrollLeft / currentTotalWidth
    console.log('original stuff: ', currentPercentScrolled)
    if (currentWindowWidth !== prev && prev !== undefined) {
      /* setTimeout(() => { */
      /*   const newScrollWidth = createScrollWidth(props.fullTextRef) */
      /*   const newTotalWidth = newScrollWidth() - window.innerWidth */
      /*   const newPercentScrolled = props.fullTextRef.scrollLeft / newTotalWidth */
      /*   console.log('new stuff: ', newPercentScrolled) */
      /* }, 500) */
      setMaxPages()
      setPage(0)
      props.fullTextRef.scrollLeft = 0
      setTimeout(() => {
        setPage(Math.ceil(maxScroll() * currentPercentScrolled))
      }, 1000)
    }
    return currentWindowWidth
  })

  createEffect(() => {
    props.rootDivRef.focus()
  })

  createEffect((prev) => {
    const book = `${props.title} + ${props.translator}`
    if (book !== prev) {
      setChapterClicked(false)
      setPage(0)
      setMaxPages()
    }
    return book
  }, '')

  createEffect((prev) => {
    const currentSlider = page()
    if (currentSlider > prev && chapterClicked() === false)
      scroll(windowWidth * (currentSlider - prev))
    if (currentSlider < prev && chapterClicked() === false) {
      scroll(-windowWidth * (prev - currentSlider))
    }
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
    createEffect(() => {
      //maybe I can remove the createEffect?
      setTimeout(() => {
        scrollWidth = createScrollWidth(props.fullTextRef)
        setMaxScroll(Math.ceil(scrollWidth() / windowWidth - 1))
        sliderRef.setAttribute('max', maxScroll())
      }, 500)
    })
  }

  const scroll = (scrollOffset) => {
    props.fullTextRef.scrollLeft += scrollOffset
  }

  const handleSliderChange = (event) => {
    if (event.which === 37 && page() !== 0) {
      setChapterClicked(false)
      setPage(page() - 1)
    }
    if (event.which === 39 && page() !== maxScroll()) {
      setChapterClicked(false)
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
