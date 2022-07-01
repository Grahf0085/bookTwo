import { For } from 'solid-js'
import { useSelectedBook } from './state/SelectedBookProvider.jsx'

export const FullText = () => {
  const selectedBook = useSelectedBook()

  return (
    <For each={selectedBook()} fallback={<div>Searching...</div>}>
      {(item) => <h1>{item}</h1>}
    </For>
  )
}
