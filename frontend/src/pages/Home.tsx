import Recommendations from "../components/Recommendations.tsx";
import Trending from "../components/Trending.tsx";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";
import BrowseByType from "../components/BrowseByType.tsx";
import LatestDestinations from "../components/LatestDestinations.tsx";
import Articles from "../components/Articles.tsx";

const Home = () => {
  const { data: hotels } = useQuery("fetchHotels", apiClient.fetchHotels);

  return (
    <div className="max-w-7xl w-full mx-auto flex-1 sm:px-4 px-1">
      <div className="min-h-screen laptop:py-10 py-48">
        <Trending />
        <Recommendations hotels={hotels ? hotels : []} />
        <Articles />
        <BrowseByType />
        <LatestDestinations />
      </div>
    </div>
  );
};

export default Home;
