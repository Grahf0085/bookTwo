import { createSignal, createEffect, Show } from 'solid-js'
import { createWindowWidth } from './createWindowWidth.jsx'
import { createSelectedBook } from './providers/SelectedBookProvider.jsx'
import { createScrollWidth } from './createScrollWidth.jsx'
import { Nav } from './navigation/Nav.jsx'
import { FullText } from './FullText.jsx'
import { Footer } from './Footer.jsx'

function App() {
  let sliderDivRef
  let sliderRef
  let windowWidth
  let scrollWidth
  let maxScroll

  const [pageChange, setPageChange] = createSignal(0)

  const bookSelected = createSelectedBook()

  createEffect(() => {
    windowWidth = createWindowWidth()
  })

  createEffect(() => {
    if (bookSelected())
      setTimeout(() => {
        scrollWidth = createScrollWidth(sliderDivRef)
        maxScroll = scrollWidth() / windowWidth() - 1
        sliderRef.setAttribute('max', maxScroll)
      }, 1000)
  })

  createEffect((prev) => {
    const book = bookSelected()
    if (book !== prev) setPageChange(0)
    return book
  }, '')

  createEffect((prev) => {
    let currentSlider = pageChange()
    if (currentSlider > prev) scroll(windowWidth() * (currentSlider - prev))
    if (currentSlider < prev) scroll(-windowWidth() * (prev - currentSlider))
    return currentSlider
  })

  const handleSliderChange = (event) => {
    if (event.which === 37 && pageChange() !== 0)
      setPageChange(pageChange() - 1)
    if (event.which === 39 && pageChange() !== maxScroll) {
      setPageChange(pageChange() + 1)
    }
  }

  const scroll = (scrollOffset) => {
    sliderDivRef.scrollLeft += scrollOffset
  }

  return (
    <div
      tabIndex={-1}
      onKeyDown={() => handleSliderChange(event)}
      class='bg-hooplaBackground w-full h-full text-white flex flex-col'
    >
      <Nav />
      <FullText page={pageChange()} ref={sliderDivRef} />
      <Show when={bookSelected()} fallback={<Footer />}>
        <div class='flex justify-center'>
          <input
            ref={sliderRef}
            type='range'
            value={pageChange()}
            onKeyDown={() => event.preventDefault()}
            onChange={() => {
              setPageChange(parseInt(event.target.value))
            }}
            class='w-11/12'
          />
          <h1>{pageChange()}</h1>
        </div>
      </Show>
    </div>
  )
}

export default App
