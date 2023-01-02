import { createResource, Show } from 'solid-js'
import { fetchSeeAlso } from '../../utils/nietzscheAPI.js'

export const SeeAlso = (props) => {
  const [fetchedSeeAlso] = createResource(() => props.seeAlso, fetchSeeAlso)

  const handleSeeAlso = () => {
    console.log('hi')
  }

  return (
    <Show when={fetchedSeeAlso()} fallback={<></>}>
      <h3 onClick={[handleSeeAlso]}>
        See Also: {fetchedSeeAlso().title} translated by{' '}
        {fetchedSeeAlso().translatorName} chapter{' '}
        {fetchedSeeAlso().chapterNumber} paragraph{' '}
        {fetchedSeeAlso().paragraphNumber}
      </h3>
    </Show>
  )
}
