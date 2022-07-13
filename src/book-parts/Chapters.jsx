//TODO get page number from props(already passed down)

import { For } from 'solid-js'
import { Paragraphs } from './Paragraphs.jsx'
import { useChapterInfo } from '../providers/SelectedBookProvider.jsx'

export const Chapters = () => {
  const chapterInfo = useChapterInfo()

  return (
    <For each={chapterInfo()}>
      {(chapter) => (
        <>
          <h2>{chapter.chapterName}</h2>
          <Paragraphs chapter={chapter.chapterNumber} />
        </>
      )}
    </For>
  )
}
