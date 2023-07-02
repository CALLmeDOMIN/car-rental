import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
    publicRoutes: ['/', '/cars', '/cars/(.*)', '/sign-in'],
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
