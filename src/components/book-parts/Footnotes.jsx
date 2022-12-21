import { createResource, For } from 'solid-js'
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
      {(footnote) => (
        <aside
          /* style={{ top: props.mouseY, left: props.mouseX }} */
          class={`bg-hooplaLighter ${
            props.showFootnotes === true ? 'block' : 'block'
          }`}
        >
          {footnote.footnotes}
        </aside>
      )}
    </For>
  )
}
