import { createEffect, createResource, For } from 'solid-js'
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

  createEffect(() =>
    fetchedFootnotes().length > 0
      ? props.setHasFootnotes(true)
      : props.setHasFootnotes(false)
  )

  return (
    <For each={fetchedFootnotes()}>
      {(footnote) => <h1>Footnotes: {footnote.footnotes}</h1>}
    </For>
  )
}
