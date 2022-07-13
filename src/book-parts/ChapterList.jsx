import { For } from 'solid-js'
import { useChapterInfo } from '../providers/SelectedBookProvider.jsx'

export const ChapterList = () => {
  const chapterInfo = useChapterInfo()

  return (
    <div class='h-full'>
      <For each={chapterInfo()} fallback={<div>Select a Book</div>}>
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
