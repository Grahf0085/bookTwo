import { createSignal } from 'solid-js'
import { Link } from 'solid-app-router'
import { NavLinks } from './NavLinks.jsx'
import face from './assets/face.png'

export const Nav = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <nav>
      <div class='flex justify-around'>
        <div class='z-50 p-4 md:w-auto w-full flex justify-between'>
          <Link href='/'>
            <img src={face} alt='Nietzsche' class='h-14 w-14 rounded-full' />
          </Link>
          <div class='md:hidden' onClick={() => setOpen(!open())}>
            <ion-icon
              name={`${open() ? 'close' : 'menu-sharp'}`}
              size='large'
            />
          </div>
        </div>
        <ul class='md:flex hidden w-full justify-center'>
          <NavLinks />
        </ul>
        {/* Mobile */}
        <ul
          class={`md:hidden fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4 duration-500 ${
            open() ? 'left-0' : 'left-[-100%]'
          }`}
        >
          <NavLinks />
        </ul>
      </div>
    </nav>
  )
}
