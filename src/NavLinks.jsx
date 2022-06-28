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
      translators: ['H. L. Mencken', 'blah', 'bleh', 'omg'],
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
            <div class='md:px-5 group md:flex md:items-center md:justify-center md:h-20'>
              <h1
                class='md:cursor-pointer whitespace-nowrap font-rubik py-3 flex justify-between items-center px-4 bg-hooplaBackground md:bg-hooplaLighter rounded-sm md:border-dotted md:border-b-2 group-hover:border-solid group-hover:border-linkHover group-hover:bg-hooplaBackground'
                onClick={() =>
                  heading() !== book.title
                    ? setHeading(book.title)
                    : setHeading('')
                }
              >
                {book.title}
                <span class='md:hidden inline pr-3'>
                  <ion-icon
                    name={`${
                      heading() === book.title ? 'chevron-up' : 'chevron-down'
                    }`}
                    size='medium'
                  />
                </span>
              </h1>
              <ul class='absolute top-20 bg-hooplaLighter rounded-sm group group-hover:md:block hover:md:block text-center'>
                <li class='px-4 invisible h-0 font-rubik'>{book.title}</li>
                <For each={book.translators} fallback={<div>Loading...</div>}>
                  {(translator) => (
                    <li class='font-rubik text-sm text-linkHover my-2.5 hidden group-hover:md:block hover:md:block md:my-0 p-3'>
                      {translator}
                    </li>
                  )}
                </For>
              </ul>
            </div>
            {/* Mobile */}
            <div class={`${heading() === book.title ? 'md:hidden' : 'hidden'}`}>
              <ul class='bg-hooplaBackground rounded-sm'>
                <For each={book.translators} fallback={<div>Loading...</div>}>
                  {(translator) => (
                    <li class='font-rubik text-sm text-linkHover bg-hooplaBackground py-4 pl-7'>
                      {translator}
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
