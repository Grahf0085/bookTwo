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
              footnoteCount++
              return (
                <NoteSpan
                  footnoteCount={footnoteCount}
                  word={word}
                  paragraphNumber={props.paragraphNumber}
                  chapterNumber={props.chapterNumber}
                  title={props.title}
                  translator={props.translator}
                />
                // <>
                //   <span
                //     id={footnoteCount}
                //     style={{ 'font-weight': 'bold', cursor: 'pointer' }}
                //     onClick={(event) => {
                //       setShowFootnotes(!showFootnotes())
                //       setFootnoteClicked(event.target.id)
                //     }}
                //   >
                //     {word}
                //   </span>
                //   <Footnotes
                //     paragraphNumber={props.paragraphNumber}
                //     chapterNumber={props.chapterNumber}
                //     title={props.title}
                //     translator={props.translator}
                //     showFootnotes={showFootnotes()}
                //     footnoteCount={footnoteCount}
                //     footnoteClicked={footnoteClicked()}
                //   />
                // </>
              )
            }
            return word + ' '
          }}
        </For>
      </p>
    </div>
  )
}
