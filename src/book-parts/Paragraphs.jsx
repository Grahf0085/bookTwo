import { createResource, For } from 'solid-js'
// import { useNavigate, useParams } from 'solid-app-rout/*  */er'
import { fetchChapterParagraphs } from '../utils/nietzscheAPI.js'

export const Paragraphs = (props) => {
  const [fetchedChapterParagraphs] = createResource(
    () => [props.title, props.translator, props.chapterNumber],
    fetchChapterParagraphs
  )

  // const navigate = useNavigate()
  // const params = useParams()

  // createEffect((prev) => {
  //   if (prev !== props.chapterNumber) {
  //     navigate(
  //       `/book/${params.translator}/${params.title}/${props.chapterNumber}`
  //     )
  //   }
  // })

  //TODO some paragraphs longer than window.....they don't wrap
  //TODO chapters that end in letters not in right place
  //TODO disable search with browser search function

  return (
    <For each={fetchedChapterParagraphs()}>
      {(paragraph) => (
        <p class='whitespace-pre-wrap max-w-full min-w-full h-fit px-20 py-2'>
          {paragraph.paragraphText}
        </p>
      )}
    </For>
  )
}
