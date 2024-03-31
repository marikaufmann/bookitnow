import { Star } from "lucide-react";

const StarRatingFilter = ({
  onChange,
  selectedStars,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedStars: string[];
}) => {
  return (
    <div className="py-4 px-4">
      <h3 className="font-semibold mb-2">Property rating</h3>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex gap-2" key={index}>
            <input
              type="checkbox"
              value={(index + 1).toString()}
              onChange={onChange}
              checked={selectedStars.includes((index + 1).toString())}
            />
            <div className="flex">
              {Array.from({ length: index + 1 }).map((_, index) => (
                <div key={index}>
                  <Star className="w-3 h-3 md:w-4 md:h-4  fill-yellow-400  text-yellow-400" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarRatingFilter;
