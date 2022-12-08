import { createSignal } from 'solid-js'
import { HiOutlineAnnotation } from 'solid-icons/hi'
import { Footnotes } from './Footnotes.jsx'

export const Paragraph = (props) => {
  const [hasFootnotes, setHasFootnotes] = createSignal(false)
  const [showFootnotes, setShowFootnotes] = createSignal(false)

  const handleParagraph = () => setShowFootnotes(!showFootnotes())

  return (
    <>
      <p
        id={
          'chapter: ' +
          props.chapterNumber +
          ' ' +
          'paragraph: ' +
          props.paragraphNumber
        }
        class='whitespace-pre-wrap overflow-scroll w-full px-20 py-2 overflow-x-hidden bookParagraphs'
      >
        {props.text}
      </p>
      {hasFootnotes() ? (
        <HiOutlineAnnotation onClick={() => handleParagraph()} />
      ) : (
        <></>
      )}
      <Footnotes
        paragraphNumber={props.paragraphNumber}
        chapterNumber={props.chapterNumber}
        title={props.title}
        translator={props.translator}
        setHasFootnotes={setHasFootnotes}
        showFootnotes={showFootnotes()}
      />
    </>
  )
}
