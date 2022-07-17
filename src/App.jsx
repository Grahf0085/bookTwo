import { createSignal } from 'solid-js'
import { Nav } from './navigation/Nav.jsx'
import { FullText } from './FullText.jsx'
import { Slider } from './Slider.jsx'
// import { Footer } from './Footer.jsx'  //add this back

function App() {
  let fullTextRef

  const [pageChange, setPageChange] = createSignal(0)
  const [maxScroll, setMaxScroll] = createSignal()

  const handleSliderChange = (event) => {
    if (event.which === 37 && pageChange() !== 0)
      setPageChange(pageChange() - 1)
    if (event.which === 39 && pageChange() !== maxScroll()) {
      setPageChange(pageChange() + 1)
    }
  }

  const handleChangePage = (page) => {
    setPageChange(page)
  }

  const handleMaxScroll = (maxScroll) => {
    setMaxScroll(maxScroll)
  }

  return (
    <div
      tabIndex={-1}
      onKeyDown={() => handleSliderChange(event)}
      class='bg-hooplaBackground w-full h-full text-white flex flex-col'
    >
      <Nav />
      <FullText page={pageChange()} ref={fullTextRef} />
      <Slider
        fullTextRef={fullTextRef}
        page={pageChange()}
        onPageChange={handleChangePage}
        onMaxScrollChange={handleMaxScroll}
      />
    </div>
  )
}

export default App
