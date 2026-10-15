import { useState } from 'react'

function App() {
  const [serverStatus, setServerStatus] = useState<string | null>(null)
  const [dbStatus, setDbStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testServerConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/health', {
        method: 'GET',
      })
      if (response.ok) {
        setServerStatus('✓ Serveur connecté')
      } else {
        setServerStatus('✗ Serveur non accessible')
      }
    } catch (error) {
      setServerStatus('✗ Erreur de connexion au serveur')
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
      if (response.ok) {
        setDbStatus('✓ Base de données connectée')
      } else {
        setDbStatus('✗ Base de données non accessible')
      }
    } catch (error) {
      setDbStatus('✗ Erreur de connexion à la base de données')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Kommit Frontend</h1>

        <div className="space-y-6">
          <div>
            <button
              onClick={testServerConnection}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
            >
              {loading ? 'Vérification...' : 'Tester connexion serveur'}
            </button>
            {serverStatus && (
              <p className={`mt-2 text-sm ${serverStatus.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {serverStatus}
              </p>
            )}
          </div>

          <div>
            <button
              onClick={testDatabaseConnection}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
            >
              {loading ? 'Vérification...' : 'Tester connexion base de données'}
            </button>
            {dbStatus && (
              <p className={`mt-2 text-sm ${dbStatus.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {dbStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
