import { createSignal, createEffect, Show } from 'solid-js'
import { useSelectedBook } from './providers/SelectedBookProvider.jsx'
import { BookInfo } from './book-parts/BookInfo.jsx'
import { Chapters } from './book-parts/Chapters.jsx'
import { Paragraphs } from './book-parts/Paragraphs.jsx'

export const FullText = (props) => {
  const [slider, setSlider] = createSignal(0)

  const bookSelected = useSelectedBook()

  let myDiv

  createEffect(() => {
    setSlider(props.pageChange)
  })

  const scroll = (scrollOffset) => {
    myDiv.scrollLeft += scrollOffset
  }
  return (
    <div class='flex flex-col flex-1 h-[83vh] max-h-[83vh] md:mx-2 w-fit'>
      <div
        class='overflow-y-hidden flex flex-col flex-wrap flex-1 w-fit'
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
      <button onClick={() => scroll(-1504)}>LEFT</button>
      <button onClick={() => scroll(1504)}>RIGHT</button>
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
