import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
// import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-bg flex flex-col font-public">
      <Header />
      {location.pathname === "/" && <Hero />}
      {/* <SearchBar /> */}
      <div className="max-w-7xl w-full mx-auto flex-1 px-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
