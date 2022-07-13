import { createSignal } from 'solid-js'
import { Link } from 'solid-app-router'
import { NavLinks } from './NavLinks.jsx'
import face from '../assets/face.png'

export const Nav = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <nav>
      <div class='flex items-center justify-between bg-hooplaLighter rounded-sm md:mx-3 md:my-3 md:max-h-full max-h-12'>
        <div class='z-50 p-5 md:w-auto w-full flex justify-between'>
          <Link href='/'>
            <img
              src={face}
              alt='Nietzsche'
              class='md:h-14 md:w-14 md:cursor-pointer rounded-full h-10 w-10'
            />
          </Link>
          <div
            class='md:hidden flex items-center'
            onClick={() => setOpen(!open())}
          >
            <ion-icon
              name={`${open() ? 'close' : 'menu-sharp'}`}
              size='large'
            />
          </div>
        </div>
        <ul class='md:flex md:w-full md:justify-center hidden items-center'>
          <NavLinks />
        </ul>
        {/* Mobile */}
        <ul
          class={`md:hidden fixed w-full top-0 overflow-y-auto bottom-0 py-12 duration-500 ${
            open() ? 'left-0' : 'left-[-100%]'
          }`}
        >
          <NavLinks />
        </ul>
      </div>
    </nav>
  )
}
