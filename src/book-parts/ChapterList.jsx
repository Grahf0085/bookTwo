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
      .scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      scrollWidth = createScrollWidth(props.fullTextRef)
      console.log('scroll width inside chapter list is: ', scrollWidth())
      console.log('scroll left', props.fullTextRef.scrollLeft)
      console.log('testing thing is: ', (props.fullTextRef.scrollLeft + 1803) / scrollWidth())
      console.log('another testing this:', props.fullTextRef.scrollLeft)
    }, 200)
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

//instead of doing For each tie render of chapter to onclick from slider. if at last page of chapter make new chapter
