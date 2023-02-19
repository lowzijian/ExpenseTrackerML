import React, { ReactNode } from "react";
import clsx from "clsx";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "text";
  children: ReactNode;
  size?: "small" | "default";
}

const Button = ({
  children,
  variant = "text",
  className,
  size = "default",
  ...props
}: CustomButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "group relative overflow-hidden rounded drop-shadow-md transition-all duration-300 ease-out",
        className,
        variant === "contained" &&
          "bg-gradient-to-r from-green-500 to-blue-500  ring-offset-black hover:bg-gradient-to-r hover:from-green-600  hover:to-blue-600",
        variant === "text" && " hover:bg-white/[0.15]",
        size === "default" && "px-5 py-2.5 text-sm",
        size === "small" && "py-1 px-2 text-xs"
      )}
    >
      <span className="font-medium text-white">{children}</span>
    </button>
  );
};

export default Button;
