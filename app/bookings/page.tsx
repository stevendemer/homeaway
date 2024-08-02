import EmptyList from "@/components/home/EmptyList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableFooter,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/SubmitButton";
import { fetchBookings, deleteBookingAction } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";
import Link from "next/link";
import CountryFlagName from "@/components/card/CountryFlagName";

const BookingsPage = async () => {
  const bookings = await fetchBookings();

  if (bookings.length === 0) return <EmptyList />;

  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">Total bookings: {bookings.length}</h4>
      <Table>
        <TableCaption>A list of bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check in</TableHead>
            <TableHead>Check out</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => {
            const { id, totalNights, checkIn, checkOut, orderTotal } = booking;
            const startDate = formatDate(checkIn);
            const endDate = formatDate(checkOut);
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    className="underline text-muted-foreground"
                    href={`/properties/${booking.property!.id}`}
                  >
                    {booking.property?.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <CountryFlagName countryCode={booking.property!.country} />
                </TableCell>
                <TableCell>{totalNights}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>
                <TableCell>
                  <DeleteBooking bookingId={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

function DeleteBooking({ bookingId }: { bookingId: string }) {
  const deleteBooking = deleteBookingAction.bind(null, { bookingId });

  return (
    <FormContainer action={deleteBooking}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default BookingsPage;
