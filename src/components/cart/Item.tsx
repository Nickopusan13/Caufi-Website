export type CartItem = {
  category: string | null;
  title: string | null;
  images: string[] | null;
  price: number | null;
  color: string | null;
  size: string | null;
  quantity: number | null;
  href: string | null;
  stock: number | null;
};

export const productCart = [
  {
    category: "T-shirt",
    title: "Crazy Basic T-shirt",
    images: ["/assets/Clothes.png", "/assets/Clothes2.png"],
    price: 1200000,
    color: "purple",
    size: "M",
    quantity: 1,
    href: "/",
    stock: 10,
  },
  {
    category: "T-shirt",
    title: "Crazy Basic T-shirt",
    images: ["/assets/Clothes.png", "/assets/Clothes2.png"],
    price: 1200000,
    color: "blue",
    size: "XS",
    quantity: 3,
    href: "/",
    stock: 6,
  },
  {
    category: "T-shirt",
    title: "Crazy Basic T-shirt",
    images: ["/assets/Clothes.png", "/assets/Clothes2.png"],
    price: 1200000,
    color: "blue",
    quantity: 3,
    size: "XS",
    href: "/",
    stock: 13,
  },
  {
    category: "T-shirt",
    title: "Crazy Basic T-shirt",
    images: ["/assets/Clothes.png", "/assets/Clothes2.png"],
    price: 1200000,
    color: "blue",
    quantity: 2,
    size: "XS",
    href: "/",
    stock: 20,
  },
  {
    category: "T-shirt",
    title: "Crazy Basic T-shirt",
    images: ["/assets/Clothes.png", "/assets/Clothes2.png"],
    price: 1200000,
    color: "blue",
    quantity: 1,
    size: "XS",
    href: "/",
    stock: 7,
  },
];

export const availableVouchers = [
  {
    id: 1,
    title: "8% Off Voucher",
    code: "VOUCHER8",
    description: "Get 10% off on your next purchase",
    discount: 8,
    expiryDate: "2024-12-31",
    isActive: true,
  },
  {
    id: 2,
    title: "10% Off Voucher",
    code: "VOUCHER10",
    description: "Get 10% off on your next purchase",
    discount: 10,
    expiryDate: "2024-12-31",
    isActive: true,
  },
  {
    id: 3,
    title: "13% Off Voucher",
    code: "VOUCHER10",
    description: "Get 10% off on your next purchase",
    discount: 13,
    expiryDate: "2024-12-31",
    isActive: true,
  },
  {
    id: 4,
    title: "10% Off Voucher",
    code: "VOUCHER10",
    description: "Get 10% off on your next purchase",
    discount: 13,
    expiryDate: "2024-12-31",
    isActive: true,
  },
  {
    id: 5,
    title: "10% Off Voucher",
    code: "VOUCHER10",
    description: "Get 10% off on your next purchase",
    discount: 13,
    expiryDate: "2024-12-31",
    isActive: true,
  },
  {
    id: 6,
    title: "10% Off Voucher",
    code: "VOUCHER10",
    description: "Get 10% off on your next purchase",
    discount: 13,
    expiryDate: "2024-12-31",
    isActive: true,
  },
  {
    id: 7,
    title: "10% Off Voucher",
    code: "VOUCHER10",
    description: "Get 10% off on your next purchase",
    discount: 13,
    expiryDate: "2024-12-31",
    isActive: true,
  },
  {
    id: 8,
    title: "10% Off Voucher",
    code: "VOUCHER10",
    description: "Get 10% off on your next purchase",
    discount: 13,
    expiryDate: "2024-12-31",
    isActive: true,
  },
];
