// FastAPI authentication client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

// Store token in localStorage (client-side only) and in cookie for SSR
export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token)

    // Also set a cookie for SSR
    document.cookie = `auth_token=${token}; path=/; max-age=2592000; SameSite=Strict`
  }
}

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")

    // Also remove the cookie
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
  }
}

// Auth API calls
export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    // Use the Next.js API route as a proxy to avoid CORS issues
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // The backend expects the field to be 'username', not 'email'
        username: credentials.email,
        password: credentials.password,
      }),
      credentials: "include", // Important for cookies
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || "Login failed")
    }

    const data = await response.json()
    setToken(data.access_token)
    return data.user
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export async function register({ email, password, first_name, last_name }: RegisterData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      first_name,
      last_name
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to register');
  }

  return await response.json();
}

export const logout = () => {
  removeToken()
}

export const getCurrentUser = async (): Promise<User | null> => {
  const token = getToken()
  if (!token) return null

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Important for cookies
    })

    if (!response.ok) {
      removeToken()
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching current user:", error)
    removeToken()
    return null
  }
}

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  return user !== null
}

// Helper function to get auth headers for API requests
export const getAuthHeaders = (): HeadersInit => {
  const token = getToken()
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      }
}

export async function verifyEmail(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Email verification failed');
  }

  return await response.json();
}

