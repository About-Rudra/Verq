import Sidebar from "./Sidebar";

export default function AppLayout({ children, onLogout }) {
  return (
    <div className="app-container">
      <Sidebar onLogout={onLogout} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
