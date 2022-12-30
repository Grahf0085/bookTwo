import { createResource, Show } from 'solid-js'
import { createSetAllParagraphs } from '../../providers/ParagraphProviders.jsx'
import { fetchBookInfo } from '../../utils/nietzscheAPI.js'

export const BookInfo = (props) => {
  const setAllParagraphs = createSetAllParagraphs()

  const [fetchedBookInfo] = createResource(
    () => [props.title, props.translator],
    fetchBookInfo
  )

  return (
    <div
      ref={(el) => setAllParagraphs((p) => [...p, el])}
      class='w-full h-full'
    >
      <Show when={fetchedBookInfo()} fallback={<p>Loading Book Info...</p>}>
        <h1>{fetchedBookInfo()[0].title}</h1>
        <h1>{fetchedBookInfo()[0].pubDate}</h1>
        <h1>{fetchedBookInfo()[0].translatorName}</h1>
        <h1>{fetchedBookInfo()[0].translatedDate}</h1>
      </Show>
    </div>
  )
}
