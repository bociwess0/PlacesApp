import Sidebar from "./components/Siderbar";
import Dashboard from "./layout/Dashboard";
import Header from "./layout/Header";

function App() {
  return (
    <div className="min-h-screen bg-[#111827]">
      <Header />
      <div className="flex">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
