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
      {(footnote) => <h1>Notes: {footnote.footnotes}</h1>}
    </For>
  )
}
