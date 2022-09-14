import { createResource, For } from 'solid-js'
// import { useParams } from 'solid-app-router'
import { fetchBookChapters } from '../utils/nietzscheAPI.js'
import { Paragraphs } from './Paragraphs.jsx'

export const Chapters = (props) => {
  const [fetchedBookChapters] = createResource(
    () => [props.title, props.translator],
    fetchBookChapters
  )

  // const params = useParams()
  //
  // const [fetchedBookChapters] = createResource(
  //   () => props.book,
  //   fetchBookChapters
  // )

  return (
    <For each={fetchedBookChapters()}>
      {(chapter) => (
        <>
          <h2 id={chapter.chapterNumber} class='px-20 font-semibold'>
            {chapter.chapterName}
          </h2>
          <Paragraphs
            chapterNumber={chapter.chapterNumber}
            title={props.title}
            translator={props.translator}
          />
          <div class='h-full' />
        </>
      )}
    </For>
  )
}
