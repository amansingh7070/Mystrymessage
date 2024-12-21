import {
    Html,
    Head,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
  } from '@react-email/components';
  
  interface VerificationEmailProps {
    username?: string;
    otp?: string;
  }
  
  export default function VerificationEmail({
    username = 'User',
    otp = '000000',
  }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Verification Code</title>
          <style>
            {`@font-face {
                font-family: 'Roboto';
                src: url('https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2') format('woff2');
                font-weight: 400;
                font-style: normal;
              }
              body {
                font-family: 'Roboto', Arial, sans-serif;
              }`}
          </style>
        </Head>
        <Preview>Here's your verification code: {otp}</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello {username},</Heading>
          </Row>
          <Row>
            <Text>
              Thank you for registering. Please use the following verification
              code to complete your registration:
            </Text>
          </Row>
          <Row>
            <Text style={{ fontWeight: 'bold', fontSize: '18px' }}>{otp}</Text>
          </Row>
          <Row>
            <Text>If you did not request this code, please ignore this email.</Text>
          </Row>
          {/* <Row>
            <Button
              href={`http://localhost:3000/verify/${username}`}
              style={{
                backgroundColor: '#61dafb',
                color: '#fff',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '5px',
              }}
            >
              Verify here
            </Button>
          </Row> */}
        </Section>
      </Html>
    );
  }
  