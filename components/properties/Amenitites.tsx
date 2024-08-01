import React from "react";
import { Amenity, conservativeAmenities } from "../../utils/amenities";
import { LuFolderCheck } from "react-icons/lu";
import Title from "./Title";

const Amenitites = ({ amenities }: { amenities: string }) => {
  const amenitiesList: Amenity[] = JSON.parse(amenities as string);
  // if true there is no amenity in the list
  const noAmenity = amenitiesList.every((a) => !a.selected);

  if (noAmenity) return null;

  return (
    <div className="mt-4">
      <Title text="What this place offers" />
      <div className="grid md:grid-cols-2 gap-x-4">
        {amenitiesList.map((amenity) => {
          if (!amenity.selected) return null;
          return (
            <div key={amenity.name} className="flex items-center gap-x-4 mb-2">
              <LuFolderCheck className="h-6 w-6 text-primary" />
              <span className="font-light text-sm capitalize">
                {amenity.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Amenitites;
