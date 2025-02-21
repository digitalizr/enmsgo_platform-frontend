import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>
      <p className="text-gray-600">Role: {user?.role}</p>

      {user?.role === "SuperAdmin" && <p>Manage Tenants & Users</p>}
      {user?.role === "Admin" && <p>Manage Smart Meters</p>}
      {user?.role === "Operator" && <p>View Smart Meter Data</p>}
    </div>
  );
};

export default Dashboard;
