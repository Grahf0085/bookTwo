import { createSignal, createEffect } from 'solid-js'
import { useParams } from '@solidjs/router'
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
    <div class='flex flex-col w-screen h-[88vh]'>
      <div
        class='flex flex-col flex-wrap w-[100vw] h-full no-scrollbar overflow-x-hidden'
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
