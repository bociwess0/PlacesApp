import { Route, Routes } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Users from "../pages/Users";
import Places from "../pages/Places";
import AddPlace from "../pages/AddPlace";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route path="/" element={<Users />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/new" element={<AddPlace />} />
      </Route>
    </Routes>
  );
}
