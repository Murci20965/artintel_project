import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (err) {
    return null
  }
}

export async function login(token: string) {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  })
}

export async function logout() {
  cookies().delete("token")
}

export async function getSession() {
  const token = cookies().get("token")
  if (!token) return null

  try {
    const payload = await decrypt(token.value)
    return payload
  } catch (err) {
    return null
  }
}

export function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    const session = await getSession()
    if (!session) {
      return new NextResponse(JSON.stringify({ message: "Authentication required" }), { status: 401 })
    }
    return handler(req, session)
  }
}

