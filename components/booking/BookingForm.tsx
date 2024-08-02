"use client";
import { calculateTotals } from "@/utils/calculateTotals";
import { formatCurrency } from "@/utils/format";
import { useProperty } from "@/utils/store";
import React from "react";
import { Card, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const BookingForm = () => {
  const { range, price } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  const { totalNights, cleaning, service, tax, subTotal, orderTotal } =
    calculateTotals({
      checkIn,
      checkOut,
      price,
    });

  return (
    <Card className="p-8 mb-4">
      <CardTitle className="mb-8">Summary</CardTitle>
      <FormRow label={`$${price} x ${totalNights} nights`} amount={subTotal} />
      <FormRow label={"Cleaning fee"} amount={cleaning} />
      <FormRow label={"Service fee"} amount={service} />
      <FormRow label={"Tax"} amount={tax} />
      <Separator className="mt-4" />
      <CardTitle>
        <FormRow label="Booking total" amount={orderTotal} />
      </CardTitle>
    </Card>
  );
};

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}

export default BookingForm;
