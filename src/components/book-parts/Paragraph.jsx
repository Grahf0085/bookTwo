//dynamically adding span into <p> element at right place implemented with much appreciated assistance from https://github.com/0kku

import { For } from 'solid-js'
import { NoteSpan } from './NoteSpan.jsx'

export const Paragraph = (props) => {
  let footnoteCount = -1

  return (
    <div class='relative'>
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
        <For each={props.text}>
          {(word) => {
            if (word.match(/.+[⁰¹²³⁴⁵⁶⁷⁸⁹]+/gu)) {
              let endIndex
              for (let value of word) {
                if (value.match(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/))
                  endIndex = word.lastIndexOf(value)
              }
              const wordWithFootnote = word.substring(0, endIndex + 1)
              const restOfWord = word.substring(endIndex + 1)
              footnoteCount++
              return (
                <NoteSpan
                  footnoteCount={footnoteCount}
                  word={wordWithFootnote}
                  restOfWord={restOfWord}
                  paragraphNumber={props.paragraphNumber}
                  chapterNumber={props.chapterNumber}
                  title={props.title}
                  translator={props.translator}
                />
              )
            }
            return word + ' '
          }}
        </For>
      </p>
    </div>
  )
}
