export async function signup(name: string, email: string, password: string) {
  const response = await fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message || 'Signup failed')
  }

  return responseData
}

export async function login(email: string, password: string) {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData.message || 'Login failed')
  }

  return responseData
}
