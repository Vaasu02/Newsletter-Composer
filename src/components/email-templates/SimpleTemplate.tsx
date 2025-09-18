import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from '@react-email/components';
import { Markdown } from '@react-email/markdown';
import { Newsletter } from '@/types/newsletter';

interface SimpleTemplateProps {
  newsletter: Newsletter;
}

export const SimpleTemplate = ({ newsletter }: SimpleTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{newsletter.metadata.subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {newsletter.sections.map((section) => (
            <Section key={section.id} style={sectionStyle}>
              <Markdown>{section.content}</Markdown>
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
