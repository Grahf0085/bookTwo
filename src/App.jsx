//TODO tie search params to what's on screen
//TODO spinner for loading slider
//TODO spacing between paragraphs vs. chapter - shouldn't be the same
//TODO fix height resize update max page

import { Route, Routes, Navigate } from '@solidjs/router'
import { Nav } from './components/navigation/Nav.jsx'
import { Home } from './components/Home.jsx'
import { FullText } from './components/book-parts/FullText.jsx'

export default function App() {
  window.addEventListener('keydown', (event) => {
    if (event.keyCode === 114 || (event.ctrlKey && event.keyCode === 70))
      event.preventDefault()
  })

  return (
    <div
      tabIndex={-1}
      class='bg-hooplaBackground w-full h-full text-white flex flex-col p-0 m-0'
    >
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book/:translator/:title' element={<FullText />} />
        <Route path='/*' element={<Navigate href='/' />} />
      </Routes>
    </div>
  )
}
