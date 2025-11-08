import { type BlogPostCardProps } from '@/components/blog-post-card';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  excerpt: string;
  content: string;
};

const posts: BlogPost[] = [
  {
    slug: 'guyanas-economic-outlook-2024',
    title: "Guyana's Economic Outlook for 2024: Opportunities Abound",
    date: 'October 26, 2023',
    imageUrl: 'https://placehold.co/1200x630.png',
    imageHint: 'Guyana skyline and energy infrastructure',
    excerpt:
      "A deep dive into Guyana's economic trajectory, key growth sectors, and what strategic investors should be watching.",
    content: [
      "Guyana has transitioned from a frontier market to one of the most closely watched growth stories globally. With major offshore discoveries, expanding infrastructure, and strengthening institutions, the opportunity landscape is both dynamic and complex.",
      'For serious investors, success will depend on understanding how central government, regulators, communities, and international partners interact in practice — not just on paper.',
      'This outlook examines the sectors with durable potential, from energy and logistics to agriculture, services, and technology, and highlights the practical considerations for disciplined market entry.',
    ].join('\n\n'),
  },
  {
    slug: 'navigating-regulatory-landscapes',
    title: 'Navigating Regulatory Landscapes in Emerging Markets: A Guyana Case Study',
    date: 'November 5, 2023',
    imageUrl: 'https://placehold.co/1200x630.png',
    imageHint: 'legal documents and government building',
    excerpt:
      "Understanding how to work effectively with Guyana's regulatory institutions while preserving speed, compliance, and reputation.",
    content: [
      'Regulatory clarity is a competitive advantage. In Guyana, as in many emerging markets, formal frameworks coexist with evolving practice and expectations.',
      'This case study explores how to structure engagement with ministries, agencies, and oversight bodies in a way that is transparent, respectful, and aligned with both local law and international best practice.',
      'Drawing on diplomatic experience and on-the-ground relationships, we outline a pragmatic model for approvals, licensing, and stakeholder management that reduces friction without cutting corners.',
    ].join('\n\n'),
  },
  {
    slug: 'sustainable-investment-guyana',
    title: 'The Rise of Sustainable Investment in Guyana',
    date: 'November 18, 2023',
    imageUrl: 'https://placehold.co/1200x630.png',
    imageHint: 'renewable energy and rainforest landscape',
    excerpt:
      'How ESG-conscious capital can align with Guyana’s development agenda without compromising on standards or returns.',
    content: [
      'Guyana’s Low Carbon Development Strategy (LCDS) provides a rare platform: a resource-rich state explicitly committing to climate leadership while inviting responsible investment.',
      'Investors who approach Guyana with serious ESG credentials, community engagement plans, and long-term alignment can access opportunities that reputationally weaker actors will not.',
      'We outline how to position sustainable projects credibly — from forestry and renewables to social infrastructure — in partnership with local stakeholders and institutions.',
    ].join('\n\n'),
  },
  {
    slug: 'infrastructure-development-spotlight',
    title: "Infrastructure Development: Guyana's Next Frontier",
    date: 'December 2, 2023',
    imageUrl: 'https://placehold.co/1200x630.png',
    imageHint: 'modern port and road construction',
    excerpt:
      'Priority projects, enabling frameworks, and partnership models shaping Guyana’s infrastructure build-out.',
    content: [
      'Ports, roads, bridges, digital networks, and social infrastructure are central to unlocking Guyana’s full potential.',
      'This spotlight reviews flagship initiatives, procurement approaches, and the informal expectations that are not always captured in public documentation.',
      'We discuss how credible sponsors can structure partnerships and consortia that resonate with decision-makers while meeting international governance standards.',
    ].join('\n\n'),
  },
];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostSummaries(): BlogPostCardProps[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    imageUrl: post.imageUrl,
    imageHint: post.imageHint,
    excerpt: post.excerpt,
  }));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}