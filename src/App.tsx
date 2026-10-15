import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)

  const testServerConnection = async () => {
    setLoading(true)
    try {
      await fetch('http://localhost:3000/health', {
        method: 'GET',
      })
    } finally {
      setLoading(false)
    }
  }

  const testDatabaseConnection = async () => {
    setLoading(true)
    try {
      await fetch('http://localhost:3000/db-health', {
        method: 'GET',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="kommit-container">
      <div>
        <h1 className="kommit-title">Kommit</h1>
        <p className="kommit-subtitle">État du backend</p>

        <div className="kommit-buttons">
          <button
            onClick={testServerConnection}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Vérification...' : 'Check server'}
          </button>
          <button
            onClick={testDatabaseConnection}
            disabled={loading}
            className="btn-outline"
          >
            {loading ? 'Vérification...' : 'Check BDD'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
