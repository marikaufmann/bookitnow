import { Link, useLocation } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { AlignJustify, X, Hotel, TicketCheck } from "lucide-react";
import { useAppContext } from "../hooks/use-app-context";
import SignOutButton from "./SignOutButton";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  mobileNavContainerVariant,
  mobileNavExitProps,
  mobileNavListVariant,
} from "../config/animation-config";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAppContext();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  return (
    <div className="w-full bg-headerbg  z-10  ">
      <div className="max-w-7xl mx-auto py-2 px-4 md:px-8  flex justify-between items-center gap-4">
        <Link to="/">
          <div className="sm:h-[45px] h-[30px] w-full">
            <img src="/logo.png" className="h-full" />
          </div>
        </Link>
        <div className="lg:gap-6 gap-2  hidden md:flex items-center text-sm">
          {isLoggedIn ? (
            <>
              <div className="flex ">
                <Link to="/my-bookings">
                  <button className="bg-transprent text-bg px-4 py-2 rounded-md hover:bg-mutedbgblue/10">
                    My Bookings
                  </button>
                </Link>
                <Link to="/my-hotels" className="border-r border-gray-600 pr-6">
                  <button className="bg-transparent text-bg px-4 py-2 rounded-md hover:bg-mutedbgblue/10">
                    My Hotels
                  </button>
                </Link>
              </div>
              <SignOutButton styles="" />
            </>
          ) : (
            <div className="flex gap-3 divide-x divide-gray-600">
              <Link to="/register" className="flex">
                <button className=" text-bg py-2 px-3  text-normal tracking-wide  rounded-md hover:bg-[#505c7f]">
                  Sign Up
                </button>
              </Link>
              <Link to="/sign-in " className="">
                <button className=" text-bg py-2 px-3 ml-3 text-normal tracking-wide rounded-md hover:bg-[#505c7f] ">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden flex gap-3 items-center">
          <div
            className="hover:bg-white/10 p-2 rounded cursor-pointer"
            onClick={toggleNavbar}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-bg" />
            ) : (
              <AlignJustify className="w-6 h-6 text-bg" />
            )}
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            layout="position"
            key="nav-links"
            variants={mobileNavContainerVariant}
            initial="hidden"
            animate="show"
            className="mt-2 pb-2 basis-full md:hidden flex justify-center items-center flex-col "
          >
            {isLoggedIn ? (
              <>
                <motion.div
                  variants={mobileNavListVariant}
                  {...mobileNavExitProps}
                >
                  <Link to="/my-bookings">
                    <button className="bg-transprent text-bg w-[200px] px-4 py-2  text-sm rounded-md flex gap-2 justify-center items-center hover:bg-mutedbgblue/10">
                      <TicketCheck className="w-6 h-6  text-bg " />
                      My Bookings
                    </button>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileNavListVariant}
                  {...mobileNavExitProps}
                >
                  <Link to="/my-hotels">
                    <button className="bg-transparent text-bg w-[200px] px-4 py-2 mt-2 mb-2 rounded-md text-sm flex gap-2 justify-center items-center hover:bg-mutedbgblue/10">
                      <Hotel className="w-6 h-6  text-bg " />
                      My Hotels
                    </button>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileNavListVariant}
                  {...mobileNavExitProps}
                >
                  <SignOutButton
                    styles="bg-transprent text-bg w-[200px] px-4 py-2  text-sm rounded-md flex gap-2 justify-center items-center hover:bg-mutedbgblue/10"
                    closeNav={() => setIsOpen(false)}
                  />
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  variants={mobileNavListVariant}
                  {...mobileNavExitProps}
                >
                  <Link to="/register " className="">
                    <button className=" text-bg w-[200px] py-2 px-3 ml-3 text-normal text-sm flex gap-2 justify-center items-center rounded-md hover:bg-[#505c7f] ">
                      Sign Up
                    </button>
                  </Link>
                </motion.div>
                <motion.div
                  variants={mobileNavListVariant}
                  {...mobileNavExitProps}
                >
                  <Link to="/sign-in " className="">
                    <button className=" text-bg w-[200px] py-2 px-3 ml-3 text-normal text-sm flex gap-2 justify-center items-center rounded-md hover:bg-[#505c7f] ">
                      Login
                    </button>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
