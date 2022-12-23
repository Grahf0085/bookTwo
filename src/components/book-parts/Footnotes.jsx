import { createResource, For, Show } from 'solid-js'
import { fetchFootnotes } from '../../utils/nietzscheAPI.js'

export const Footnotes = (props) => {
  const [fetchedFootnotes] = createResource(
    () => [
      props.title,
      props.translator,
      props.chapterNumber,
      props.paragraphNumber,
    ],
    fetchFootnotes
  )

  return (
    <For each={fetchedFootnotes()}>
      {(footnote, index) => (
        <Show
          when={props.showFootnotes === true && index() === props.footnoteCount}
        >
          <aside class='bg-hooplaLighter'>{footnote.footnotes}</aside>
        </Show>
      )}
    </For>
  )
}
