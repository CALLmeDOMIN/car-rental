import Contact from '@/email/contact'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const data = await req.json()
    console.log(data)
    try {
        console.log('Sending email')
        await resend.sendEmail({
            from: 'onboarding@resend.dev',
            to: 'dominiksieron13@gmail.com',
            subject: 'Contact form',
            react: Contact(data),
        })
        console.log('Email sent')
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
