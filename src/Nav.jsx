import { createSignal } from 'solid-js'
import { Link } from 'solid-app-router'
import { NavLinks } from './NavLinks.jsx'
import face from './assets/face.png'

export const Nav = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <nav>
      <div class='flex items-center justify-around'>
        <div class='z-50 p-5 md:w-auto w-full flex justify-between'>
          <img src={face} alt='Nietzsche' class='h-14 w-14 md:cursor-pointer' />
          <div class='md:hidden' onClick={() => setOpen(!open())}>
            <ion-icon
              name={`${open() ? 'close' : 'menu-sharp'}`}
              size='large'
            />
          </div>
        </div>
        <ul class='md:flex hidden items-center gap-8'>
          <li>
            <Link href='/' class='py-7 px-3'>
              Home
            </Link>
          </li>
          <NavLinks />
        </ul>
        {/* Mobile */}
        <ul
          class={`md:hidden fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4 duration-500 ${
            open() ? 'left-0' : 'left-[-100%]'
          }`}
        >
          <li>
            <Link href='/' class='py-7 px-3 inline-block'>
              Home
            </Link>
          </li>
          <NavLinks />
        </ul>
      </div>
    </nav>
  )
}
