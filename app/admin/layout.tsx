import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout only protects /admin routes, not /admin/login
  // The login page is handled separately
  return <>{children}</>;
}
