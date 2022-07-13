import { For, Show } from 'solid-js'
import { useParagraphInfo } from '../providers/SelectedBookProvider.jsx'

export const Paragraphs = (props) => {
  const paragraphInfo = useParagraphInfo()

  //TODO is there a way besides 80vh?
  return (
    <For each={paragraphInfo()}>
      {(paragraph) => (
        <Show when={props.chapter === paragraph.chapterNumber}>
          <p class='whitespace-pre-wrap w-fit max-w-full min-w-full h-fit px-20 pb-3'>
            {paragraph.paragraphText}
          </p>
        </Show>
      )}
    </For>
  )
}
