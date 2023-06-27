import Newsletter from '@/email/newsletter'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const data = await req.json()
    console.log(data)
    try {
        console.log('Sending email')
        await resend.sendEmail({
            from: 'newsletter@carrental.com',
            to: data.email,
            subject: 'Contact form',
            react: Newsletter(),
        })
        console.log('Email sent')
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
