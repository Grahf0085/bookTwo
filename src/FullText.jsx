import { createSignal, createEffect, Show } from 'solid-js'
import { useSelectedBook } from './providers/SelectedBookProvider.jsx'
import { BookInfo } from './book-parts/BookInfo.jsx'
import { Chapters } from './book-parts/Chapters.jsx'

export const FullText = (props) => {
  const [slider, setSlider] = createSignal(0)

  const bookSelected = useSelectedBook()

  createEffect(() => {
    setSlider(props.pageChange)
  })

  return (
    <div class='h-4/5'>
      <Show when={slider() <= 0}>
        <BookInfo />
      </Show>

      <Show when={slider() === 1}>
        <Chapters />
      </Show>

      <Show when={bookSelected()}>
        <div class='w-screen flex justify-center'>
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
