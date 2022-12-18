//dynamically adding span into <p> element at right place implemented with much appreciated assistance from https://github.com/0kku

import { createSignal, onMount } from 'solid-js'
import { Footnotes } from './Footnotes.jsx'

export const Paragraph = (props) => {
  const [showFootnotes, setShowFootnotes] = createSignal(false)
  let currentParagraph

  onMount(() => {
    const words = currentParagraph.innerHTML.split(' ')

    words.forEach((word) => {
      if (word.match(/[A-Za-z]+[⁰¹²³⁴⁵⁶⁷⁸⁹]+/giu)) {
        const splitParagraph = currentParagraph.innerHTML.split(word)
        const newSpan = document.createElement('span')
        newSpan.textContent = word
        newSpan.addEventListener('click', () => {
          setShowFootnotes(!showFootnotes())
        })
        newSpan.setAttribute('style', 'font-weight: bold; cursor: pointer;')
        currentParagraph.replaceChildren(
          splitParagraph[0],
          newSpan,
          splitParagraph[1]
        )
      }
    })
  })

  return (
    <>
      <p
        ref={currentParagraph}
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
        showFootnotes={showFootnotes()}
      />
    </>
  )
}
