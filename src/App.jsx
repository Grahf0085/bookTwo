import { createSignal } from 'solid-js'
import { Route, Routes, Navigate } from 'solid-app-router'
import { Nav } from './navigation/Nav.jsx'
import { Home } from './Home.jsx'
import { FullText } from './FullText.jsx'

function App() {
  let rootDivRef

  const [selectedTitle, setSelectedTitle] = createSignal()

  function getPath() {
    return '/'
  }

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
            <Route path='/:title'>
              <Route
                path='/:chapter'
                element={
                  <FullText
                    rootDivRef={rootDivRef}
                    setSelectedTitle={setSelectedTitle}
                  />
                }
              />
            </Route>
          </Route>
        </Route>
        <Route path='/redirect'>
          <Navigate href={getPath} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
