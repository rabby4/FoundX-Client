import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const AuthRoutes = ["/login", "/register"]

type Role = keyof typeof roleBaseRoutes

const roleBaseRoutes = {
	USER: [/^\/profile/],
	ADMIN: [/^\/admin/],
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// const user = {
	// 	name: "rabby",
	// 	token: "adggljkg",
	// 	role: "ADMIN",
	// }

	const user = undefined

	if (!user) {
		if (AuthRoutes.includes(pathname)) {
			return NextResponse.next()
		} else {
			return NextResponse.redirect(new URL("/login", request.url))
		}
	}

	if (user?.role && roleBaseRoutes[user.role as Role]) {
		const routes = roleBaseRoutes[user.role as Role]

		if (routes.some((route) => route.test(pathname))) {
			return NextResponse.next()
		}
	}

	return NextResponse.redirect(new URL("/", request.url))
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/profile", "/admin", "/login", "/register"],
}
