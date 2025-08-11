export const ADMIN_EMAIL = "eastdigitalcompany@gmail.com" as const;

export const CATEGORIES = [
  "REAL ESTATE",
  "INFRASTRUCTURE",
  "ARCHITECTURE & DESIGN",
] as const;

export const SUBCATEGORIES: Record<typeof CATEGORIES[number], string[]> = {
  "REAL ESTATE": [
    "3D Walkthrough Videos",
    "Architectural Still Renderings",
    "Interactive Virtual Tours",
  ],
  "INFRASTRUCTURE": [
    "Conceptual 3D Renderings",
    "Process Animations",
    "Engineering 3D Models",
  ],
  "ARCHITECTURE & DESIGN": [
    "3D Architectural Rendering",
    "Virtual Staging",
    "Product 3D Renderings",
  ],
};

export type ProjectStatus = "Published" | "Draft";
