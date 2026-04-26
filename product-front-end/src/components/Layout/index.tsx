import { Outlet } from "react-router-dom";
import { Navbar } from "../Header";

export const DefaultLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* A Navbar fixa no topo */}
      <Navbar />
      
      {/* O Outlet é onde as páginas (App, Create, Details) serão renderizadas */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};