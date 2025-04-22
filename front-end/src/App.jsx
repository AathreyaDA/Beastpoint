import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Ticketing from "./pages/Ticketing";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InventoryManagement from "./pages/admin/InventoryManagement";
import AddInventoryItem from "./pages/admin/AddInventoryItem";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffRegister from "./pages/staff/StaffRegister";
import Animals from "./pages/Animals";
import Navbar from "./components/Navbar";
import EditInventoryItem from "./pages/admin/EditInventoryItem";
import AddAnimal from "./pages/admin/AddAnimal";
import ManageStaff from "./pages/admin/ManageStaff";
import EditStaff from "./pages/admin/EditStaff";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useContext(AuthContext);
  return admin ? children : <Navigate to="/admin/login" replace />;
};

const ProtectedStaffRoute = ({ children }) => {
  const { staff } = useContext(AuthContext);
  return staff ? children : <Navigate to="/staff/login" replace />;
};

const App = () => (
  <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ticketing" element={<Ticketing />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route path="/staff/register" element={<StaffRegister />} />
      <Route path="/animals" element={<Animals />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/inventory"
        element={
          <ProtectedAdminRoute>
            <InventoryManagement />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/inventory/add"
        element={
          <ProtectedAdminRoute>
            <AddInventoryItem />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/inventory/edit/:id"
        element={
          <ProtectedAdminRoute>
            <EditInventoryItem />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/animals/add"
        element={
          <ProtectedAdminRoute>
            <AddAnimal />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/staff/manage"
        element={
          <ProtectedAdminRoute>
            <ManageStaff />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/staff/edit/:id"
        element={
          <ProtectedAdminRoute>
            <EditStaff />
          </ProtectedAdminRoute>
        }
      />

      {/* Protected Staff Routes */}
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedStaffRoute>
            <StaffDashboard />
          </ProtectedStaffRoute>
        }
      />
    </Routes>
  </AuthProvider>
);

export default App;
