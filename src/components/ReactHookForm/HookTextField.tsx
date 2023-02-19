import { useController } from "react-hook-form";
import TextField, { CustomTextFieldProps } from "../TextField";

interface HookTextFieldsProps extends CustomTextFieldProps {
  name: string;
}

const HookTextField = ({ label, name, ...props }: HookTextFieldsProps) => {
  const {
    field,
    fieldState: { error: { message } = {} },
  } = useController({ name });

  return (
    <div className="block">
      <TextField label={label} {...field} {...props} />
      {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default HookTextField;
