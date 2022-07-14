//TODO get page number from props(already passed down)

import { For } from 'solid-js'
import { Paragraphs } from './Paragraphs.jsx'
import { createChapterInfo } from '../providers/SelectedBookProvider.jsx'

export const Chapters = () => {
  const chapterInfo = createChapterInfo()

  return (
    <For each={chapterInfo()}>
      {(chapter) => (
        <>
          <h2 class='px-20 pb-3'>{chapter.chapterName}</h2>
          <Paragraphs chapter={chapter.chapterNumber} />
        </>
      )}
    </For>
  )
}
