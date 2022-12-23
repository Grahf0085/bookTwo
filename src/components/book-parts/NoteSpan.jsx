import { createSignal } from 'solid-js'
import { Footnotes } from './Footnotes'

export const NoteSpan = (props) => {
  const [showFootnotes, setShowFootnotes] = createSignal(false)

  return (
    <>
      <span
        style={{ 'font-weight': 'bold', cursor: 'pointer' }}
        onClick={() => {
          setShowFootnotes(!showFootnotes())
        }}
      >
        {props.word}
      </span>
      <Footnotes
        paragraphNumber={props.paragraphNumber}
        chapterNumber={props.chapterNumber}
        title={props.title}
        translator={props.translator}
        showFootnotes={showFootnotes()}
        footnoteCount={props.footnoteCount}
      />
    </>
  )
}
