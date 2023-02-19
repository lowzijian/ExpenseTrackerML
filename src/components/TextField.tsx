import React, { Ref } from "react";
import clsx from "clsx";

export interface CustomTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextField = React.forwardRef(
  (
    { className, label, ...props }: CustomTextFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div>
        {label && (
          <label className="mb-2 block text-sm font-medium text-white">
            {label}
          </label>
        )}
        <input
          {...props}
          ref={ref}
          className={clsx(
            "block w-full rounded-lg border  border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 outline-none focus:border-cyan-500 focus:ring-cyan-500",
            className
          )}
        />
      </div>
    );
  }
);

export default TextField;
