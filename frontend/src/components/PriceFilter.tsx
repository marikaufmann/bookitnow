import Slider from "@mui/material/Slider";
import { useState } from "react";
import * as apiClient from "../api-client.ts";
import { useQuery } from "react-query";

const PriceFilter = ({ onChange }: { onChange: (value: number[]) => void }) => {
  const { data: hotels } = useQuery("fetchHotels", apiClient.fetchHotels);
  const hotelPrices = hotels
    ? hotels.map((hotel) => hotel.pricePerNight)
    : [10000];
  const maxPrice = Math.max(...hotelPrices);
  const MIN = 0;
  const MAX = maxPrice;

  const [value, setValue] = useState<number[]>([MIN, MAX!]);
  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onChange(newValue as number[]);
  };

  return (
    <div className="py-4 px-4">
      <h3 className="font-semibold mb-2">Your budget (per night)</h3>
      <Slider
        min={MIN}
        max={MAX}
        className=""
        value={value}
        onChange={handleChange}
        color="primary"
        valueLabelDisplay="auto"
      />
      <p className="text-title whitespace-nowrap">
        € {value[0]}&nbsp; – &nbsp;€ {value[1]}
      </p>
    </div>
  );
};

export default PriceFilter;
