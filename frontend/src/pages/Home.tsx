import { useNavigate } from "react-router-dom";
import Recommendations from "../components/Recommendations.tsx";
import Trending from "../components/Trending.tsx";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import BrowseByType from "../components/BrowseByType.tsx";
import LatestDestinations from "../components/LatestDestinations.tsx";
import Articles from "../components/Articles.tsx";

const Home = () => {
  const navigate = useNavigate();
  const { data: hotels } = useQuery("fetchHotels", apiClient.fetchHotels);

  const handleSearch = (destinationWithFlag: string) => {
    const destination = destinationWithFlag.split(' ')[0]
    sessionStorage.setItem("destination", destination);
    navigate("/search");
    navigate(0);
  };
  return (
    <div className="max-w-7xl w-full mx-auto flex-1 px-8">

    <div className="min-h-screen laptop:py-10 py-48">
      <Trending
        handleSearch={(destination: string) => handleSearch(destination)}
      />
      <Recommendations hotels={hotels ? hotels : []} />
      <Articles/>
      <BrowseByType/>
      <LatestDestinations/>

    </div>
    </div>
  );
};

export default Home;
