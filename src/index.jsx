/* @refresh reload */
import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'
import { VisibleParagraphsProvider } from './providers/ParagraphProviders.jsx'
import App from './App'
import 'tailwindcss/tailwind.css'
import './index.css'

render(
  () => (
    <Router>
      <VisibleParagraphsProvider>
        <App />
      </VisibleParagraphsProvider>
    </Router>
  ),
  document.getElementById('root')
)
