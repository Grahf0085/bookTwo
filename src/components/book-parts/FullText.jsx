import { createSignal, createEffect, Show } from 'solid-js'
import { useParams } from '@solidjs/router'
import { BookInfo } from './BookInfo.jsx'
import { ChapterList } from './ChapterList.jsx'
import { Chapters } from './Chapters.jsx'
import { Slider } from './Slider.jsx'

export const FullText = (props) => {
  let fullTextRef

  const [percentScrolledToChapter, setPercentScrolledToChapter] = createSignal()
  const [translator, setTranslator] = createSignal()
  const [paragraphsLoaded, setParagraphsLoaded] = createSignal(false)
  const [allChapters, setAllChapters] = createSignal([])

  createEffect(() => {
    if (paragraphsLoaded()) fullTextRef.focus()
  })

  createEffect(() => {
    const params = useParams()
    props.setTitle(params.title)
    setTranslator(params.translator)
  })

  return (
    <div class='flex flex-col w-screen h-[88vh]'>
      <div
        class='flex flex-col flex-wrap w-[100vw] h-full no-scrollbar overflow-x-hidden'
        ref={fullTextRef}
      >
        <>
          <BookInfo title={props.title} translator={translator()} />
          <ChapterList
            title={props.title}
            translator={translator()}
            fullTextRef={fullTextRef}
            setPercentScrolledToChapter={setPercentScrolledToChapter}
            paragraphsLoaded={paragraphsLoaded()}
            allChapters={allChapters()}
          />
          <Chapters
            title={props.title}
            translator={translator()}
            setParagraphsLoaded={setParagraphsLoaded}
            setAllChapters={setAllChapters}
          />
        </>
      </div>
      <Show
        when={paragraphsLoaded() === 'ready'}
        fallback={<p>Loading Paragraphs, then Slider...</p>}
      >
        <Slider
          fullTextRef={fullTextRef}
          rootDivRef={props.rootDivRef}
          title={props.title}
          translator={translator()}
          percentScrolledToChapter={percentScrolledToChapter()}
          setPercentScrolledToChapter={setPercentScrolledToChapter}
        />
      </Show>
    </div>
  )
}
