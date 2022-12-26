import { createSignal, createContext, useContext } from 'solid-js'

export const AllParagraphsContext = createContext()

export const AllParagraphsProvider = (props) => {
  const [allParagraphs, setAllParagraphs] = createSignal([])

  return (
    <AllParagraphsContext.Provider value={[allParagraphs, setAllParagraphs]}>
      {props.children}
    </AllParagraphsContext.Provider>
  )
}

export const createAllParagraphs = () => {
  const allParagraphs = useContext(AllParagraphsContext)[0]
  return allParagraphs
}

export const createSetAllParagraphs = () => {
  const setAllParagraphs = useContext(AllParagraphsContext)[1]
  return setAllParagraphs
}
