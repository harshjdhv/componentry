import { components } from "@/registry";

type NavItem = {
  title: string;
  href: string;
  items?: NavItem[];
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const gettingStarted: NavGroup = {
  title: "Getting Started",
  items: [
    {
      title: "Introduction",
      href: "/docs",
    },
  ],
};

const categoryOrder = [
  "Text Animations",
  "Components",
  "Hero Backgrounds",
  "Visual Effects",
];

const getComponentNav = (): NavGroup[] => {
  const groups: Record<string, NavGroup> = {};

  Object.values(components).forEach((component) => {
    if (!groups[component.category]) {
      groups[component.category] = {
        title: component.category,
        items: [],
      };
    }
    groups[component.category]!.items.push({
      title: component.title,
      href: `/docs/components/${component.slug}`,
    });
  });

  // Sort items within groups alphabetically
  Object.keys(groups).forEach((key) => {
    groups[key]!.items.sort((a, b) => a.title.localeCompare(b.title));
  });

  // Return groups in defined order
  return categoryOrder
    .map((category) => groups[category])
    .filter(Boolean) as NavGroup[];
};

const getLlmsText = () => {
  const baseUrl = "https://componentry.fun";
  let text = `# Componentry

> Componentry is a collection of beautifully-designed, accessible components and visual effects. It is built with TypeScript, Tailwind CSS, and Framer Motion. Open Source. Copy and paste into your apps.

## Overview`;

  gettingStarted.items.forEach((item) => {
    text += `\n- [${item.title}](${baseUrl}${item.href}): Getting started with Componentry.`;
  });

  text += `\n\n## Components`;

  categoryOrder.forEach((category) => {
    text += `\n\n### ${category}\n\n`;
    const categoryComponents = Object.values(components)
      .filter((c) => c.category === category)
      .sort((a, b) => a.title.localeCompare(b.title));

    categoryComponents.forEach((component) => {
      text += `- [${component.title}](${baseUrl}/docs/components/${component.slug}): ${component.description}\n`;
    });
  });

  return text;
};

export const docsConfig = {
  nav: [gettingStarted, ...getComponentNav()],
  llms: {
    text: getLlmsText(),
  },
};
