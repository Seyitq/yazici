import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/admin/giris'

  if (pathname.startsWith('/admin') && !isLoginPage) {
    const token = request.cookies.get('admin_token')?.value
    const expectedToken = process.env.ADMIN_TOKEN

    if (!token || token !== expectedToken) {
      return NextResponse.redirect(new URL('/admin/giris', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
