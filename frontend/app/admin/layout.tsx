// app/admin/layout.tsx
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/Admin/AdminLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <AdminLayout user={session.user}>
      {children}
    </AdminLayout>
  );
}