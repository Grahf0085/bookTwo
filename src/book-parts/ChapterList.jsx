import { createResource, For } from 'solid-js'
import { fetchBookChapters } from '../utils/nietzscheAPI.js'

export const ChapterList = (props) => {
  const [fetchedChapterInfo] = createResource(
    () => props.book,
    fetchBookChapters
  )

  return (
    <div class='w-full h-full'>
      <For each={fetchedChapterInfo()}>
        {(info) => (
          <>
            <h1>{info.chapterNumber}</h1>
            <h1>{info.chapterName}</h1>
          </>
        )}
      </For>
    </div>
  )
}
