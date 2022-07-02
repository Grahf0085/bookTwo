import { For } from 'solid-js'
import { useSelectedBook } from './state/SelectedBookProvider.jsx'

export const FullText = () => {
  const bookInfo = useSelectedBook()[0]
  const chapterInfo = useSelectedBook()[1]

  return (
    <>
      <For each={bookInfo()} fallback={<div>Select a Book</div>}>
        {(info) => (
          <>
            <h1>{info.title}</h1>
            <h1>{info.pubDate}</h1>
            <h1>{info.translatorName}</h1>
            <h1>{info.translatedDate}</h1>
          </>
        )}
      </For>
      <For each={chapterInfo()} fallback={<div>FML</div>}>
        {(info) => (
          <>
            <h1>{info.chapterNumber}</h1>
            <h1>{info.chapterName}</h1>
          </>
        )}
      </For>
    </>
  )
}
