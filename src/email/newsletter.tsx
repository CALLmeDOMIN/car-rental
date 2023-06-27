import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components'
import * as React from 'react'

export const Newsletter = () => (
    <Html>
        <Head>
            <title>Car rental Newsletter</title>
        </Head>
        <Preview>Car rental Newsletter</Preview>
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            text: '#dde8ee',
                            bg: '#0c1418',
                            'primary-button': '#de964f',
                            'secondary-button': '#fbf3fa',
                            accent: '#93c3cd',
                        },
                    },
                },
            }}
        >
            <Body className="bg-bg font-sans text-text">
                <Container className="mx-auto flex h-screen items-center pb-12 pt-5">
                    <Text className="text-base"></Text>
                    <Text className="text-base">
                        Welcome to Car-rental! <br /> Its a pleasure to send to
                        you this email. <br /> The purpose of this is to learn
                        about newest approach to programming emails. Your email
                        will not be shared with anyone or stored, its just a one
                        timer.
                    </Text>
                    <Section className="flex justify-center text-center">
                        <Button
                            pX={12}
                            pY={12}
                            className="text-bg block rounded-md bg-primary-button text-base"
                            href="https://car-rental-dominiksieron.vercel.app"
                        >
                            Visit Car-rental
                        </Button>
                    </Section>
                    <Text className="text-base">
                        Best regards,
                        <br />
                        Dominik Sieroń
                    </Text>
                    <Hr className="my-5 border border-gray-500" />
                    <Text className="text-xs text-secondary-button">
                        Car-rental 2023
                    </Text>
                </Container>
            </Body>
        </Tailwind>
    </Html>
)

export default Newsletter
