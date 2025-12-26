import React from 'react'
import NeonSpiritDashboard from './components/NeonSpiritDashboard'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <NeonSpiritDashboard />
    </ErrorBoundary>
  )
}

export default App

