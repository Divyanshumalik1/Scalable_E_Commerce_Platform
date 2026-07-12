// app/(store)/layout.tsx
import { auth0 } from "@/lib/auth0";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  return (
    <>
      <Header user={session?.user} />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}