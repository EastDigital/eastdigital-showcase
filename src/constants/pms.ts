export const ADMIN_EMAIL = "eastdigitalcompany@gmail.com" as const;

export const CATEGORIES = [
  "REAL ESTATE",
  "INFRASTRUCTURE",
  "ARCHITECTURE & DESIGN",
] as const;

export const SUBCATEGORIES: Record<typeof CATEGORIES[number], string[]> = {
  "REAL ESTATE": [
    "3D Walkthrough Video",
    "3D Still Renderings",
  ],
  "INFRASTRUCTURE": [
    "Conceptual 3D Renderings",
    "Engineering 3D Models",
  ],
  "ARCHITECTURE & DESIGN": [
    "Architectural 3D Rendering",
    "Product 3D Rendering",
  ],
};

export type ProjectStatus = "Published" | "Draft";
