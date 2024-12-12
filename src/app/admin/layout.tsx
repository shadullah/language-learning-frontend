import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav>Admin Navigation</nav>
      <main>{children}</main>
    </div>
  );
}
