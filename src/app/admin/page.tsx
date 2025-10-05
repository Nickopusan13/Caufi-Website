import type { Metadata } from "next";
import Dashboard from "@/components/admin/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Caufi",
  description: "Caufi admin page",
};

export default function AdminPage() {
  return <Dashboard />;
}
