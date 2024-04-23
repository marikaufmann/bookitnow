import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { ArticleType, HotelArticleType } from "../types";
import PageNotFound from "../components/PageNotFound";

const Article = () => {
  const { articleId } = useParams();
  const { data: article, isLoading } = useQuery<ArticleType>("fetchArticles", () =>
    apiClient.fetchArticleById(articleId!)
  );
  if (!article && !isLoading) {
    return <PageNotFound />;
  }
  if (!article) {
    return "";
  }
  return (
    <div className="min-h-screen pb-40">
      <div className="w-full">
        <img
          src={article.imageUrl}
          alt=""
          className="w-full object-cover object-center h-[300px]"
        />
      </div>
      <div className="max-w-7xl w-full mx-auto flex-1 sm:px-4 px-1 ">
        <h1 className="text-3xl max-sm:max-w-sm text-center mx-auto sm:text-5xl  font-bold mt-14">
          {article.title}
        </h1>
        <p className="mt-10 text-gray-700 text-justify">{article.text}</p>
        {article?.hotels?.map((hotel: HotelArticleType) => (
          <div key={hotel._id} className="">
            <h3 className="text-3xl max-sm:max-w-sm text-center mx-auto sm:text-4xl font-bold mt-16">
              {hotel.name}
            </h3>
            <div className="mt-6">
              <img src={hotel.imageUrl} alt="" className="" />
            </div>
            <p className="text-sm text-gray-500">{hotel.caption}</p>
            <p className="mt-10 text-justify">{hotel.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
