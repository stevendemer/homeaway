import { fetchReservations } from "@/utils/actions";
import Link from "next/link";
import EmptyList from "@/components/home/EmptyList";
import CountryFlagName from "@/components/card/CountryFlagName";
import { formatDate, formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

const ReservationsPage = async () => {
  const reservations = await fetchReservations();

  if (reservations.length === 0) return <EmptyList />;

  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">
        Total reservations: {reservations.length}
      </h4>
      <Table>
        <TableCaption>A list of your recent reservations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check in</TableHead>
            <TableHead>Check out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((item) => {
            const { totalNights, checkIn, checkOut, orderTotal, id } = item;
            const startDate = formatDate(checkIn);
            const endDate = formatDate(checkOut);

            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/properties/${item.property!.id}`}
                    className="text-muted-foreground underline tracking-wide"
                  >
                    {item.property!.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <CountryFlagName countryCode={item.property!.country} />
                </TableCell>
                <TableCell>{totalNights}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationsPage;
