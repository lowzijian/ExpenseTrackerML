import { RadioGroup } from "@headlessui/react";
import { useController } from "react-hook-form";
import clsx from "clsx";

export interface RadioGroupOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  options: RadioGroupOption[];
}

const HookRadioGroup = ({ label, name, options }: RadioGroupProps) => {
  const {
    field,
    fieldState: { error: { message } = {} },
  } = useController({ name });

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <div className="w-full">
        <RadioGroup value={field.value} onChange={field.onChange}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
            {options.map(({ value, label, icon }) => (
              <RadioGroup.Option
                key={value}
                value={value}
                className={({ active, checked }) =>
                  clsx(
                    "relative flex cursor-pointer flex-col rounded-lg border-gray-500 bg-gray-600 p-4 shadow hover:bg-white hover:bg-opacity-25 focus:outline-none",
                    active &&
                      "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-cyan-300",
                    checked &&
                      "bg-opacity-20 bg-gradient-to-r from-green-500 to-blue-500 ring-2 ring-cyan-500 ring-offset-cyan-300"
                  )
                }
              >
                {() => (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    {icon && <div className="text-white">{icon}</div>}
                    <RadioGroup.Label
                      as="p"
                      className="text-xs font-medium text-white sm:text-sm"
                    >
                      {label}
                    </RadioGroup.Label>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default HookRadioGroup;
