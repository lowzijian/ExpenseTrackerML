import { useController } from "react-hook-form";
import CurrencyField, { CurrencyFieldProps } from "../CurrencyField";
import { NumberFormatValues, SourceInfo } from "react-number-format";
interface HookCurrencyFieldProps extends CurrencyFieldProps {
  name: string;
}

const HookCurrencyField = ({
  label,
  name,
  ...props
}: HookCurrencyFieldProps) => {
  const {
    field,
    fieldState: { error: { message } = {} },
  } = useController({ name });

  const _handleChange = (
    values: NumberFormatValues,
    _sourceInfo: SourceInfo
  ) => {
    field.onChange(values.floatValue);
  };

  return (
    <div className="block">
      <CurrencyField
        {...field}
        {...props}
        onChange={_handleChange}
        label={label}
        value={field.value}
      />
      {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default HookCurrencyField;
