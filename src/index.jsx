/* @refresh reload */
import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'
import { AllParagraphsProvider } from './providers/ParagraphProviders.jsx'
import App from './App'
import 'tailwindcss/tailwind.css'
import './index.css'

render(
  () => (
    <Router>
      <AllParagraphsProvider>
        <App />
      </AllParagraphsProvider>
    </Router>
  ),
  document.getElementById('root')
)
