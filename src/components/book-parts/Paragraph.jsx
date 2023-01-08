//dynamically adding span into <p> element at right place implemented with much appreciated assistance from https://github.com/0kku

import { createSignal, For, Show } from 'solid-js'
import { createSetVisibleParagraphs } from '../../providers/ParagraphProviders.jsx'
import { NoteSpan } from './NoteSpan.jsx'
import { SeeAlso } from './SeeAlso.jsx'

export const Paragraph = (props) => {
  let footnoteCount = -1

  const [seeAlsoText, setAlsoText] = createSignal('')

  const setVisibleParagraphs = createSetVisibleParagraphs()

  return (
    <div class='h-min overflow-x-hidden flex'>
      <p
        ref={(el) => setVisibleParagraphs((p) => [...p, el])}
        class={`whitespace-pre-wrap overflow-scroll h-full px-20 py-2 overflow-x-hidden ${
          seeAlsoText() ? 'w-2/3' : 'w-full'
        }`}
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
        <For each={props.seeAlsoArray} fallback={<></>}>
          {(seeAlso) => (
            <SeeAlso
              seeAlso={seeAlso}
              seeAlsoText={seeAlsoText()}
              setAlsoText={setAlsoText}
            />
          )}
        </For>
      </p>
      <Show when={seeAlsoText() !== ''}>
        <div class='w-1/3'>
          <button onClick={() => setAlsoText('')}>Close</button>
          <p>{seeAlsoText()}</p>
        </div>
      </Show>
    </div>
  )
}
