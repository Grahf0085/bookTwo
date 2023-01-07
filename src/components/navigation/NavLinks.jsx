import { For, createSignal, createResource } from 'solid-js'
import { A } from '@solidjs/router'
import { fetchTitles, fetchTranslators } from '../../utils/nietzscheAPI.js'

export const NavLinks = (props) => {
  const [heading, setHeading] = createSignal('')
  const [hoveredBook, setHoveredBook] = createSignal('')

  const [translators] = createResource(hoveredBook, fetchTranslators)
  const [mobileTranslators] = createResource(heading, fetchTranslators)
  const [fetchedTitles] = createResource(fetchTitles)

  const handleMouseHover = (title) => setHoveredBook(title)

  return (
    <>
      <For each={fetchedTitles()} fallback={<div>Searching For Titles...</div>}>
        {(title) => (
          <>
            <div
              class='md:px-5 group md:flex md:items-center md:justify-center md:h-20'
              onMouseOver={[handleMouseHover, title.title]}
            >
              <h1
                class={`md:cursor-pointer whitespace-nowrap font-rubik py-3 flex justify-between items-center px-4 bg-hooplaBackground md:bg-hooplaLighter rounded-sm md:border-b-2 group-hover:border-solid group-hover:border-linkHover group-hover:bg-hooplaBackground ${
                  props.selectedTitle &&
                  props.selectedTitle.replaceAll('%20', ' ') === title.title
                    ? 'md:border-solid border-linkHover'
                    : 'md:border-dotted'
                }`}
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
                    <A
                      href={`/book/${
                        translator.translatorName
                      }/${hoveredBook()}`}
                      class='cursor-pointer font-rubik text-sm text-linkHover my-2.5 hidden group-hover:md:block hover:md:block md:my-0 p-3'
                      onClick={() => props.setSelectedTitle(hoveredBook())}
                    >
                      {translator.translatorName}
                    </A>
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
                    <A
                      href={`/book/${
                        translator.translatorName
                      }/${hoveredBook()}/0`}
                      class='font-rubik text-sm text-linkHover bg-hooplaBackground py-4 pl-7'
                    >
                      {translator.translatorName}
                    </A>
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
