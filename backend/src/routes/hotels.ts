import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
const router = express.Router();

router.get("/destination", async (req: Request, res: Response) => {
  try {
    const constructSearchQuery = (queryParams: any) => {
      let constructedQuery: any = {};
      if (queryParams.destination) {
        constructedQuery.$or = [
          {
            city: {
              $regex: new RegExp(`^${queryParams.destination}`, "i"),
            },
          },
          {
            country: {
              $regex: new RegExp(`^${queryParams.destination}`, "i"),
            },
          },
        ];

        return constructedQuery;
      }
    };
    const query: HotelType[] = constructSearchQuery(req.query);
    const destinations = await Hotel.find(query);
    if (!destinations)
      return res.status(200).json({ messsge: "No results found." });
    return res.status(200).send(destinations);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching destinations." });
  }
});
router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels) return res.status(400).json({ message: "No hotels found" });
    return res.send(hotels);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching hotels." });
  }
});

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);
    // console.log(query)
    console.log(req.query);
    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }
    const pageSize = 10;
    const pageNumber = req.query.page ? req.query.page.toString() : "1";
    const skip = (parseInt(pageNumber) - 1) * pageSize;
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(skip);
    const total = await Hotel.countDocuments(query);
    const response = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching hotels." });
  }
});

const constructSearchQuery = (searchQuery: any) => {
  const constructedQuery: any = {};

  if (searchQuery.destination) {
    constructedQuery.$or = [
      { city: new RegExp(searchQuery.destination, "i") },
      { country: new RegExp(searchQuery.destination, "i") },
    ];
  }
  if (searchQuery.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(searchQuery.adultCount),
    };
  }
  if (searchQuery.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(searchQuery.childCount),
    };
  }
  if (searchQuery.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(searchQuery.facilities)
        ? searchQuery.facilities
        : [searchQuery.facilities],
    };
  }
  if (searchQuery.types) {
    constructedQuery.type = {
      $in: Array.isArray(searchQuery.types)
        ? searchQuery.types
        : [searchQuery.types],
    };
  }
  if (searchQuery.maxPrice && searchQuery.minPrice) {
    constructedQuery.pricePerNight = {
      $gte: parseInt(searchQuery.minPrice),
      $lte: parseInt(searchQuery.maxPrice),
    };
  }
  if (searchQuery.stars) {
    const starRating = Array.isArray(searchQuery.stars)
      ? searchQuery.stars.map((star: string) => parseInt(star))
      : parseInt(searchQuery.stars);
    constructedQuery.starRating = { $in: starRating };
  }

  return constructedQuery;
};
export default router;
