import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { ArticleType } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
const Articles = () => {
  const { data: articles } = useQuery<ArticleType[]>(
    "fetchArticles",
    apiClient.fetchArticles
  );
  return (
    <div className="mt-3">
      <h1 className="text-title md:text-3xl text-xl font-bold mb-4">
        Get inspitation for your next trip
      </h1>
      <Swiper
        cssMode={true}
        slidesPerView={2}
        spaceBetween={25}
        navigation={true}
        modules={[Pagination, Navigation, Mousewheel, Keyboard]}
        className=" flex gap-2"
      >
        {articles && articles.length ? (
          articles.map((article: ArticleType) => (
            <>
              <SwiperSlide
                key={article._id}
                className="relative h-[300px] rounded-md overflow-hidden hover:shadow-2xl"
              >
                <Link to={`/article/${article._id}`}>
                  <img
                    src={article.imageUrl}
                    alt=""
                    className="w-full h-full object-cover object-center rounded-md hover:scale-[104%] transition-all ease-out"
                  />
                  <div className="absolute bg-black/40 bottom-0 left-0 right-0 p-2">
                    <h3 className=" text-bg font-semibold text-xl">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            </>
          ))
        ) : (
          <div>articles not found</div>
        )}
      </Swiper>
    </div>
  );
};

export default Articles;
