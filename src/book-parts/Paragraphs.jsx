import { For } from 'solid-js'
import { useParagraphInfo } from '../providers/SelectedBookProvider.jsx'

export const Paragraphs = (props) => {
  const paragraphInfo = useParagraphInfo()

  //TODO is there a way besides 80vh?
  return (
    <For each={paragraphInfo()}>
      {(paragraph) => (
        <p class='whitespace-pre-wrap w-fit max-w-full min-w-full h-fit px-20 pb-2.5 pt-5'>
          {props.chapter === paragraph.chapterNumber && paragraph.paragraphText}
        </p>
      )}
    </For>
  )
}
