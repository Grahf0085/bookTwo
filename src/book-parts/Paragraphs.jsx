import { For, Show } from 'solid-js'
import { createParagraphInfo } from '../providers/SelectedBookProvider.jsx'

export const Paragraphs = (props) => {
  const paragraphInfo = createParagraphInfo()

  //TODO some paragraphs longer than window.....they don't wrap
  //TODO spacing between paragraphs
  //TODO chapters that end in letters not in right place
  return (
    <For each={paragraphInfo()}>
      {(paragraph) => (
        <Show when={props.chapter === paragraph.chapterNumber}>
          <p class='whitespace-pre-wrap max-w-full min-w-full h-fit px-20'>
            {paragraph.paragraphText}
          </p>
        </Show>
      )}
    </For>
  )
}
