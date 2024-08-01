import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

type TextAreaProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

const TextAreaInput = ({ name, labelText, defaultValue }: TextAreaProps) => {
  return (
    <div className="mb-4 space-y-4">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        className="resize-none leading-loose"
        name={name}
        rows={5}
        id={name}
      />
    </div>
  );
};

export default TextAreaInput;
