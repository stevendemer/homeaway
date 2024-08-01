import { PropertyCardProps } from "@/utils/types";
import React from "react";
import { formatCurrency } from "@/utils/format";
import PropertyRating from "./PropertyRating";
import Link from "next/link";
import Image from "next/image";
import CountryFlagName from "./CountryFlagName";
import FavoriteToggleButton from "./FavoriteToggleButton";

const PropertyCard = ({ property }: { property: PropertyCardProps }) => {
  const { name, image, price, country, id, tagline } = property;

  return (
    <article className="group relative">
      <Link href={`/properties/${id}`}>
        <div className="relative h-[300px] mb-2 overflow-hidden rounded-md">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold mt-1">
            {name.substring(0, 30)}
          </h3>
          {/* property rating */}
          <PropertyRating inPage={false} propertyId={id} />
        </div>
        <p className="text-sm mt-1 text-muted-foreground">
          {tagline.substring(0, 40)}
        </p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm mt-1">
            <span className="font-semibold">
              {formatCurrency(price)} per night
            </span>
          </p>
          {/* country and flag */}
          <CountryFlagName countryCode={country} />
        </div>
      </Link>
      <div className="absolute top-5 z-5 right-5">
        {/* favorite toggle button */}
        <FavoriteToggleButton propertyId={id} />
      </div>
    </article>
  );
};

export default PropertyCard;
