import { createEffect, onCleanup, createResource, For } from 'solid-js'
import { fetchChapterParagraphs } from '../../utils/nietzscheAPI.js'
import { Paragraph } from './Paragraph.jsx'
import { SeeAlso } from './SeeAlso.jsx'

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
        <div class='overflow-x-hidden h-full'>
          <Paragraph
            text={paragraph.paragraphText.split(' ')}
            chapterNumber={paragraph.chapterNumber}
            paragraphNumber={paragraph.paragraphNumber}
            title={props.title}
            translator={props.translator}
            paragraph={props.paragraph}
          />
          <For each={paragraph.seeAlso} fallback={<></>}>
            {(seeAlso) => <SeeAlso seeAlso={seeAlso} />}
          </For>
        </div>
      )}
    </For>
  )
}
