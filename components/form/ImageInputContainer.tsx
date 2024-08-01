"use client";
import Image from "next/image";
import FormContainer from "./FormContainer";
import { SubmitButton } from "./SubmitButton";
import { LuUser2 } from "react-icons/lu";
import { useState, useEffect, ReactNode } from "react";
import { actionFunction } from "@/utils/types";
import { Button } from "../ui/button";
import ImageInput from "./ImageInput";

type ImageInputProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: ReactNode;
};

const ImageInputContainer = (props: ImageInputProps) => {
  const { image, name, action, text } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  const userIcon = (
    <LuUser2 className="w-24 h-24 bg-primary rounded text-white mb-4" />
  );

  return (
    <div>
      {image ? (
        <Image
          className="rounded-md object-cover mb-4 w-24 h-24"
          src={image}
          alt={name}
          width={100}
          height={100}
        />
      ) : (
        userIcon
      )}
      <Button
        onClick={() => setUpdateFormVisible((prev) => !prev)}
        variant="outline"
        size="sm"
      >
        {text}
      </Button>
      {isUpdateFormVisible && (
        <div className="max-w-lg mt-4 ">
          <FormContainer action={action}>
            {props.children} <ImageInput />
            <SubmitButton />
          </FormContainer>
        </div>
      )}
    </div>
  );
};

export default ImageInputContainer;
