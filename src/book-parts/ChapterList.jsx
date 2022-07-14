import { For } from 'solid-js'
import { createChapterInfo } from '../providers/SelectedBookProvider.jsx'

export const ChapterList = () => {
  const chapterInfo = createChapterInfo()

  return (
    <div class='w-full h-full'>
      <For each={chapterInfo()}>
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
