import ServiceCard3D from '../components/DigitalMarketing/ui/ServiceCard3D';

// Minimal Storybook-less preview export. This file is intentionally type-free to avoid requiring @storybook/react types.
export default {
  title: 'DigitalMarketing/ServiceCard3D',
  component: ServiceCard3D as any,
};

export const Content = () => (
  <ServiceCard3D
    service={{
      id: 'content',
      title: 'Content Marketing',
      bullets: ['Blog writing', 'Content strategy', 'SEO-friendly copy'],
      summary: 'We create content that drives engagement.',
    }}
  />
);
