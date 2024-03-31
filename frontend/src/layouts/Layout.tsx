import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-bg flex flex-col font-public">
      <Header />
      {(location.pathname === "/" ||
        location.pathname === "/search" ||
        location.pathname === "/details/:hotelId") && (
        <>
          <Hero /> <SearchBar />{" "}
        </>
      )}

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
