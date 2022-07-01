import { createSignal, createContext, useContext } from 'solid-js'

const SelectedBookContext = createContext()

export const SelectedBookProvider = (props) => {
  const [selectedBook, setSelectedBook] = createSignal('SOME BOOK'),
    store = [selectedBook, setSelectedBook]

  return (
    <SelectedBookContext.Provider value={store}>
      {props.children}
    </SelectedBookContext.Provider>
  )
}

export const useSelectedBook = () => {
  const selectedBook = useContext(SelectedBookContext)[0]
  return selectedBook
}

export const useSetSelectedBook = () => {
  const setSelectedBook = useContext(SelectedBookContext)[1]
  return setSelectedBook
}
