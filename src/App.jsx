// import { createEffect } from 'solid-js'
import { Nav } from './Nav.jsx'
import { FullText } from './FullText.jsx'
import { Footer } from './Footer.jsx'

function App() {
  return (
    <div class='bg-hooplaBackground w-full min-h-screen text-white'>
      <Nav />
      <FullText />
      <Footer />
    </div>
  )
}

export default App
