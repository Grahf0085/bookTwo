import { createResource, For } from 'solid-js'
import { fetchChapterParagraphs } from '../utils/nietzscheAPI.js'

export const Paragraphs = (props) => {
  const [fetchedChapterParagraphs] = createResource(
    () => [props.title, props.translator, props.chapterNumber],
    fetchChapterParagraphs
  )

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
          class='overflow-hidden h-fit whitespace-pre-wrap max-w-full min-w-full px-20 py-2 bookParagraphs' //TODO overflow needs to be shown somehow
        >
          {paragraph.paragraphText}
        </p>
      )}
    </For>
  )
}
