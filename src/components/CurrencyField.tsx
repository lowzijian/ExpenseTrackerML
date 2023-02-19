import clsx from "clsx";
import React, { Ref } from "react";
import {
  NumericFormat,
  NumberFormatValues,
  SourceInfo,
} from "react-number-format";

export interface CurrencyFieldProps {
  label?: string;
  onChange?: (values: NumberFormatValues, sourceInfo: SourceInfo) => void;
  className?: string;
  value?: string | number | undefined;
}

const CurrencyField = React.forwardRef(
  (
    { className, label, onChange, value }: CurrencyFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const _onChange = (values: NumberFormatValues, sourceInfo: SourceInfo) => {
      if (onChange) {
        onChange(values, sourceInfo);
      }
    };

    return (
      <div>
        {label && (
          <label className="mb-2 block text-sm font-medium  text-white">
            {label}
          </label>
        )}
        <div
          className={clsx(
            "inline-flex w-full rounded-lg border border-gray-500 bg-gray-600  p-2.5 text-sm text-white placeholder-gray-400 focus-within:border-cyan-500 focus-within:ring-cyan-500",
            className
          )}
        >
          <span className="mr-2 text-sm text-white/50">MYR</span>
          <NumericFormat
            value={value}
            thousandSeparator=","
            onValueChange={_onChange}
            className="w-[95%] flex-1 bg-inherit outline-none"
            decimalScale={2}
            getInputRef={ref}
          />
        </div>
      </div>
    );
  }
);

export default CurrencyField;
