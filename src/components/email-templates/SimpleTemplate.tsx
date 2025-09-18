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
      <Body className="email-main">
        <Container className="email-container">
          {newsletter.sections.map((section) => (
            <Section key={section.id} className="email-section">
              <Markdown>{section.content}</Markdown>
            </Section>
          ))}
        </Container>
      </Body>
    </Html>
  );
};

