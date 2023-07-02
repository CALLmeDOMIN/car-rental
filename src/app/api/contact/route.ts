import Contact from '@/email/contact'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const data = await req.json()
    try {
        await resend.sendEmail({
            from: 'contact@dsieron.pl',
            to: 'dominiksieron13@gmail.com',
            subject: 'Contact form',
            react: Contact(data),
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
