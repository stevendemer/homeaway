"use client";
import { useState } from "react";
import { Amenity, amenities, conservativeAmenities } from "@/utils/amenities";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const AmenityInput = ({ defaultValue }: { defaultValue?: Amenity[] }) => {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    defaultValue || conservativeAmenities
  );

  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return { ...a, selected: !a.selected };
        }
        return a;
      });
    });
  };

  return (
    <section className="ml-4">
      <input
        type="hidden"
        name="amenities"
        id="amenities"
        value={JSON.stringify(selectedAmenities)}
      />
      <div className="grid grid-cols-2 gap-4">
        {selectedAmenities.map((amen) => {
          return (
            <div key={amen.name} className="flex items-center space-x-2">
              <Checkbox
                id={amen.name}
                checked={amen.selected}
                onCheckedChange={() => handleChange(amen)}
              />
              <Label
                htmlFor={amen.name}
                className="text-sm font-medium leading-none capitalize gap-x-2 items-center flex"
              >
                {amen.name} <amen.icon className="w-4 h-4" />
              </Label>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AmenityInput;
