//TODO consider going back to using custom function for windowWidth
//TODO GM chapter 2 para 11 is empty
//TODO add optional param for chapter and paragraph and use .scrollInfoView to scroll to it
//TODO GM chapter 1 para 14 has no para id?
//TODO sometimes all pages still aren't loaded when changing books

import { createSignal } from 'solid-js'
import { Route, Routes, Navigate } from '@solidjs/router'
import { Nav } from './navigation/Nav.jsx'
import { Home } from './Home.jsx'
import { FullText } from './FullText.jsx'

function App() {
  let rootDivRef

  const [selectedTitle, setSelectedTitle] = createSignal()

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
