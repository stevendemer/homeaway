import React from "react";
import Image from "next/image";

const ImageContainer = ({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) => {
  return (
    <section className="h-[300px] md:h-[500px] relative mt-8 border-border border">
      <Image
        src={mainImage}
        fill
        sizes="100vw"
        alt={name}
        className="object-cover rounded"
        priority
      />
    </section>
  );
};

export default ImageContainer;
