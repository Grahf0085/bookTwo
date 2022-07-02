import { For } from 'solid-js'
import { useChapterInfo } from './state/SelectedBookProvider.jsx'

export const ChapterInfo = () => {
  const chapterInfo = useChapterInfo()

  return (
    <For each={chapterInfo()} fallback={<div>Select a Chapter</div>}>
      {(info) => (
        <>
          <h1>{info.chapterNumber}</h1>
          <h1>{info.chapterName}</h1>
        </>
      )}
    </For>
  )
}
