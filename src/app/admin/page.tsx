export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center my-12">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-12 m-3 md:m-12 p-3 md:p-12">
        <div className="bg-gray-800 text-center p-12 rounded-lg">
          Manage Users
        </div>
        <div className="bg-gray-800 text-center p-12 rounded-lg">
          Lessons Manage
        </div>
        <div className="bg-gray-800 text-center p-12 rounded-lg">
          Vocabulary Manage
        </div>
        <div className="bg-gray-800 text-center p-12 rounded-lg">
          Manage Tutorials
        </div>
      </div>
    </div>
  );
}
