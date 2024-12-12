import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link href="/admin/users">Manage Users</Link>
        </li>
        <li>
          <Link href="/admin/lessons">Manage Lessons</Link>
        </li>
        <li>
          <Link href="/admin/lessons">Manage Vocabularies</Link>
        </li>
        <li>
          <Link href="/admin/tutorials">Manage Tutorials</Link>
        </li>
      </ul>
    </div>
  );
}
