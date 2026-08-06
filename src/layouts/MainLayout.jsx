import { Outlet } from "react-router-dom";

import Footer from "../components/footer/Footer";

export default function MainLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <section id="support">
        <Footer />
      </section>
    </>
  );
}
