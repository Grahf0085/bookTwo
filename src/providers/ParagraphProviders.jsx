import { createSignal, createContext, useContext } from 'solid-js'

export const VisibleParagraphsContext = createContext()

export const VisibleParagraphsProvider = (props) => {
  const [visibleParagraphs, setVisibleParagraphs] = createSignal([])

  return (
    <VisibleParagraphsContext.Provider
      value={[visibleParagraphs, setVisibleParagraphs]}
    >
      {props.children}
    </VisibleParagraphsContext.Provider>
  )
}

export const createVisibleParagraphs = () => {
  const visibleParagraphs = useContext(VisibleParagraphsContext)[0]
  return visibleParagraphs
}

export const createSetVisibleParagraphs = () => {
  const setVisibleParagraphs = useContext(VisibleParagraphsContext)[1]
  return setVisibleParagraphs
}
