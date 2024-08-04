"use client";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post("/api/payment", {
      bookingId,
    });

    return response.data.clientSecret;
  }, [bookingId]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider options={options} stripe={stripePromise}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutPage;
