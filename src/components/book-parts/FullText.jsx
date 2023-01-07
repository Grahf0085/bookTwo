import { createSignal, createEffect, Show } from 'solid-js'
import { useParams } from '@solidjs/router'
import { BookInfo } from './BookInfo.jsx'
import { ChapterList } from './ChapterList.jsx'
import { Chapters } from './Chapters.jsx'
import { Slider } from './Slider.jsx'

export const FullText = () => {
  let fullTextRef
  let params = useParams()

  const [percentScrolledToChapter, setPercentScrolledToChapter] = createSignal()
  const [paragraphsLoaded, setParagraphsLoaded] = createSignal(false)
  const [allChapters, setAllChapters] = createSignal([])

  createEffect(() => {
    params = useParams()
  })

  createEffect(() => {
    if (paragraphsLoaded()) fullTextRef.focus()
  })

  createEffect(() => {
    setAllChapters([])
  })

  return (
    <div class='flex flex-col w-screen h-[88vh]'>
      <div
        class='flex flex-col flex-wrap w-[100vw] h-full no-scrollbar overflow-x-hidden'
        ref={fullTextRef}
      >
        <>
          <BookInfo title={params.title} translator={params.translator} />
          <ChapterList
            title={params.title}
            translator={params.translator}
            fullTextRef={fullTextRef}
            setPercentScrolledToChapter={setPercentScrolledToChapter}
            paragraphsLoaded={paragraphsLoaded()}
            allChapters={allChapters()}
          />
          <Chapters
            title={params.title}
            translator={params.translator}
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
          title={params.title}
          translator={params.translator}
          percentScrolledToChapter={percentScrolledToChapter()}
          setPercentScrolledToChapter={setPercentScrolledToChapter}
        />
      </Show>
    </div>
  )
}
