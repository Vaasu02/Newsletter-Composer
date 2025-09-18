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
      <Body className="email-main">
        <Container className="email-container">
          {newsletter.sections.map((section) => (
            <Section key={section.id} className="email-section">
              {section.type === 'button' ? (
                <Button className="email-button" href="#">
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

