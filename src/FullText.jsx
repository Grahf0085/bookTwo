import { useSelectedBook } from './state/SelectedBookProvider.jsx'

export const FullText = () => {
  const selectedBook = useSelectedBook()

  return (
    <>
      <h1>lkijsfisdhdsuidlifadsdss {selectedBook()}</h1>
    </>
  )
}
