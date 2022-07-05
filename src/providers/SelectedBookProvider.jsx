import {
  createSignal,
  createContext,
  useContext,
  createResource,
} from 'solid-js'
import {
  fetchBookInfo,
  fetchBookChapters,
  fetchBookParagraphs,
} from '../../nietzscheAPI.js'

const SelectedBookContext = createContext()

export const SelectedBookProvider = (props) => {
  const [selectedBook, setSelectedBook] = createSignal(''),
    store = [selectedBook, setSelectedBook]

  return (
    <SelectedBookContext.Provider value={store}>
      {props.children}
    </SelectedBookContext.Provider>
  )
}

export const useSelectedBook = () => {
  // console.log('what im looking for: ', useContext(SelectedBookContext)[0])
  const selectedBook = useContext(SelectedBookContext)[0]
  return selectedBook
}

export const useSetSelectedBook = () => {
  const setSelectedBook = useContext(SelectedBookContext)[1]
  return setSelectedBook
}

export const useBookInfo = () => {
  const selectedBook = useContext(SelectedBookContext)[0]

  const [fetchedBookInfo] = createResource(selectedBook, fetchBookInfo)

  return fetchedBookInfo
}

export const useChapterInfo = () => {
  const selectedBook = useContext(SelectedBookContext)[0]

  const [fetchedBookChapters] = createResource(selectedBook, fetchBookChapters)

  return fetchedBookChapters
}

export const useParagraphInfo = () => {
  const selectedBook = useContext(SelectedBookContext)[0]

  const [fetchedBookParagraphs] = createResource(
    selectedBook,
    fetchBookParagraphs
  )

  return fetchedBookParagraphs
}
