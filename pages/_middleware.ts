import axios from 'axios'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export default async function midddleware(req: any) {
  const { pathname, origin } = req.nextUrl
  const { cookies } = req
  console.log(req)

  // console.log(cookies)

  var authenticated = false
  const refreshToken = cookies.refreshToken
  try {
    jwt.verify(refreshToken, '123')
    authenticated = true
  } catch {
    authenticated = false
  }

  if (pathname.includes('/user-info')) {
    if (!authenticated) return NextResponse.redirect(`${origin}/login`)
  }

  // if (pathname.includes(`/login`) || pathname.includes('/register')) {
  //   if (authenticated) return NextResponse.redirect(`${origin}/`)
  // }

  return NextResponse.next()
}
