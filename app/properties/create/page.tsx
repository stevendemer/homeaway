import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/SubmitButton";
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
            <FormInput name="price" type="number" label="Price" />
          </div>
          {/* text area - description */}
          <SubmitButton text="Create rental" className="mt-12" />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateProperty;
