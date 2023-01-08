//TODO translator(add options to switch translator)

import { createResource, Show } from 'solid-js'
import { fetchSeeAlso } from '../../utils/nietzscheAPI.js'

export const SeeAlso = (props) => {
  const [fetchedSeeAlso] = createResource(() => props.seeAlso, fetchSeeAlso)

  return (
    <Show when={fetchedSeeAlso()} fallback={<></>}>
      <h3
        onClick={() => {
          props.setAlsoText(
            props.seeAlsoText === fetchedSeeAlso().paragraphText
              ? ''
              : fetchedSeeAlso().paragraphText
          )
        }}
        class='cursor-pointer'
      >
        <br />
        See Also: {fetchedSeeAlso().title} chapter{' '}
        {fetchedSeeAlso().chapterNumber} paragraph{' '}
        {fetchedSeeAlso().paragraphNumber}
      </h3>
    </Show>
  )
}
