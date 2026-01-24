import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function ClientLayout() {
  return (
    <>
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
