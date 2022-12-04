//TODO tie search params to what's on screen
//TODO reorder props drilling
//TODO searchParams doesn't have book info when swithcing books
//TODO stop search params from chaning when size changes
//TODO spinner for loading slider

import { createSignal } from 'solid-js'
import { Route, Routes, Navigate } from '@solidjs/router'
import { Nav } from './components/navigation/Nav.jsx'
import { Home } from './components/Home.jsx'
import { FullText } from './components/book-parts/FullText.jsx'

export default function App() {
  let rootDivRef

  const [selectedTitle, setSelectedTitle] = createSignal()

  window.addEventListener('keydown', (event) => {
    // prevents browser search due to it messing up horizontal scrolling
    if (event.keyCode === 114 || (event.ctrlKey && event.keyCode === 70))
      event.preventDefault()
  })

  return (
    <div
      ref={rootDivRef}
      tabIndex={-1}
      class='bg-hooplaBackground w-full h-full text-white flex flex-col p-0 m-0'
    >
      <Nav
        selectedTitle={selectedTitle()}
        setSelectedTitle={setSelectedTitle}
      />
      <Routes>
        <Route path='/' component={Home} />
        <Route
          path='/book/:translator/:title'
          element={
            <FullText
              rootDivRef={rootDivRef}
              setSelectedTitle={setSelectedTitle}
            />
          }
        />
        <Route path='/*' element={<Navigate href='/' />} />
      </Routes>
    </div>
  )
}
