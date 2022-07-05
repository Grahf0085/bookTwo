import { createSignal, createEffect } from 'solid-js'
import { useSelectedBook } from './providers/SelectedBookProvider.jsx'
import { Nav } from './navigation/Nav.jsx'
import { FullText } from './FullText.jsx'
import { Footer } from './Footer.jsx'

function App() {
  const [pageChange, setPageChange] = createSignal(0)

  const bookSelected = useSelectedBook()

  createEffect(() => {
    if (pageChange() <= 0) setPageChange(0)
  })

  createEffect((prev) => {
    const book = bookSelected()
    if (book !== prev) setPageChange(0)
    return book
  }, '')

  const handleKeyDown = (event) => {
    if (event.which === 37) {
      setPageChange(pageChange() - 1)
    }
    if (event.which === 39) {
      setPageChange(pageChange() + 1)
    }
  }

  return (
    <div
      tabIndex={-1}
      onKeyDown={() => handleKeyDown(event)}
      class='bg-hooplaBackground w-full h-full text-white'
    >
      <Nav />
      <FullText pageChange={pageChange()} />
      <Footer />
    </div>
  )
}

export default App
