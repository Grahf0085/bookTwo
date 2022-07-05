/* @refresh reload */
import { render } from 'solid-js/web'
import { Router } from 'solid-app-router'
import { SelectedBookProvider } from './providers/SelectedBookProvider.jsx'
import App from './App'

import 'tailwindcss/tailwind.css'
import './index.css'

render(
  () => (
    <Router>
      <SelectedBookProvider>
        <App />
      </SelectedBookProvider>
    </Router>
  ),
  document.getElementById('root')
)
