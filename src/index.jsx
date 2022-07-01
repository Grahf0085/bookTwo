/* @refresh reload */
import { render } from 'solid-js/web'
import { Router } from 'solid-app-router'
import { SelectedBookProvider } from './state/SelectedBookProvider.jsx'
import 'tailwindcss/tailwind.css'

import './index.css'
import App from './App'

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
