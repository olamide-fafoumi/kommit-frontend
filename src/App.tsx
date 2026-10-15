import { useState } from 'react'
import { Toaster, toast } from 'sonner'

function App() {
  const [loading, setLoading] = useState(false)

  const testServerConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/health', {
        method: 'GET',
      })
      const data = await response.json()

      if (response.ok && data.uptime !== undefined) {
        toast.success(`Serveur opérationnel\nUptime : ${data.uptime} s`)
      } else {
        toast.error('Backend injoignable\nLe serveur ne répond pas. Vérifie qu\'il tourne sur le port 3000.')
      }
    } catch {
      toast.error('Backend injoignable\nLe serveur ne répond pas. Vérifie qu\'il tourne sur le port 3000.')
    } finally {
      setLoading(false)
    }
  }

  const testDatabaseConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/db-health', {
        method: 'GET',
      })
      const data = await response.json()

      if (response.ok && data.latency !== undefined) {
        toast.success(`Base de données opérationnelle\nLatence : ${data.latency} ms`)
      } else {
        toast.error('Backend injoignable\nLe serveur ne répond pas. Vérifie qu\'il tourne sur le port 3000.')
      }
    } catch {
      toast.error('Backend injoignable\nLe serveur ne répond pas. Vérifie qu\'il tourne sur le port 3000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Toaster position="bottom-right" />
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
    </>
  )
}

export default App
