import { createSignal, createResource, Show } from 'solid-js'
import { fetchSeeAlso } from '../../utils/nietzscheAPI.js'
/* import { FullText } from './FullText.jsx' */

export const SeeAlso = (props) => {
  const [showSeeAlso, setShowSeeAlso] = createSignal(false)

  const [fetchedSeeAlso] = createResource(() => props.seeAlso, fetchSeeAlso)

  return (
    <>
      <Show when={fetchedSeeAlso()} fallback={<></>}>
        <h3
          onClick={() => setShowSeeAlso(!showSeeAlso())}
          class='cursor-pointer'
        >
          See Also: {fetchedSeeAlso().title} translated by{' '}
          {fetchedSeeAlso().translatorName} chapter{' '}
          {fetchedSeeAlso().chapterNumber} paragraph{' '}
          {fetchedSeeAlso().paragraphNumber}
        </h3>
      </Show>
    </>
  )
}
