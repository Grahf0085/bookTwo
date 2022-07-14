import { For } from 'solid-js'
import { createBookInfo } from '../providers/SelectedBookProvider.jsx'

export const BookInfo = () => {
  const bookInfo = createBookInfo()

  return (
    <For each={bookInfo()}>
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
