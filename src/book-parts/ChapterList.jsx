import { createResource, For } from 'solid-js'
import { fetchBookChapters } from '../utils/nietzscheAPI.js'
import { createScrollWidth } from '../utils/createScrollWidth.jsx'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'

export const ChapterList = (props) => {
  let scrollWidth

  const [fetchedChapterInfo] = createResource(
    () => [props.title, props.translator],
    fetchBookChapters
  )

  const handleChapterLink = async (chapterNumber) => {
    const chapter = document.getElementById(chapterNumber)
    await scrollIntoView(chapter, {
      behavior: 'smooth',
      block: 'nearest',
    }).then(() => {
      scrollWidth = createScrollWidth(props.fullTextRef)
      const totalWidth = scrollWidth - window.innerWidth
      const percentScrolled = props.fullTextRef.scrollLeft / totalWidth
      props.setPercentScrolledToChapter(percentScrolled)
    })
  }

  return (
    <div
      class='w-full h-full cursor-pointer bookParagraphs'
      id={'chapter: chapter-list'}
    >
      <For each={fetchedChapterInfo()}>
        {(info) => (
          <h1 onClick={() => handleChapterLink(info.chapterNumber)}>
            {info.chapterName}
          </h1>
        )}
      </For>
    </div>
  )
}
