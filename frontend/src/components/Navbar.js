import React from "react";
import { logout, getCurrentUser } from "../utils/auth";

function Navbar() {
  const user = getCurrentUser();

  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <h1 className="text-lg font-bold">LMS Dashboard</h1>
      <div className="flex items-center gap-4">
        {user && <span>Halo, {user.name}</span>}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
