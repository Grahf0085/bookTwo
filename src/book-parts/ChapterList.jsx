import { createResource, createEffect, For } from 'solid-js'
import { fetchBookChapters } from '../utils/nietzscheAPI.js'
import { createWindowWidth } from '../utils/createWindowWidth.jsx'

export const ChapterList = (props) => {
  let windowWidth

  const [fetchedChapterInfo] = createResource(
    () => props.book,
    fetchBookChapters
  )

  createEffect(() => {
    windowWidth = createWindowWidth()
  })

  const handleChapterLink = (chapterNumber) => {
    document
      .getElementById(chapterNumber)
      .scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      console.log(windowWidth)
      console.log('scroll left', props.fullTextRef.scrollLeft)
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
