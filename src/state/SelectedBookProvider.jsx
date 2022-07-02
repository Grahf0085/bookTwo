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

export const useSelectedBook = () => {
  const selectedBook = useContext(SelectedBookContext)[0]

  const [fetchedBookInfo] = createResource(selectedBook, fetchBookInfo)
  const [fetchedBookChapters] = createResource(selectedBook, fetchBookChapters)

  return [fetchedBookInfo, fetchedBookChapters]
}

export const useSetSelectedBook = () => {
  const setSelectedBook = useContext(SelectedBookContext)[1]
  return setSelectedBook
}
