import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
    publicRoutes: ['/', '/cars', '/cars/(.*)', '/contact', '/sign-in'],
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
