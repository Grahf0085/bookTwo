//dynamically adding span into <p> element at right place implemented with much appreciated assistance from https://github.com/0kku

import { createSignal, onMount } from 'solid-js'
import { Footnotes } from './Footnotes.jsx'

export const Paragraph = (props) => {
  const [showFootnotes, setShowFootnotes] = createSignal(false)

  onMount(() => {
    const currentP = document.getElementById(
      'chapter: ' +
        props.chapterNumber +
        ' ' +
        'paragraph: ' +
        props.paragraphNumber
    )

    const words = currentP.innerHTML.split(' ')

    words.forEach((word) => {
      if (word.match(/[A-Za-z]+[⁰¹²³⁴⁵⁶⁷⁸⁹]+/giu)) {
        const splitParagraph = currentP.innerHTML.split(word)
        const newSpan = document.createElement('span')
        newSpan.textContent = word
        newSpan.addEventListener('click', () => {
          setShowFootnotes(!showFootnotes())
        })
        newSpan.setAttribute('style', 'font-weight: bold; cursor: pointer;')
        currentP.innerHTML = ''
        currentP.appendChild(document.createTextNode(splitParagraph[0]))
        currentP.appendChild(newSpan)
        currentP.appendChild(document.createTextNode(splitParagraph[1]))
      }
    })
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
        class={`whitespace-pre-wrap overflow-scroll w-full px-20 py-2 overflow-x-hidden bookParagraphs`}
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
