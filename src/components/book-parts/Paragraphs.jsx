import { createEffect, onCleanup, createResource, For } from 'solid-js'
import { fetchChapterParagraphs } from '../../utils/nietzscheAPI.js'
import { Paragraph } from './Paragraph.jsx'

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
        <Paragraph
          text={paragraph.paragraphText.split(' ')}
          chapterNumber={paragraph.chapterNumber}
          paragraphNumber={paragraph.paragraphNumber}
          title={props.title}
          translator={props.translator}
          paragraph={props.paragraph}
        />
      )}
    </For>
  )
}
