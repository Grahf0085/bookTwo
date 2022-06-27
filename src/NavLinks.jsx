import { For } from 'solid-js'
import { createSignal } from 'solid-js'

export const NavLinks = () => {
  const [heading, setHeading] = createSignal('')

  const books = [
    {
      title: 'Beyond Good and Evil',
      translators: ['Helen Zimmern'],
    },
    {
      title: 'On The Geneology Of Morality',
      translators: ['Horace B. Samuel'],
    },
    {
      title: 'Human, All Too Human',
      translators: ['Helen Zimmern', 'sdfdsfdsf', 'sdffasdf'],
    },
    {
      title: 'The Antichrist',
      translators: ['H. L. Mencken'],
    },
  ]
  //TODO remove static data and change to data from backend
  //TODO each select changes a signal to change text displayed
  //TODO add that cool green dot border highlighting from that blog

  return (
    <>
      <For each={books} fallback={<div>Loading...</div>}>
        {(book) => (
          <>
            <div class='px-5 md:cursor-pointer group flex items-center justify-center h-20'>
              <h1
                class='py-4 flex justify-between items-center md:px-4 pr-5 bg-hooplaLighter rounded-sm border-dotted border-b-2 group-hover:border-solid group-hover:border-linkHover group-hover:bg-hooplaBackground'
                onClick={() =>
                  heading() !== book.title
                    ? setHeading(book.title)
                    : setHeading('')
                }
              >
                {book.title}
                <span class='md:hidden inline'>
                  <ion-icon
                    name={`${
                      heading() === book.title ? 'chevron-up' : 'chevron-down'
                    }`}
                    size='medium'
                  />
                </span>
                {/* <span class='md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2'> */}
                {/*   <ion-icon name='chevron-down' size='medium' /> */}
                {/* </span> */}
              </h1>
              <ul class='absolute top-20 bg-hooplaLighter rounded-sm group group-hover:md:block hover:md:block text-center'>
                <For each={book.translators} fallback={<div>Loading...</div>}>
                  {(translator) => (
                    <li class='text-linkHover my-2.5 hidden group-hover:md:block hover:md:block md:my-0 p-3'>
                      {translator}
                    </li>
                  )}
                </For>
              </ul>
            </div>
            <div class={`${heading() === book.title ? 'md:hidden' : 'hidden'}`}>
              <For each={book.translators} fallback={<div>Loading...</div>}>
                {(translator) => (
                  <h2 class='py-4 pl-7 md:pr-0'>{translator}</h2>
                )}
              </For>
            </div>
          </>
        )}
      </For>
    </>
  )
}
