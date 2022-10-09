import { createResource, For } from 'solid-js'
import { fetchChapterParagraphs } from '../utils/nietzscheAPI.js'

export const Paragraphs = (props) => {
  const [fetchedChapterParagraphs] = createResource(
    () => [props.title, props.translator, props.chapterNumber],
    fetchChapterParagraphs
  )

  //TODO some paragraphs longer than window.....they don't wrap
  //TODO chapters that end in letters not in right place
  //TODO disable search with browser search function

  return (
    <For each={fetchedChapterParagraphs()}>
      {(paragraph) => (
        <p
          id={
            'chapter: ' +
            paragraph.chapterNumber +
            ' ' +
            'paragraph: ' +
            paragraph.paragraphNumber
          }
          class='whitespace-pre-wrap overflow-hidden max-w-full min-w-full h-fit px-20 py-2 bookParagraphs' //TODO overflow needs to be shown somehow
        >
          {paragraph.paragraphText}
        </p>
      )}
    </For>
  )
}
