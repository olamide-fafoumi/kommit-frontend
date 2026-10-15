interface HealthResponse {
  uptime: number
}

interface DbHealthResponse {
  latency: number
}

export async function checkServerHealth(): Promise<HealthResponse> {
  const response = await fetch('http://localhost:3000/health', {
    method: 'GET',
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error('Server unreachable')
  }

  return data as HealthResponse
}

export async function checkDatabaseHealth(): Promise<DbHealthResponse> {
  const response = await fetch('http://localhost:3000/db-health', {
    method: 'GET',
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error('Database unreachable')
  }

  return data as DbHealthResponse
}
