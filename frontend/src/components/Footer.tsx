import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-gray-100 pt-12 py-6 inset-x-0 bottom-0 px-6 md:px-10">
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        <div className=" flex sm:flex-row flex-col sm:gap-4 gap-8 justify-between items-start">
          <div className="flex flex-col gap-3">
            <Link to="/">
              <div className="h-[20px] w-full">
                <img src="/logo-transparent.png" className="h-full" />
              </div>
            </Link>
            <p className="text-secondary text-xs">
              Your favorite hotel booking experience.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold mb-2 max-sm:text-sm">Company</h1>
              <div className="flex flex-col gap-2">
                <p className="sm:text-sm text-xs text-title">About us</p>
                <p className="sm:text-sm text-xs text-title">Press</p>
                <p className="sm:text-sm text-xs text-title">
                  Resources and policies
                </p>
                <p className="sm:text-sm text-xs text-title">Careers</p>
                <p className="sm:text-sm text-xs text-title">Trust & safety</p>
                <p className="sm:text-sm text-xs text-title">Contact us</p>
                <p className="sm:text-sm text-xs text-title">
                  Accessibility statement
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold mb-2 max-sm:text-sm">Explore</h1>
              <div className="flex flex-col gap-2">
                <p className="sm:text-sm text-xs text-title">Write a review</p>
                <p className="sm:text-sm text-xs text-title">Add a place</p>
                <p className="sm:text-sm text-xs text-title">Join</p>
                <p className="sm:text-sm text-xs text-title">
                  Traveler's choice
                </p>
                <p className="sm:text-sm text-xs text-title">Blog</p>
                <p className="sm:text-sm text-xs text-title">Help center</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold mb-2 max-sm:text-sm">Do business with us</h1>
              <div className="flex flex-col gap-2">
                <p className="sm:text-sm text-xs text-title">Owners</p>
                <p className="sm:text-sm text-xs text-title">
                  Business advantage
                </p>
                <p className="sm:text-sm text-xs text-title">
                  Sponsored placements
                </p>
                <p className="sm:text-sm text-xs text-title">
                  Advertise with us
                </p>
                <p className="sm:text-sm text-xs text-title">
                  Access our Content API
                </p>
                <p className="sm:text-sm text-xs text-title">
                  Become an affiliate
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold mb-2 max-sm:text-sm">Get the App</h1>
              <div className="flex flex-col gap-2">
                <p className="sm:text-sm text-xs text-title">iPhone app</p>
                <p className="sm:text-sm text-xs text-title">Android app</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:self-end text-xs text-secondary">
          © {new Date().getFullYear()} BookItNow LLC All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
