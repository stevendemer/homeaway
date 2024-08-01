import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/SubmitButton";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoriteToggleButton = async ({ propertyId }: { propertyId: string }) => {
  const { userId } = auth();

  if (!userId) return <CardSignInButton />;

  const favoriteId = await fetchFavoriteId({ propertyId });

  return (
    <FavoriteToggleForm
      favoriteId={favoriteId}
      propertyId={propertyId}
    ></FavoriteToggleForm>
    // <Button size="icon" variant="outline" className="p-2">
    //   <FaHeart />
    // </Button>
  );
};

export default FavoriteToggleButton;
