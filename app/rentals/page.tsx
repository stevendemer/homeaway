import EmptyList from "@/components/home/EmptyList";
import { fetchRentals, deleteRentalAction } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/SubmitButton";
import Link from "next/link";

const RentalsPage = async () => {
  const rentals = await fetchRentals();
  if (rentals.length === 0) {
    return (
      <EmptyList
        heading="No rentals to display"
        message="Don't hesitate to create a rental."
      />
    );
  }

  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">Active properties: {rentals.length}</h4>
      <Table>
        <TableCaption>A list of all your properties.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Nightly Rate</TableHead>
            <TableHead>Nights Booked</TableHead>
            <TableHead>Total income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => {
            return (
              <TableRow key={rental.id}>
                <TableCell>
                  <Link
                    className="underline text-muted-foreground tracking-wide"
                    href={`/properties/${rental.id}`}
                  >
                    {rental.name}
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(rental.price)}</TableCell>
                <TableCell>{rental.totalNightsSum || 0}</TableCell>
                <TableCell>{formatCurrency(rental.orderTotalSum)}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/rentals/${rental.id}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeleteRental propertyId={rental.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

function DeleteRental({ propertyId }: { propertyId: string }) {
  const deleteRental = deleteRentalAction.bind(null, { propertyId });
  return (
    <FormContainer action={deleteRental}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default RentalsPage;
