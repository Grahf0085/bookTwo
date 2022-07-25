import { createResource, For, Show } from 'solid-js'
import { fetchBookParagraphs } from '../utils/nietzscheAPI.js'

export const Paragraphs = (props) => {
  const [fetchedBookParagraphs] = createResource(
    () => props.book,
    fetchBookParagraphs
  )

  //TODO some paragraphs longer than window.....they don't wrap
  //TODO spacing between paragraphs
  //TODO chapters that end in letters not in right place
  //TODO disable search with browser search function
  return (
    <For each={fetchedBookParagraphs()}>
      {(paragraph) => (
        <Show when={props.chapterNumber === paragraph.chapterNumber}>
          <p class='whitespace-pre-wrap max-w-full min-w-full h-fit px-20'>
            {paragraph.paragraphText}
          </p>
        </Show>
      )}
    </For>
  )
}
