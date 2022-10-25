//TODO consider going back to using custom function for windowWidth
//TODO sometimes all pages still aren't loaded when changing books
//TODO changing chapter doesn't change paragraph in search params. ie going from GM preface to Gm chap 1
//TODO tie search params to what's on screen
//TODO some paragraphs longer than window.....they don't wrap
//TODO what about height resize?
//TODO data functions from router

import { createSignal } from 'solid-js'
import { Route, Routes, Navigate } from '@solidjs/router'
import { Nav } from './navigation/Nav.jsx'
import { Home } from './Home.jsx'
import { FullText } from './FullText.jsx'

function App() {
  let rootDivRef

  const [selectedTitle, setSelectedTitle] = createSignal()

  window.addEventListener('keydown', function (event) {
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
        <Route path='/' element={<Home />} />
        <Route path='/book'>
          <Route path='/:translator'>
            <Route
              path='/:title'
              element={
                <FullText
                  rootDivRef={rootDivRef}
                  setSelectedTitle={setSelectedTitle}
                />
              }
            />
            <Route
              path='/:title/:chapter'
              element={
                <FullText
                  rootDivRef={rootDivRef}
                  setSelectedTitle={setSelectedTitle}
                />
              }
            />
          </Route>
        </Route>
        <Route path='/*' element={<Navigate href='/' />} />
      </Routes>
    </div>
  )
}

export default App
