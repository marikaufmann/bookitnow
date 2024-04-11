import { hotelFacilities } from "../config/hotel-options-config";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

const FacilitiesFilter = ({
  onChange,
  selectedFacilities,
}: {
  selectedFacilities: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const facilities = hotelFacilities;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-4 px-4 pb-3">
      <h3 className="font-semibold mb-2">Facilities</h3>
      <ul className="flex flex-col gap-2 text-sm ">
        {facilities.slice(0, 5).map((facility) => (
          <li className="flex gap-2 items-center " key={facility}>
            <input
              checked={selectedFacilities.includes(facility)}
              type="checkbox"
              value={facility}
              onChange={onChange}
            />
            <span>{facility}</span>
          </li>
        ))}
        {!isOpen && (
          <div
            className="flex items-center text-primary cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Show all {facilities.length}
            <ChevronDown className="ml-1 w-5 h-5" />
          </div>
        )}
        {isOpen && (
          <>
            {facilities.slice(5).map((facility) => (
              <li className="flex gap-2" key={facility}>
                <input
                  type="checkbox"
                  value={facility}
                  onChange={onChange}
                />
                <span>{facility}</span>
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

export default FacilitiesFilter;
