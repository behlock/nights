import fetch from 'isomorphic-unfetch'

export async function fetchGraphQL(endpoint: string, query: any, variables = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  const body = JSON.stringify({
    query,
    variables,
  })

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body,
    })

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
