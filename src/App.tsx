import * as React from 'react'
import './App.css'
import AppErrorBoundary from './components/AppErrorBoundary'

function AppContent() {
  return React.createElement('div', { className: 'App' },
    React.createElement('header', { className: 'App-header' },
      React.createElement('h1', null, 'Prime Focus Cafe'),
      React.createElement('p', null, 'Welcome to our website!')
    ),
    React.createElement('main', null,
      React.createElement('p', null, 'Your content will go here.')
    )
  )
}

function App() {
  return React.createElement(AppErrorBoundary, null,
    React.createElement(AppContent)
  )
}

export default App
