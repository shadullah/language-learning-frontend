import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <Navbar /> */}
      <main>{children}</main>
    </div>
  );
}
