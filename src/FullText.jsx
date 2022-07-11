import { createSignal, createEffect, Show } from 'solid-js'
import { useSelectedBook } from './providers/SelectedBookProvider.jsx'
import { BookInfo } from './book-parts/BookInfo.jsx'
import { Chapters } from './book-parts/Chapters.jsx'
import { Paragraphs } from './book-parts/Paragraphs.jsx'

export const FullText = (props) => {
  const [slider, setSlider] = createSignal(0)

  const bookSelected = useSelectedBook()

  let myDiv
  const screenWidth = screen.width

  createEffect(() => {
    setSlider(props.pageChange)
  })

  createEffect(() => {
    if (slider() === 2 && event.which === 37) scroll(-screenWidth)
    if (slider() >= 3) {
      if (event.which === 37) scroll(-screenWidth)
      if (event.which === 39) scroll(screenWidth)
    }
  })

  const scroll = (scrollOffset) => {
    myDiv.scrollLeft += scrollOffset
  }

  return (
    <div class='flex flex-col h-[83vh] max-h-[83vh] w-screen'>
      <div
        class='overflow-y-hidden flex flex-col flex-wrap w-[100vw] max-w-[100vw] no-scrollbar'
        ref={myDiv}
      >
        <Show when={slider() <= 0}>
          <BookInfo />
        </Show>

        <Show when={slider() === 1}>
          <Chapters />
        </Show>
        <Show when={slider() >= 2}>
          <Paragraphs pageNumber={slider() - 2} />
        </Show>
      </div>

      <Show when={bookSelected()}>
        <div class='w-full mt-auto flex justify-center'>
          <input
            type='range'
            min='0'
            max='100'
            value={slider()}
            onChange={() => setSlider(event.target.value)}
            class='w-11/12'
          />
          <h1>{slider()}</h1>
        </div>
      </Show>
    </div>
  )
}
