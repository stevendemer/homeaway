import AmenityInput from "@/components/form/AmenityInput";
import CategoryInput from "@/components/form/CategoryInput";
import CounterInput from "@/components/form/CounterInput";
import CountryInput from "@/components/form/CountryInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import { SubmitButton } from "@/components/form/SubmitButton";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createProperty } from "@/utils/actions";

const CreateProperty = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Create property
      </h1>
      <div className="border p-8 rounded">
        <h3 className="text-lg mb-4 font-medium">General info</h3>
        <FormContainer action={createProperty}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name"
              defaultValue="Duplex in Greece"
            />
            <FormInput
              name="tagline"
              type="text"
              label="Tagline"
              defaultValue="Dream gateway"
            />
            <PriceInput />
            <CategoryInput />
          </div>
          {/* text area - description */}
          <TextAreaInput name="description" labelText="Description" />
          <div className="grid sm:grid-cols-2 gap-8">
            <CountryInput />
            <ImageInput />
          </div>
          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation details
          </h3>
          <CounterInput detail="guests" />
          <CounterInput detail="bedrooms" />
          <CounterInput detail="beds" />
          <CounterInput detail="baths" />
          <h3 className="text-lg mt-10 mb-6 mx-4 font-medium">Amenities</h3>
          <AmenityInput />
          <SubmitButton text="Create rental" className="mt-12" />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateProperty;
