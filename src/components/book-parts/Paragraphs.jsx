import { createEffect, onCleanup, createResource, For } from 'solid-js'
import { fetchChapterParagraphs } from '../../utils/nietzscheAPI.js'
import { Footnotes } from './Footnotes.jsx'

export const Paragraphs = (props) => {
  const [fetchedChapterParagraphs] = createResource(
    () => [props.title, props.translator, props.chapterNumber],
    fetchChapterParagraphs
  )

  createEffect(() => {
    props.setParagraphsLoaded(fetchedChapterParagraphs.state)
  })

  onCleanup(() => {
    props.setParagraphsLoaded('unresolved')
  })

  return (
    <For each={fetchedChapterParagraphs()}>
      {(paragraph) => (
        <>
          <p
            id={
              'chapter: ' +
              paragraph.chapterNumber +
              ' ' +
              'paragraph: ' +
              paragraph.paragraphNumber
            }
            class='whitespace-pre-wrap overflow-scroll w-full px-20 py-2 overflow-x-hidden bookParagraphs'
          >
            {paragraph.paragraphText}
          </p>
          <Footnotes
            paragraphNumber={paragraph.paragraphNumber}
            chapterNumber={props.chapterNumber}
            title={props.title}
            translator={props.translator}
          />
        </>
      )}
    </For>
  )
}
