import { For } from 'solid-js'
import { useParagraphInfo } from '../providers/SelectedBookProvider.jsx'
//TODO get page number from props(already passed down)
export const Paragraphs = () => {
  const paragraphInfo = useParagraphInfo()
  //TODO is there a way besides 80vh?
  return (
    <For each={paragraphInfo()}>
      {(paragraph) => (
        <p class='whitespace-pre-wrap w-fit max-w-full min-w-full h-fit px-20'>
          {paragraph.paragraphText}
        </p>
      )}
    </For>
  )
}
