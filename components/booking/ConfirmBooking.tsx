"use client";
import React from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useProperty } from "@/utils/store";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/SubmitButton";
import { createBooking } from "@/utils/actions";

const ConfirmBooking = () => {
  const { userId } = useAuth();

  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  if (!userId)
    return (
      <SignInButton mode="modal">
        <Button type="button" className="w-full">
          Sign in to complete booking
        </Button>
      </SignInButton>
    );

  const createBookingAction = createBooking.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });

  return (
    <section>
      <FormContainer action={createBookingAction}>
        <SubmitButton text="Reserve" className="w-full" />
      </FormContainer>
    </section>
  );
};

export default ConfirmBooking;
