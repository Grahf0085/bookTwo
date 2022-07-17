import { createSignal } from 'solid-js'
import { Nav } from './navigation/Nav.jsx'
import { FullText } from './FullText.jsx'
import { Slider } from './Slider.jsx'

function App() {
  let fullTextRef
  let rootDivRef

  const [pageChange, setPageChange] = createSignal(0)

  const handleChangePage = (page) => {
    setPageChange(page)
  }

  return (
    <div
      ref={rootDivRef}
      tabIndex={-1}
      class='bg-hooplaBackground w-full h-full text-white flex flex-col'
    >
      <Nav />
      <FullText page={pageChange()} ref={fullTextRef} />
      <Slider
        fullTextRef={fullTextRef}
        page={pageChange()}
        onPageChange={handleChangePage}
        rootDivRef={rootDivRef}
      />
    </div>
  )
}

export default App
