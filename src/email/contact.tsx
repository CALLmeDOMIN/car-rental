import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

type ContactProps = {
  name: string;
  email: string;
  message: string;
};

export const Contact = ({ name, email, message }: ContactProps) => (
  <Html>
    <Head>
      <title>Car rental Contact</title>
    </Head>
    <Preview>Car rental Contact</Preview>
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              text: "#dde8ee",
              bg: "#0c1418",
              "primary-button": "#de964f",
              "secondary-button": "#fbf3fa",
              accent: "#93c3cd",
            },
          },
        },
      }}
    >
      <Body className="bg-bg font-sans text-text">
        <Container className="mx-auto flex h-screen items-center pb-12 pt-5">
          <Text className="text-base">Person with a name: {name}</Text>
          <Text className="text-base">
            Sent you a mail from car rental website and his email is {email}
          </Text>
          <Text className="text-base">
            message: <br />
            {message}
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default Contact;
