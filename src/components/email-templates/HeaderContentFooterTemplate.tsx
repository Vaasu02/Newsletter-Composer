import {
  Body,
  Button,
  Container,
  Head,
  Hr,
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
          {newsletter.sections.map((section, index) => (
            <div key={section.id}>
              <Section style={
                index === 0 ? headerStyle : 
                index === newsletter.sections.length - 1 ? footerStyle : 
                sectionStyle
              }>
                {section.type === 'button' ? (
                  <Button style={buttonStyle} href="#">
                    {section.content.replace(/\[([^\]]+)\]\([^)]+\)/, '$1')}
                  </Button>
                ) : (
                  <Markdown>{section.content}</Markdown>
                )}
              </Section>
              
              {/* Add horizontal rule between sections (except after last) */}
              {index < newsletter.sections.length - 1 && <Hr style={hr} />}
            </div>
          ))}
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  padding: '32px 32px 16px',
  textAlign: 'center' as const,
  backgroundColor: '#f8fafc',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

const sectionStyle = {
  padding: '16px 32px',
};

const footerStyle = {
  padding: '16px 32px 32px',
  textAlign: 'center' as const,
  color: '#6b7280',
  fontSize: '14px',
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

const hr = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
};
