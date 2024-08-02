"use client";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { DateRange } from "react-day-picker";
import { useProperty } from "@/utils/store";
import { Calendar } from "../ui/calendar";

import {
  generateDisabledDates,
  generateBlockedPeriods,
  generateDateRange,
  defaultSelected,
} from "@/utils/calendar";

const BookingCalendar = () => {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const bookings = useProperty((state) => state.bookings);
  const { toast } = useToast();

  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });

  const unavailableDates = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some((item) => {
      if (unavailableDates[item]) {
        setRange(defaultSelected);
        toast({
          description: "Some of the dates are booked. Please select again.",
        });
        return true;
      }
      return false;
    });

    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={blockedPeriods}
    ></Calendar>
  );
};

export default BookingCalendar;
