import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SquaresBackground } from "@/components/layout/squares-bg";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SquaresBackground />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
