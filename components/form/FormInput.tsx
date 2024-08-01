import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

const FormInput = (props: FormInputProps) => {
  const { name, type, label, defaultValue, placeholder } = props;

  return (
    <div className="mb-4">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        className="my-4"
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default FormInput;
