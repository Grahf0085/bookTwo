import { createSignal, createEffect } from 'solid-js'
import { useParams } from 'solid-app-router'
import { BookInfo } from './book-parts/BookInfo.jsx'
import { ChapterList } from './book-parts/ChapterList.jsx'
import { Chapters } from './book-parts/Chapters.jsx'
import { Slider } from './Slider.jsx'

export const FullText = (props) => {
  let params
  let paramsBook
  let fullTextRef

  const [book, setBook] = createSignal()
  const [percentScrolledToChapter, setPercentScrolledToChapter] = createSignal()

  createEffect(() => {
    params = useParams()
    paramsBook = params.title + '+' + params.translator
    setBook(paramsBook)
  })

  return (
    <div class='flex flex-col h-[88vh] max-h-[88vh] min-h-[88vh] w-screen pointer-events-none'>
      <div
        class='overflow-y-hidden flex flex-col flex-wrap w-[100vw] max-w-[100vw] no-scrollbar'
        ref={fullTextRef}
      >
        <>
          <BookInfo book={book()} />
          <ChapterList book={book()} fullTextRef={fullTextRef} setPercentScrolledToChapter={setPercentScrolledToChapter} />
          <Chapters book={book()} />
        </>
      </div>
      <Slider
        fullTextRef={fullTextRef}
        rootDivRef={props.rootDivRef}
        book={book}
        percentScrolledToChapter={percentScrolledToChapter()}
      />
    </div>
  )
}
