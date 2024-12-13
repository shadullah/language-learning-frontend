"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  fullname: string;
  role: string;
  email: string;
}

const UsersAdminControll = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editRoleId, setEditRoleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/users");
        const data = response.data.data;
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axios.patch(`/api/v1/users/${userId}`, { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success("User role updated successfully");
      setEditRoleId(null);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-12">
        All Users
      </h1>
      <div className="main">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 m-3 md:m-12 p-3 md:p-12">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-800 text-white shadow-md rounded-lg "
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    User: {user.fullname}
                  </h2>
                  <p className="text-sm">Email: {user.email}</p>
                  <p className="text-sm flex items-center">
                    Role:
                    {editRoleId === user._id ? (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="w-full mt-2 p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <>
                        <span className="ml-2">{user.role}</span>
                        <button
                          className="ml-4 text-blue-500 underline"
                          onClick={() => setEditRoleId(user._id)}
                        >
                          Edit Role
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersAdminControll;
