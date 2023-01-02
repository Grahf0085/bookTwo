import { createResource, Show } from 'solid-js'
import { createSetVisibleParagraphs } from '../../providers/ParagraphProviders.jsx'
import { fetchBookInfo } from '../../utils/nietzscheAPI.js'

export const BookInfo = (props) => {
  const setVisibleParagraphs = createSetVisibleParagraphs()

  const [fetchedBookInfo] = createResource(
    () => [props.title, props.translator],
    fetchBookInfo
  )

  return (
    <div
      ref={(el) => setVisibleParagraphs((p) => [...p, el])}
      class='w-full h-full'
    >
      <Show when={fetchedBookInfo()} fallback={<p>Loading Book Info...</p>}>
        <h1>
          {fetchedBookInfo()[0].title}: {fetchedBookInfo()[0].subTitle}
        </h1>
        <h1>{fetchedBookInfo()[0].pubDate}</h1>
        <h1>{fetchedBookInfo()[0].translatorName}</h1>
        <h1>{fetchedBookInfo()[0].translatedDate}</h1>
      </Show>
    </div>
  )
}
