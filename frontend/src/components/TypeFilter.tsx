import { useState } from "react";
import { hotelTypes } from "../config/hotel-options-config";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
const TypeFilter = ({
  onChange,
  selectedTypes,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTypes: string[];
}) => {
  const types = hotelTypes;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="pt-4 px-4 pb-3">
      <h3 className="font-semibold mb-2">Property Type</h3>
      <ul className="flex flex-col gap-2 text-sm ">
        {types.slice(0, 5).map((type) => (
          <li className="flex gap-2 items-center" key={type}>
            <input
              type="checkbox"
              value={type}
              onChange={onChange}
              checked={selectedTypes.includes(type)}
            />
            <span>{type}</span>
          </li>
        ))}
        {!isOpen && (
          <div
            className="flex items-center text-primary cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Show all {types.length}
            <ChevronDown className="ml-1 w-5 h-5" />
          </div>
        )}
        {isOpen && (
          <>
            {types.slice(5).map((type) => (
              <li className="flex gap-2" key={type}>
                <input
                  type="checkbox"
                  value={type}
                  onChange={onChange}
                  checked={selectedTypes.includes(type)}
                />
                <span>{type}</span>
              </li>
            ))}
            <div
              onClick={() => setIsOpen(false)}
              className="flex items-center text-primary cursor-pointer"
            >
              Show less
              <ChevronUp className="ml-1 w-5 h-5" />
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default TypeFilter;
