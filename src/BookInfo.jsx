import { For } from 'solid-js'
import { useBookInfo } from './state/SelectedBookProvider.jsx'

export const BookInfo = () => {
  const bookInfo = useBookInfo()

  return (
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
  )
}
