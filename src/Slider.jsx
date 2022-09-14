import { onMount, createEffect, createSignal } from 'solid-js'
import { createWindowWidth } from './utils/createWindowWidth.jsx'
import { createScrollWidth } from './utils/createScrollWidth.jsx'

export const Slider = (props) => {
  let sliderRef
  let windowWidth
  let scrollWidth

  const [page, setPage] = createSignal(0)
  const [maxScroll, setMaxScroll] = createSignal(0)
  const [chapterClicked, setChapterClicked] = createSignal(false)

  onMount(() => {
    props.rootDivRef.focus()
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

  createEffect(() => {
    windowWidth = createWindowWidth()
  })

  createEffect((prev) => {
    const currentSlider = page()
    if (currentSlider > prev && chapterClicked() === false)
      scroll(windowWidth() * (currentSlider - prev))
    if (currentSlider < prev && chapterClicked() === false)
      scroll(-windowWidth() * (prev - currentSlider))
    return currentSlider
  })

  createEffect((prev) => {
    const currentChapter = props.percentScrolledToChapter
    if (currentChapter !== prev) {
      setChapterClicked(true)
      setPage(Math.ceil(maxScroll() * (props.percentScrolledToChapter / 100)))
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
      setTimeout(() => {
        scrollWidth = createScrollWidth(props.fullTextRef)
        setMaxScroll(Math.ceil(scrollWidth() / windowWidth() - 1))
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
