import { createSignal, createEffect } from 'solid-js'
import { Footnotes } from './Footnotes.jsx'

export const Paragraph = (props) => {
  const [hasFootnotes, setHasFootnotes] = createSignal(false)

  createEffect(() => {
    console.log(
      'This paragraphs ' +
        props.paragraphNumber +
        'footnotes: ' +
        hasFootnotes()
    )
  })

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
      <Footnotes
        paragraphNumber={props.paragraphNumber}
        chapterNumber={props.chapterNumber}
        title={props.title}
        translator={props.translator}
        setHasFootnotes={setHasFootnotes}
      />
    </>
  )
}
