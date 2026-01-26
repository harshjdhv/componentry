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

export const docsConfig = {
  nav: [gettingStarted, ...getComponentNav()],
};
