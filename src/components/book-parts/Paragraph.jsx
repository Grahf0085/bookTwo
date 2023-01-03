//dynamically adding span into <p> element at right place implemented with much appreciated assistance from https://github.com/0kku

import { For } from 'solid-js'
import { createSetVisibleParagraphs } from '../../providers/ParagraphProviders.jsx'
import { NoteSpan } from './NoteSpan.jsx'

export const Paragraph = (props) => {
  let footnoteCount = -1

  const setVisibleParagraphs = createSetVisibleParagraphs()

  return (
    <>
      <p
        ref={(el) => setVisibleParagraphs((p) => [...p, el])}
        class='whitespace-pre-wrap overflow-scroll w-full h-full px-20 py-2 overflow-x-hidden'
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
    </>
  )
}
