import { onMount } from 'solid-js'
import { Footer } from './Footer.jsx'

export const Home = (props) => {
  onMount(() => {
    props.setTitle(undefined)
  })
  return (
    <>
      <h1 class='h-[80vh]'>Be Careful Which Book You Pick</h1>
      <Footer />
    </>
  )
}
