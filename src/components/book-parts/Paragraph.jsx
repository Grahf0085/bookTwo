//dynamically adding span into <p> element at right place implemented with much appreciated assistance from https://github.com/0kku

import { createSignal, onMount } from 'solid-js'
import { Footnotes } from './Footnotes.jsx'

export const Paragraph = (props) => {
  const [showFootnotes, setShowFootnotes] = createSignal(false)
  const [mouseX, setMouseX] = createSignal(0)
  const [mouseY, setMouseY] = createSignal(0)

  let currentParagraph

  onMount(() => {
    const words = currentParagraph.innerHTML.split(' ')

    words.forEach((word) => {
      if (word.match(/.+[⁰¹²³⁴⁵⁶⁷⁸⁹]+/giu)) {
        const newSpan = document.createElement('span')
        let endIndex
        for (let value of word) {
          if (value.match(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/)) endIndex = word.lastIndexOf(value)
        }
        newSpan.textContent = word.substring(0, endIndex + 1)
        newSpan.setAttribute('style', 'font-weight: bold; cursor: pointer;')
        currentParagraph.innerHTML = currentParagraph.innerHTML.replace(
          word,
          newSpan.outerHTML
        )

        currentParagraph.addEventListener('click', (event) => {
          if (event.target.tagName === 'SPAN') {
            setShowFootnotes(!showFootnotes())
            const nav = document.querySelector('nav')
            setMouseX(Math.ceil(newSpan.getBoundingClientRect().left) + 'px')
            setMouseY(
              Math.ceil(newSpan.getBoundingClientRect().top) -
                nav.scrollHeight +
                5 +
                'px'
            )
          }
        })
      }
    })
  })

  return (
    <div class='relative'>
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
        mouseX={mouseX()}
        mouseY={mouseY()}
      />
    </div>
  )
}
