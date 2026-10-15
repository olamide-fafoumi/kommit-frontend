import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { checkServerHealth, checkDatabaseHealth } from '@/lib/api/health'

export function HealthCheck() {
  const [loading, setLoading] = useState(false)

  const testServerConnection = async () => {
    setLoading(true)
    try {
      const data = await checkServerHealth()
      toast.success(`Serveur opérationnel\nUptime : ${data.uptime} s`)
    } catch {
      toast.error('Backend injoignable\nLe serveur ne répond pas. Vérifie qu\'il tourne sur le port 3000.')
    } finally {
      setLoading(false)
    }
  }

  const testDatabaseConnection = async () => {
    setLoading(true)
    try {
      const data = await checkDatabaseHealth()
      toast.success(`Base de données opérationnelle\nLatence : ${data.latency} ms`)
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
