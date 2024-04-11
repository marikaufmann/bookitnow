import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType, HotelType } from "../shared/types";
import { param, validationResult } from "express-validator";
import { verifyToken } from "../middleware/verifyToken";
import Stripe from "stripe";
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);
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
router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);
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
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;
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
    res.status(200).send(response);
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({ message: "Error fetching hotels." });
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
router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const hotelId = req.params.hotelId;
    const { numberOfNights, rooms } = req.body;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }
    const totalCost = numberOfNights * rooms * hotel.pricePerNight;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "eur",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });
    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }
    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalCost,
    };
    return res.status(200).json(response);
  }
);

router.post(
  "/:hotelId/booking",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );
      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment intent not found" });
      }
      if (
        paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "Payment intent mismatch" });
      }
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `Payment intent not succeeded. Status ${paymentIntent.status}`,
        });
      }
      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      };
      const hotel = await Hotel.findByIdAndUpdate(
        { _id: req.params.hotelId },
        {
          $push: {
            bookings: newBooking,
          },
        }
      );
      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }
      await hotel.save();
      res.status(200).send();
    } catch (err) {
      console.log("nnn");
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);
router.get(
  "/:hotelId",
  [param("hotelId").notEmpty().withMessage("Hotel ID is required.")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id = req.params.hotelId;
      const hotel = await Hotel.findById(id);
      if (!hotel) return res.status(404).json({ message: "Hotel not found" });
      return res.send(hotel);
    } catch (err) {
      return res.status(500).json({ message: "Error fetching hotel." });
    }
  }
);

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
  if (searchQuery.rooms) {
    constructedQuery.rooms = {
      $gte: parseInt(searchQuery.rooms),
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
