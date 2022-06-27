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
      translators: ['Helen Zimmern'],
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
            <div class='px-7 cursor-pointer group flex flex-col items-center self-center'>
              <h1
                class='py-2 md:px-2'
                onClick={() =>
                  heading() !== book.title
                    ? setHeading(book.title)
                    : setHeading('')
                }
              >
                {book.title}
              </h1>
              <For each={book.translators} fallback={<div>Loading...</div>}>
                {(translator) => (
                  <div>
                    <div class='absolute top-20 hidden group-hover:md:block hover:md:block'>
                      <div class='py-3'>
                        <div class='bg-hooplaBackground p-5 grid grid-cols-1'>
                          <h2 class='text-linkHover'>{translator}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </For>
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
