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
        <div
          id={'chapter: book-info paragraph: not applicable.'}
          class='w-full h-full bookParagraphs'
        >
          <h1>{info.title}</h1>
          <h1>{info.pubDate}</h1>
          <h1>{info.translatorName}</h1>
          <h1>{info.translatedDate}</h1>
        </div>
      )}
    </For>
  )
}
