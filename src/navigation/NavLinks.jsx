import { For, createSignal, createResource, onMount } from 'solid-js'
import { fetchTitles, fetchTranslators } from '../../nietzscheAPI.js'
import { useSetSelectedBook } from '../providers/SelectedBookProvider.jsx'

export const NavLinks = () => {
  const [heading, setHeading] = createSignal('') //needs passed up to app for selected book title on mobile
  const [titles, setTitles] = createSignal([])
  const [hovered, setHovered] = createSignal('') //needs passed up to app for selected book title

  const [translators] = createResource(hovered, fetchTranslators)
  const [mobileTranslators] = createResource(heading, fetchTranslators)

  const setSelectedBook = useSetSelectedBook()

  onMount(async () => {
    const res = await fetchTitles()
    setTitles(await res)
  })

  const handleMouseHover = (title) => {
    setHovered(title)
  }

  return (
    <>
      <For each={titles()} fallback={<div>Searching...</div>}>
        {(title) => (
          <>
            <div
              class='md:px-5 group md:flex md:items-center md:justify-center md:h-20'
              onMouseOver={[handleMouseHover, title.title]}
            >
              <h1
                class='md:cursor-pointer whitespace-nowrap font-rubik py-3 flex justify-between items-center px-4 bg-hooplaBackground md:bg-hooplaLighter rounded-sm md:border-dotted md:border-b-2 group-hover:border-solid group-hover:border-linkHover group-hover:bg-hooplaBackground'
                onClick={() => {
                  heading() !== title.title
                    ? setHeading(title.title)
                    : setHeading('')
                }}
              >
                {title.title}
                <span class='md:hidden inline pr-3'>
                  <ion-icon
                    name={`${
                      heading() === title.title ? 'chevron-up' : 'chevron-down'
                    }`}
                    size='medium'
                  />
                </span>
              </h1>
              <ul class='absolute top-20 bg-hooplaLighter rounded-sm group group-hover:md:block hover:md:block text-center'>
                <li class='px-4 invisible h-0 font-rubik'>{title.title}</li>
                <For each={translators()}>
                  {(translator) => (
                    <li
                      onClick={() => {
                        setSelectedBook(
                          `${hovered()}+${translator.translatorName}`
                        )
                      }}
                      class=' cursor-pointer font-rubik text-sm text-linkHover my-2.5 hidden group-hover:md:block hover:md:block md:my-0 p-3'
                    >
                      {translator.translatorName}
                    </li>
                  )}
                </For>
              </ul>
            </div>
            <div
              class={`${heading() === title.title ? 'md:hidden' : 'hidden'}`}
            >
              <ul class='bg-hooplaBackground rounded-sm'>
                <For
                  each={mobileTranslators()}
                  fallback={<div>Loading...</div>}
                >
                  {(translator) => (
                    <li
                      onClick={() =>
                        setSelectedBook(
                          `${hovered()}+${translator.translatorName}`
                        )
                      }
                      class='font-rubik text-sm text-linkHover bg-hooplaBackground py-4 pl-7'
                    >
                      {translator.translatorName}
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </>
        )}
      </For>
    </>
  )
}
