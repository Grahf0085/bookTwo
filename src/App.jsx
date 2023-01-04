//TODO tie search params to what's on screen
//TODO spinner for loading slider
//TODO spacing between paragraphs vs. chapter - shouldn't be the same
//TODO check resize on finals ps of book
//TODO switching books and fudges chapter links

import { createSignal } from 'solid-js'
import { Route, Routes, Navigate } from '@solidjs/router'
import { Nav } from './components/navigation/Nav.jsx'
import { Home } from './components/Home.jsx'
import { FullText } from './components/book-parts/FullText.jsx'

export default function App() {
  let rootDivRef

  const [title, setTitle] = createSignal()

  window.addEventListener('keydown', (event) => {
    if (event.keyCode === 114 || (event.ctrlKey && event.keyCode === 70))
      event.preventDefault()
  })

  return (
    <div
      ref={rootDivRef}
      tabIndex={-1}
      class='bg-hooplaBackground w-full h-full text-white flex flex-col p-0 m-0'
    >
      <Nav selectedTitle={title()} setSelectedTitle={setTitle} />
      <Routes>
        <Route path='/' element={<Home setTitle={setTitle} />} />
        <Route
          path='/book/:translator/:title'
          element={
            <FullText
              rootDivRef={rootDivRef}
              title={title()}
              setTitle={setTitle}
            />
          }
        />
        <Route path='/*' element={<Navigate href='/' />} />
      </Routes>
    </div>
  )
}
