"use client";
import React from "react";
import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";
import { CardSubmitButton } from "../form/SubmitButton";

const FavoriteToggleForm = ({
  favoriteId,
  propertyId,
}: {
  favoriteId: string | null;
  propertyId: string;
}) => {
  const pathname = usePathname();

  // pass the property as the parameter to the server action
  const toggleAction = toggleFavoriteAction.bind(null, {
    propertyId,
    favoriteId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
