import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();
  if (location.pathname === "/sign-in" || location.pathname === "/register") {
    return null;
  }
  return <div className="bg-green-200">search</div>
};

export default SearchBar;
