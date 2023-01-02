import { createResource, For } from 'solid-js'
import { createSetVisibleParagraphs } from '../../providers/ParagraphProviders.jsx'
import { fetchBookChapters } from '../../utils/nietzscheAPI.js'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'

export const ChapterList = (props) => {
  const setVisibleParagraphs = createSetVisibleParagraphs()

  const [fetchedChapterInfo] = createResource(
    () => [props.title, props.translator],
    fetchBookChapters
  )

  const handleChapterLink = (chapterNumber) => {
    scrollIntoView(props.allChapters[chapterNumber], {
      behavior: 'smooth',
      block: 'nearest',
    }).then(() => {
      const scrollWidth = () => props.fullTextRef.scrollWidth
      const totalWidth = scrollWidth() - window.innerWidth
      const percentScrolled = props.fullTextRef.scrollLeft / totalWidth
      props.setPercentScrolledToChapter(percentScrolled)
    })
  }

  return (
    <div
      ref={(el) => setVisibleParagraphs((p) => [...p, el])}
      class='w-full h-full cursor-pointer'
    >
      <For each={fetchedChapterInfo()}>
        {(info) => (
          <h1 onClick={[handleChapterLink, info.chapterNumber]}>
            {info.chapterName}
          </h1>
        )}
      </For>
    </div>
  )
}
