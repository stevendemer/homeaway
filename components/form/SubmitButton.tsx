"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { TfiReload } from "react-icons/tfi";
import { SignInButton } from "@clerk/nextjs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuTrash2, LuPenSquare } from "react-icons/lu";

type Props = {
  className?: string;
  text?: string;
};

export const SubmitButton = ({ className = "", text = "submit" }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      size="lg"
      type="submit"
      disabled={pending}
      className={`capitalize ${className}`}
    >
      {pending ? (
        <>
          <TfiReload className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
        asChild
      >
        <FaHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      size="icon"
      type="submit"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <TfiReload className="animate-spin" />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

type ActionType = "edit" | "delete";
export const IconButton = ({ actionType }: { actionType: ActionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "delete":
        return <LuTrash2 />;
      case "edit":
        return <LuPenSquare />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <TfiReload className="animate-spin" /> : renderIcon()}
    </Button>
  );
};
