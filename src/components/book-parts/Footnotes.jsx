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
        <h1
          class={`overflow-scroll w-full px-20 py-2 overflow-x-hidden ${
            props.showFootnotes === true ? 'block' : 'hidden'
          }`}
        >
          {footnote.footnotes}
        </h1>
      )}
    </For>
  )
}
