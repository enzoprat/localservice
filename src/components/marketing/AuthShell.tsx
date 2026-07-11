import Link from "next/link";
import { IconLogo } from "@/components/icons";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="light relative grid min-h-screen place-items-center overflow-hidden bg-sand px-5 py-16">
      <div className="dot-grid absolute inset-0 -z-10" />
      <div className="w-full max-w-lg">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5 text-stone">
          <IconLogo />
          <span className="text-lg font-semibold tracking-tight">Jacob</span>
        </Link>
        {children}
      </div>
    </main>
  );
}
