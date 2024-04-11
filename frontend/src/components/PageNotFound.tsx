import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const PageNotFound = () => {
  return (
    <div className="bg-[#0092C4]  flex flex-col items-center justify-center min-h-screen">
      <img src="/404.jpg" alt="" className="h-[500px] -mt-80 " />
      <Link
        className="-mt-4 bg-bg text-primary rounded-lg px-4 py-2 shadow-2xl font-bold hover:scale-[103%] transition-all ease-out flex gap-2 items-center"
        to="/"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to home
      </Link>
    </div>
  );
};

export default PageNotFound;
