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

  useEffect(() => {
    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
    ></Calendar>
  );
};

export default BookingCalendar;
