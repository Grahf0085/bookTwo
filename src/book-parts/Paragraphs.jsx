import { For } from 'solid-js'
import { useParagraphInfo } from '../providers/SelectedBookProvider.jsx'

export const Paragraphs = () => {
  const paragraphInfo = useParagraphInfo()

  //TODO is there a way besides 80vh?
  return (
    <For each={paragraphInfo()}>
      {(paragraph) => (
        <p class='whitespace-pre-wrap w-screen max-w-[99vw] h-fit'>
          {paragraph.paragraphText}
        </p>
      )}
    </For>
  )
}
