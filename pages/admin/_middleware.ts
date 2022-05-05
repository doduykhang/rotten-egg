import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export default async function midddleware(req: any) {
  const { pathname, origin } = req.nextUrl
  const { cookies } = req
  console.log(req)

  // console.log(cookies)

  let authenticated = false
  let isAdmin = false
  const refreshToken = cookies.refreshToken

  interface Token {
    id: string
    role: string
  }

  try {
    const decoded = jwt.verify(refreshToken, '123') as Token
    authenticated = true
    isAdmin = decoded.role === 'ADMIN'
  } catch {
    authenticated = false
  }

  if (!isAdmin) {
    return NextResponse.redirect(`${origin}/login`)
  }

  return NextResponse.next()
}
