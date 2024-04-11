import {
  PaymentIntentResponse,
  UserType,
} from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { BookingFormData } from "../../types";
import { useSearchContext } from "../../hooks/use-search-context";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../hooks/use-app-context";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client.ts";
const BookingForm = ({
  currentUser,
  paymentIntent,
}: {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { mutate: book, isLoading } = useMutation(apiClient.createBooking, {
    onSuccess: () => {
      showToast({ message: "Booking saved!", type: "SUCCESS" });
      navigate(`/my-bookings`);
    },
    onError: () => {
      showToast({
        message: "Something went wrong, please try again later",
        type: "ERROR",
      });
    },
  });
  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      rooms: search.rooms,
      hotelId,
      paymentIntentId: paymentIntent.paymentIntentId,
      totalCost: paymentIntent.totalCost,
    },
  });
  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      book({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };
  return (
    <form className="flex flex-col p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-6">
        <label className="flex flex-col flex-1">
          <h3 className="text-sm text-title font-semibold"> First name</h3>
          <input
            className="text-sm   p-2 rounded bg-mutedbggray"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
            placeholder={currentUser?.firstName}
          ></input>
        </label>
        <label className="flex flex-col flex-1">
          <h3 className="text-sm text-title font-semibold"> Last name</h3>
          <input
            className="text-sm   p-2 rounded bg-mutedbggray"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
            placeholder={currentUser?.lastName}
          ></input>
        </label>
      </div>
      <label className="flex flex-col my-4">
        <h3 className="text-sm text-title font-semibold"> Email</h3>
        <input
          className="text-sm   p-2 rounded bg-mutedbggray"
          type="text"
          readOnly
          disabled
          {...register("email")}
          placeholder={currentUser?.email}
        ></input>
      </label>
      <div className="mt-6">
        <h1 className=" text-sm  mb-4 text-gray-500">Your price summary</h1>
        <dl className="flex justify-between">
          <dt className="flex flex-col text-lg text-title font-semibold">
            Total amount:
            <span className="text-xs text-gray-500 font-normal">
              Includes taxes and charges
            </span>
          </dt>
          <dd className="font-semibold">
            € {paymentIntent.totalCost.toFixed(2)}
          </dd>
        </dl>
        <div className="my-4">
          <h1 className="text-lg text-title font-semibold mb-2">
            Payment details
          </h1>
          <CardElement id="payment-element" />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-primary text-bg font-semibold hover:bg-primary/80 py-2 px-4 rounded-lg  w-full hover:shadow"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
