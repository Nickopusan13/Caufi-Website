import type { Metadata } from "next";
import UserAdmin from "@/components/admin/user/UserAdmin";

export const metadata: Metadata = {
  title: "Caufi",
  description: "Caufi Users Admin",
};

export default function UserAdminPage() {
  return <UserAdmin />;
}
