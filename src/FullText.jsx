import { Show } from 'solid-js'
import { createSelectedBook } from './providers/SelectedBookProvider.jsx'
import { BookInfo } from './book-parts/BookInfo.jsx'
import { ChapterList } from './book-parts/ChapterList.jsx'
import { Chapters } from './book-parts/Chapters.jsx'

export const FullText = (props) => {
  const bookSelected = createSelectedBook()

  return (
    <div class='flex flex-col h-[83vh] max-h-[83vh] w-screen pointer-events-none'>
      <div
        class='overflow-y-hidden flex flex-col flex-wrap w-[100vw] max-w-[100vw] no-scrollbar'
        ref={props.ref}
      >
        <Show when={bookSelected()} fallback={<div>Please Select A Book</div>}>
          <>
            <BookInfo />
            <ChapterList />
            <Chapters pageNumber={props.page} />
          </>
        </Show>
      </div>
    </div>
  )
}
