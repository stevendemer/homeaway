"use client";
import React, { useState } from "react";
import Title from "./Title";
import { Button } from "../ui/button";

const Description = ({ description }: { description: string }) => {
  const [descriptionShow, setDescriptionShown] = useState(false);

  const words = description.split(" ");
  const isLong = words.length > 100;

  const onToggle = () => {
    setDescriptionShown((prev) => !prev);
  };

  const displayedDescription =
    isLong && !descriptionShow
      ? words.splice(0, 100).join(" ") + "..."
      : description;

  return (
    <article className="mt-4">
      <Title text="Description" />
      <p className="text-muted-foreground font-light leading-loose">
        {displayedDescription}
      </p>
      {isLong && (
        <Button className="pl-0" variant="link" onClick={onToggle}>
          {descriptionShow ? "Show less" : "Show more"}
        </Button>
      )}
    </article>
  );
};

export default Description;
