import Sidebar from "./components/Siderbar";
import Header from "./layout/Header";
// import Users from "./user/pages/Users";

function App() {
  return (
    <div className="min-h-screen bg-[#111827]">
      <Header />
      <div className="flex">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
