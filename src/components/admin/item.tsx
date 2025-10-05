"use client";

import { AiFillProduct, AiOutlineDashboard } from "react-icons/ai";
import { BiSolidUserAccount, BiSolidReport } from "react-icons/bi";
import { ImCart } from "react-icons/im";
import { IoSettings } from "react-icons/io5";

export const menus = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <AiOutlineDashboard /> },
  { name: "Products", path: "/admin/product", icon: <AiFillProduct /> },
  { name: "Users", path: "/admin/users", icon: <BiSolidUserAccount /> },
  { name: "Orders", path: "/admin/orders", icon: <ImCart /> },
  { name: "Reports", path: "/admin/reports", icon: <BiSolidReport /> },
  { name: "Settings", path: "/admin/settings", icon: <IoSettings /> },
];

export const salesData = [
  { month: "Jan", 2025: 1200, 2024: 950 },
  { month: "Feb", 2025: 1500, 2024: 1100 },
  { month: "Mar", 2025: 1300, 2024: 1050 },
  { month: "Apr", 2025: 1400, 2024: 1200 },
  { month: "May", 2025: 1250, 2024: 1150 },
  { month: "Jun", 2025: 1600, 2024: 1300 },
  { month: "Jul", 2025: 1700, 2024: 1400 },
  { month: "Aug", 2025: 1550, 2024: 1350 },
  { month: "Sep", 2025: 1450, 2024: 1250 },
  { month: "Oct", 2025: 1650, 2024: 1500 },
  { month: "Nov", 2025: 1750, 2024: 1600 },
  { month: "Dec", 2025: 1800, 2024: 1650 },
];

export const weeklySales = [
  { day: "Mon", sales: 200 },
  { day: "Tue", sales: 300 },
  { day: "Wed", sales: 392 },
  { day: "Thu", sales: 217 },
  { day: "Fri", sales: 173 },
  { day: "Sat", sales: 98 },
  { day: "Sun", sales: 287 },
];

export const weeklyShipping = [
  { day: "Mon", shipping: 200 },
  { day: "Tue", shipping: 300 },
  { day: "Wed", shipping: 392 },
  { day: "Thu", shipping: 217 },
  { day: "Fri", shipping: 173 },
  { day: "Sat", shipping: 98 },
  { day: "Sun", shipping: 287 },
];

export const monthlyCategorySales = [
  {
    month: "January",
    shirts: 535,
    shoes: 308,
    hats: 164,
    bags: 92,
  },
  {
    month: "February",
    shirts: 475,
    shoes: 315,
    hats: 150,
    bags: 81,
  },
  {
    month: "March",
    shirts: 558,
    shoes: 352,
    hats: 169,
    bags: 96,
  },
  {
    month: "April",
    shirts: 498,
    shoes: 305,
    hats: 140,
    bags: 81,
  },
  {
    month: "May",
    shirts: 509,
    shoes: 357,
    hats: 142,
    bags: 86,
  },
  {
    month: "June",
    shirts: 586,
    shoes: 300,
    hats: 139,
    bags: 89,
  },
  {
    month: "July",
    shirts: 546,
    shoes: 298,
    hats: 178,
    bags: 88,
  },
  {
    month: "August",
    shirts: 510,
    shoes: 361,
    hats: 133,
    bags: 93,
  },
  {
    month: "September",
    shirts: 580,
    shoes: 320,
    hats: 145,
    bags: 98,
  },
  {
    month: "October",
    shirts: 565,
    shoes: 348,
    hats: 170,
    bags: 102,
  },
  {
    month: "November",
    shirts: 605,
    shoes: 390,
    hats: 195,
    bags: 115,
  },
  {
    month: "December",
    shirts: 650,
    shoes: 420,
    hats: 210,
    bags: 130,
  },
];

export const ReturningCustomerRatio = [
  { month: "June", date: 1, newUsers: 293, returning: 323 },
  { month: "June", date: 2, newUsers: 301, returning: 319 },
  { month: "June", date: 3, newUsers: 287, returning: 330 },
  { month: "June", date: 4, newUsers: 295, returning: 156 },
  { month: "June", date: 5, newUsers: 310, returning: 328 },
  { month: "June", date: 6, newUsers: 280, returning: 335 },
  { month: "June", date: 7, newUsers: 298, returning: 320 },
  { month: "June", date: 8, newUsers: 305, returning: 317 },
  { month: "June", date: 9, newUsers: 290, returning: 325 },
  { month: "June", date: 10, newUsers: 300, returning: 322 },
  { month: "June", date: 11, newUsers: 285, returning: 330 },
  { month: "June", date: 12, newUsers: 292, returning: 318 },
  { month: "June", date: 13, newUsers: 307, returning: 324 },
  { month: "June", date: 14, newUsers: 294, returning: 321 },
  { month: "June", date: 15, newUsers: 299, returning: 316 },
  { month: "June", date: 16, newUsers: 230, returning: 329 },
  { month: "June", date: 17, newUsers: 288, returning: 323 },
  { month: "June", date: 18, newUsers: 296, returning: 320 },
  { month: "June", date: 19, newUsers: 304, returning: 326 },
  { month: "June", date: 20, newUsers: 291, returning: 319 },
  { month: "June", date: 21, newUsers: 297, returning: 331 },
  { month: "June", date: 22, newUsers: 302, returning: 317 },
  { month: "June", date: 23, newUsers: 289, returning: 324 },
  { month: "June", date: 24, newUsers: 306, returning: 322 },
  { month: "June", date: 25, newUsers: 294, returning: 328 },
  { month: "June", date: 26, newUsers: 300, returning: 315 },
  { month: "June", date: 27, newUsers: 298, returning: 330 },
  { month: "June", date: 28, newUsers: 100, returning: 319 },
  { month: "June", date: 29, newUsers: 292, returning: 325 },
  { month: "June", date: 30, newUsers: 299, returning: 321 },
];

export const earningsVsProjected = [
  { month: "June", date: 28, projected: 185, actual: 375 },
  { month: "June", date: 29, projected: 184, actual: 345 },
  { month: "June", date: 30, projected: 178, actual: 422 },
  { month: "July", date: 1, projected: 177, actual: 357 },
  { month: "July", date: 2, projected: 177, actual: 381 },
  { month: "July", date: 3, projected: 185, actual: 343 },
  { month: "July", date: 4, projected: 183, actual: 369 },
];
