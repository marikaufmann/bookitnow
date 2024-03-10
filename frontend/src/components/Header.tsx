import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { useAppContext } from "../hooks/use-app-context";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="w-full bg-headerbg py-3    inset-x-0 px-6 md:px-10 z-40 md:h-[125px] h-[100px]">
      <div className="max-w-7xl mx-auto  flex justify-between items-center gap-4">
        <Link to="/">
          <div className="md:h-[90px] h-[70px] w-full">
            <img src="/logo.png" className="h-full" />
          </div>
        </Link>
        <div className="lg:gap-6 gap-2 md:font-semibold hidden md:flex items-center text-sm">
          {isLoggedIn ? (
            <>
              <div className="flex ">
                <Link to="/my-bookings">
                  <button className="bg-transprent text-bg px-4 py-2 rounded-md hover:bg-mutedbgblue/10">
                    My Bookings
                  </button>
                </Link>
                <Link to="/my-hotels">
                  <button className="bg-transparent text-bg px-4 py-2 rounded-md hover:bg-mutedbgblue/10">
                    My Hotels
                  </button>
                </Link>
              </div>

              <SignOutButton />
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/register" className="flex">
                <button className="bg-bg text-primary px-3 py-2 rounded-md hover:bg-mutedbgblue">
                  Register
                </button>
              </Link>
              <Link to="/sign-in">
                <button className="bg-bg text-primary px-3 py-2 rounded-md hover:bg-mutedbgblue">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden flex gap-6">
          <CircleUserRound className="w-6 h-6 text-bg" />
          <AlignJustify className="w-6 h-6 text-bg" />
        </div>
      </div>
    </div>
  );
};

export default Header;
