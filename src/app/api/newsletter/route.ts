import Newsletter from '@/email/newsletter'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const data = await req.json()
    try {
        await resend.sendEmail({
            from: 'newsletter@dsieron.pl',
            to: data.email,
            subject: 'Contact form',
            react: Newsletter(),
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
