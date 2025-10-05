"use client";

import { FaFilter, FaChevronDown } from "react-icons/fa";
import { CategoryFilter } from "./CategoryFilter";
import { PriceRange } from "./PriceRange";
import { AvailabilityFilters } from "./AvalabilityFilters";

export const filterShop = [
  "All",
  "Dresses",
  "T-Shirt",
  "Cardigan",
  "Hoodie",
  "Sweatshirts",
  "Polo Shirts",
  "Jackets",
  "Vest",
  "Blouses",
  "Long Sleeved Shirts",
  "Knitwear",
  "Jeans",
  "Skirt",
  "Formal",
];

export const filterItem = [
  { title: "All Filters", icon: <FaFilter /> },
  { title: "Price Range", icon: <FaChevronDown /> },
  { title: "Category", icon: <FaChevronDown /> },
];

export const categoryItems = [
  { title: "Dresses" },
  { title: "Tops & Blouses" },
  { title: "T-Shirts" },
  { title: "Sweaters & Cardigans" },
  { title: "Hoodies & Sweatshirts" },
  { title: "Jackets & Coats" },
  { title: "Pants & Trousers" },
  { title: "Jeans" },
  { title: "Skirts" },
  { title: "Shorts" },
  { title: "Activewear & Sportswear" },
  { title: "Loungewear & Sleepwear" },

  // Shoes
  { title: "Sneakers" },
  { title: "Heels" },
  { title: "Flats" },
  { title: "Sandals" },
  { title: "Boots" },

  // Accessories
  { title: "Handbags & Clutches" },
  { title: "Belts" },
  { title: "Hats & Caps" },
  { title: "Scarves & Shawls" },
  { title: "Sunglasses" },
  { title: "Jewelry" },

  // Outerwear for seasons
  { title: "Raincoats" },
  { title: "Winter Coats" },
  { title: "Lightweight Jackets" },

  // Occasion-based
  { title: "Casual" },
  { title: "Office Wear" },
  { title: "Party & Evening Wear" },
  { title: "Formal Events" },
  { title: "Beach & Resort Wear" },
];

export const availabilityFilters = [
  { title: "In Stock" },
  { title: "Out of Stock" },
  { title: "Preorder" },
];

export const filterKey = [
  {
    key: "stock",
    title: "Stock Availability",
    component: <AvailabilityFilters />,
  },
  {
    key: "price",
    title: "Price Range",
    component: <PriceRange />,
  },
  {
    key: "category",
    title: "Category",
    component: <CategoryFilter />,
  },
] as const;
