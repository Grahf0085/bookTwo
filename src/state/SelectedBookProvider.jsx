import {
  createSignal,
  createContext,
  useContext,
  createResource,
} from 'solid-js'
import { fetchBookInfo, fetchBookChapters } from '../../nietzscheAPI.js'

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
