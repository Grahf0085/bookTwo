import { createResource, For } from 'solid-js'
import { fetchBookInfo } from '../utils/nietzscheAPI.js'

export const BookInfo = (props) => {
  const [fetchedBookInfo] = createResource(
    () => [props.title, props.translator],
    fetchBookInfo
  )

  return (
    <For each={fetchedBookInfo()}>
      {(info) => (
        <div class='w-full h-full'>
          <h1>{info.title}</h1>
          <h1>{info.pubDate}</h1>
          <h1>{info.translatorName}</h1>
          <h1>{info.translatedDate}</h1>
        </div>
      )}
    </For>
  )
}
