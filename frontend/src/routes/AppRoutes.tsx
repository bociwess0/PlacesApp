import { Route, Routes } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Users from "../pages/Users";
import Places from "../pages/Places";
import AddPlace from "../pages/AddPlace";
import Auth from "../pages/Auth";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route path="/auth" element={<Auth />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Places />} />
        <Route path="/add-place" element={<AddPlace />} />
      </Route>
    </Routes>
  );
}
