import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from '@react-email/components';
import { Markdown } from '@react-email/markdown';
import { Newsletter } from '@/types/newsletter';

interface HeaderContentFooterTemplateProps {
  newsletter: Newsletter;
}

export const HeaderContentFooterTemplate = ({ newsletter }: HeaderContentFooterTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{newsletter.metadata.subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {newsletter.sections.map((section) => (
            <Section key={section.id} style={sectionStyle}>
              {section.type === 'button' ? (
                <Button style={buttonStyle} href="#">
                  {section.content.replace(/\[([^\]]+)\]\([^)]+\)/, '$1')}
                </Button>
              ) : (
                <Markdown>{section.content}</Markdown>
              )}
            </Section>
          ))}
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 24px 48px',
  maxWidth: '560px',
};

const sectionStyle = {
  marginBottom: '24px',
  padding: '16px 24px',
};

const buttonStyle = {
  backgroundColor: '#3b82f6',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
  margin: '16px 0',
};
