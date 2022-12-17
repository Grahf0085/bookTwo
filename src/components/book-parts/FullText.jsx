import { createSignal, createEffect, Show } from 'solid-js'
import { useParams } from '@solidjs/router'
import { BookInfo } from './BookInfo.jsx'
import { ChapterList } from './ChapterList.jsx'
import { Chapters } from './Chapters.jsx'
import { Slider } from './Slider.jsx'

export const FullText = (props) => {
  let fullTextRef

  /* const word = '[A-Za-z]+.[⁰¹²³⁴⁵⁶⁷⁸⁹]+' */
  const [percentScrolledToChapter, setPercentScrolledToChapter] = createSignal()
  const [title, setTitle] = createSignal()
  const [translator, setTranslator] = createSignal()
  const [paragraphsLoaded, setParagraphsLoaded] = createSignal(false)

  /* function getTextNodes(node) { */
  /*   const walker = document.createTreeWalker(node) */
  /*   const nodes = [] */
  /*   let currentNode = walker.currentNode */
  /*   do { */
  /*     if (currentNode.nodeType === Node.TEXT_NODE) { */
  /*       nodes.push(currentNode) */
  /*     } */
  /*   } while ((currentNode = walker.nextNode())) */
  /*   return nodes */
  /* } */
  /**/
  /* function element(name, props = {}) { */
  /*   return Object.assign(document.createElement(name), props) */
  /* } */

  /* createEffect(() => { */
  /*   if (paragraphsLoaded()) { */
  /*     console.log('begin') */
  /*     ;[...document.querySelectorAll('p')] */
  /*       .flatMap(getTextNodes) */
  /*       .forEach((textNode) => { */
  /*         textNode.replaceWith( */
  /*           ...textNode.textContent */
  /*             .split(new RegExp(/[A-Za-z]+.[⁰¹²³⁴⁵⁶⁷⁸⁹]+/, 'gui')) */
  /*             .map((item, i) => { */
  /*               if (i % 2) { */
  /*                 return element('span', { */
  /*                   textContent: item, */
  /*                   onclick: () => console.log('Hello!'), */
  /*                   className: 'clickable', */
  /*                 }) */
  /*               } else return item */
  /*             }) */
  /*         ) */
  /*       }) */
  /*   } */
  /* }) */

  createEffect(() => {
    if (paragraphsLoaded()) fullTextRef.focus()
  })

  createEffect(() => {
    const params = useParams()
    setTitle(params.title)
    setTranslator(params.translator)
    props.setSelectedTitle(params.title)
  })

  return (
    <div class='flex flex-col w-screen h-[88vh]'>
      <div
        class='flex flex-col flex-wrap w-[100vw] h-full no-scrollbar overflow-x-hidden'
        ref={fullTextRef}
      >
        <>
          <BookInfo title={title()} translator={translator()} />
          <ChapterList
            title={title()}
            translator={translator()}
            fullTextRef={fullTextRef}
            setPercentScrolledToChapter={setPercentScrolledToChapter}
            paragraphsLoaded={paragraphsLoaded()}
          />
          <Chapters
            title={title()}
            translator={translator()}
            setParagraphsLoaded={setParagraphsLoaded}
          />
        </>
      </div>
      <Show
        when={paragraphsLoaded() === 'ready'}
        fallback={<p>Loading Paragraphs, then Slider...</p>}
      >
        <Slider
          fullTextRef={fullTextRef}
          rootDivRef={props.rootDivRef}
          title={title()}
          translator={translator()}
          percentScrolledToChapter={percentScrolledToChapter()}
          setPercentScrolledToChapter={setPercentScrolledToChapter}
        />
      </Show>
    </div>
  )
}
