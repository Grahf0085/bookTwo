import { createResource, For } from 'solid-js'
import { fetchBookChapters } from '../utils/nietzscheAPI.js'
import { createScrollWidth } from '../utils/createScrollWidth.jsx'

export const ChapterList = (props) => {
  let scrollWidth

  const [fetchedChapterInfo] = createResource(
    () => props.book,
    fetchBookChapters
  )

  const handleChapterLink = (chapterNumber) => {
    document
      .getElementById(chapterNumber)
      .scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    setTimeout(() => {
      scrollWidth = createScrollWidth(props.fullTextRef)
      const totalWidth = scrollWidth() - window.innerWidth
      const percentScrolled = (props.fullTextRef.scrollLeft / totalWidth) * 100
      props.setPercentScrolledToChapter(percentScrolled)
    }, 500)
  }

  return (
    <div class='w-full h-full'>
      <For each={fetchedChapterInfo()}>
        {(info) => (
          <>
            <h1
              onClick={() => handleChapterLink(info.chapterNumber)}
              class='pointer-events-auto cursor-pointer'
            >
              {info.chapterName}
            </h1>
          </>
        )}
      </For>
    </div>
  )
}
