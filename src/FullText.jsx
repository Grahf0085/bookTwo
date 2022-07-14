import { createSignal, createEffect, Show } from 'solid-js'
import { createSelectedBook } from './providers/SelectedBookProvider.jsx'
import { createWindowDimensions } from './createWindowDimensions.jsx'
import { BookInfo } from './book-parts/BookInfo.jsx'
import { ChapterList } from './book-parts/ChapterList.jsx'
import { Chapters } from './book-parts/Chapters.jsx'

export const FullText = (props) => {
  const [slider, setSlider] = createSignal(0)

  // const [scrollWidth, setScrollWidth] = createSignal()

  const bookSelected = createSelectedBook()

  let sliderDiv
  // const screenWidth = screen.width
  let windowWidth

  createEffect(() => {
    windowWidth = createWindowDimensions()
  })

  createEffect(() => {
    setSlider(props.pageChange)
  })

  createEffect((prev) => {
    let currentSlider = slider()
    if (currentSlider <= 0) currentSlider = 0
    if (prev <= 0) prev = 0
    if (currentSlider > prev) scroll(windowWidth())
    if (currentSlider < prev) scroll(-windowWidth())
    return currentSlider
  }, 0)

  const scroll = (scrollOffset) => {
    sliderDiv.scrollLeft += scrollOffset
  }

  return (
    <div class='flex flex-col h-[83vh] max-h-[83vh] w-screen'>
      <div
        class='overflow-y-hidden flex flex-col flex-wrap w-[100vw] max-w-[100vw] no-scrollbar'
        ref={sliderDiv}
      >
        <Show when={bookSelected()} fallback={<div>Please Select A Book</div>}>
          <>
            <BookInfo />
            <ChapterList />
            <Chapters pageNumber={slider() - 2} />
          </>
        </Show>
      </div>

      <div class='w-full mt-auto pt-8 flex justify-center'>
        <input
          type='range'
          min='0'
          value={slider()}
          onChange={() => setSlider(event.target.value)}
          class='w-11/12'
        />
        <h1>{slider()}</h1>
      </div>
    </div>
  )
}
