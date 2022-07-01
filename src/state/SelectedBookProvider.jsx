import {
  createSignal,
  createContext,
  useContext,
  // createEffect,
  createResource,
} from 'solid-js'
import { fetchBookInfo } from '../../nietzscheAPI.js'

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

  return fetchedBookInfo
}

export const useSetSelectedBook = () => {
  const setSelectedBook = useContext(SelectedBookContext)[1]
  return setSelectedBook
}

// export const useFetchedBookInfo = () => {
//   const fetchedBookInfo = useContext(SelectedBookContext)[2]
//   return fetchedBookInfo
// }
