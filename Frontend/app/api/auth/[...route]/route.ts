import { type NextRequest, NextResponse } from "next/server"

// This file serves as a proxy to the FastAPI backend
const API_BASE_URL = process.env.API_URL || "http://localhost:8000"

export async function GET(request: NextRequest, { params }: { params: { route: string[] } }) {
  const route = params.route.join("/")
  const url = new URL(request.url)
  const apiUrl = `${API_BASE_URL}/auth/${route}${url.search}`

  const headers: HeadersInit = {}
  // Forward authorization header if present
  const authHeader = request.headers.get("authorization")
  if (authHeader) {
    headers["authorization"] = authHeader
  }

  try {
    const response = await fetch(apiUrl, {
      headers,
      cache: "no-store",
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(`Error proxying to ${apiUrl}:`, error)
    return NextResponse.json({ error: "Failed to connect to authentication service" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { route: string[] } }) {
  const route = params.route.join("/")
  const apiUrl = `${API_BASE_URL}/auth/${route}`

  try {
    const body = await request.json()
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    // If login/register was successful, set the token in a cookie
    if (response.ok && (route === "login" || route === "register")) {
      const responseWithCookie = NextResponse.json(data, {
        status: response.status,
      })

      // Set HTTP-only cookie with the token
      responseWithCookie.cookies.set({
        name: "auth_token",
        value: data.access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })

      return responseWithCookie
    }

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(`Error proxying to ${apiUrl}:`, error)
    return NextResponse.json({ error: "Failed to connect to authentication service" }, { status: 500 })
  }
}

