const allowedHostsEnv = process.env.NEXT_PUBLIC_GRAPHQL_ALLOWED_HOSTS || ''
const allowedHosts = allowedHostsEnv
  .split(',')
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean)

function assertSafeEndpoint(endpoint: string) {
  let url: URL
  try {
    url = new URL(endpoint)
  } catch {
    throw new Error('Invalid GraphQL endpoint')
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('GraphQL endpoint must use http(s)')
  }
  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
    throw new Error('GraphQL endpoint must use https in production')
  }
  if (allowedHosts.length > 0 && !allowedHosts.includes(url.hostname.toLowerCase())) {
    throw new Error('GraphQL endpoint host is not allow-listed')
  }
}

export async function fetchGraphQL(endpoint: string, query: string, variables: Record<string, unknown> = {}) {
  assertSafeEndpoint(endpoint)

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const body = JSON.stringify({ query, variables })

  try {
    const response = await fetch(endpoint, { method: 'POST', headers, body })
    const data = await response.json()

    if (data.errors) {
      console.error('GraphQL Error:', data.errors)
      throw new Error('Failed to fetch GraphQL data')
    }
    return data.data
  } catch (error) {
    console.error('Fetch Error:', error)
    throw new Error('Failed to fetch GraphQL data')
  }
}
