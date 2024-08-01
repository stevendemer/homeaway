import { Input } from "../ui/input";
import { Label } from "../ui/label";

type PriceInputProps = {
  defaultValue?: number;
};

const PriceInput = ({ defaultValue }: PriceInputProps) => {
  const name = "price";
  return (
    <div className="mb-4 space-y-4">
      <Label htmlFor={name} className="capitalize">
        Price ($)
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        required
        defaultValue={defaultValue || 100}
      />
    </div>
  );
};

export default PriceInput;
