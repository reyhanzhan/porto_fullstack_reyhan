import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SquaresBackground } from "@/components/layout/squares-bg";

import { auth } from "@/lib/auth";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <div className="relative flex min-h-screen flex-col">
      <SquaresBackground />
      <Navbar isLoggedIn={!!session?.user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
