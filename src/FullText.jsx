import { createSignal, createEffect } from 'solid-js'
import { useParams } from 'solid-app-router'
import { BookInfo } from './book-parts/BookInfo.jsx'
import { ChapterList } from './book-parts/ChapterList.jsx'
import { Chapters } from './book-parts/Chapters.jsx'
import { Slider } from './Slider.jsx'

export const FullText = (props) => {
  let fullTextRef

  const [percentScrolledToChapter, setPercentScrolledToChapter] = createSignal()
  const [title, setTitle] = createSignal()
  const [translator, setTranslator] = createSignal()

  createEffect(() => {
    const params = useParams()
    setTitle(params.title)
    setTranslator(params.translator)
    props.setSelectedTitle(params.title)
  })

  return (
    <div class='flex flex-col h-[88vh] max-h-[88vh] min-h-[88vh] w-screen pointer-events-none'>
      <div
        class='overflow-y-hidden flex flex-col flex-wrap w-[100vw] max-w-[100vw] no-scrollbar'
        ref={fullTextRef}
      >
        <>
          <BookInfo title={title()} translator={translator()} />
          <ChapterList
            title={title()}
            translator={translator()}
            fullTextRef={fullTextRef}
            setPercentScrolledToChapter={setPercentScrolledToChapter}
          />
          <Chapters title={title()} translator={translator()} />
        </>
      </div>
      <Slider
        fullTextRef={fullTextRef}
        rootDivRef={props.rootDivRef}
        title={title()}
        translator={translator()}
        percentScrolledToChapter={percentScrolledToChapter()}
      />
    </div>
  )
}
