import { createEffect, Show } from 'solid-js'
import { createSelectedBook } from './providers/SelectedBookProvider.jsx'
import { createWindowWidth } from './createWindowWidth.jsx'
import { createScrollWidth } from './createScrollWidth.jsx'

export const Slider = (props) => {
  let sliderRef
  let windowWidth
  let scrollWidth
  let maxScroll

  const bookSelected = createSelectedBook()

  createEffect((prev) => {
    const book = bookSelected()
    if (book !== prev) props.onPageChange(0)
    return book
  }, '')

  createEffect(() => {
    windowWidth = createWindowWidth()
  })

  createEffect(() => {
    if (bookSelected())
      setTimeout(() => {
        scrollWidth = createScrollWidth(props.fullTextRef)
        maxScroll = scrollWidth() / windowWidth() - 1
        props.onMaxScrollChange(maxScroll)
        sliderRef.setAttribute('max', maxScroll)
      }, 1000)
  })

  createEffect((prev) => {
    let currentSlider = props.page
    if (currentSlider > prev) scroll(windowWidth() * (currentSlider - prev))
    if (currentSlider < prev) scroll(-windowWidth() * (prev - currentSlider))
    return currentSlider
  })

  const scroll = (scrollOffset) => {
    props.fullTextRef.scrollLeft += scrollOffset
  }

  return (
    <Show when={bookSelected()}>
      <div class='flex justify-center'>
        <input
          ref={sliderRef}
          type='range'
          value={props.page}
          onKeyDown={() => event.preventDefault()}
          onChange={() => {
            props.onPageChange(parseInt(event.target.value))
          }}
          class='w-11/12'
        />
        <h1>{props.page}</h1>
      </div>
    </Show>
  )
}
