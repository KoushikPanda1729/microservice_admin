import { forwardRef } from "react";
import type { CustomCheckboxProps } from "./checkbox.types";

const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ label, error, className = "", labelClassName = "", ...props }, ref) => {
    const baseCheckboxClasses =
      "peer w-4 h-4 appearance-none bg-white border border-primary-500 rounded-sm checked:bg-primary-500 checked:border-primary-500 checked:text-white focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 transition-colors";

    const baseLabelClasses = "flex items-center cursor-pointer relative";
    const textClasses = "ml-2 text-sm text-primary-500 select-none";

    return (
      <div>
        <label className={`${baseLabelClasses} ${labelClassName}`}>
          <input
            ref={ref}
            type="checkbox"
            className={`${baseCheckboxClasses} ${className}`}
            {...props}
          />
          <svg
            className="absolute w-3 h-3 text-white left-0.5 top-0.5 pointer-events-none hidden peer-checked:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>

          {label && <span className={textClasses}>{label}</span>}
        </label>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

CustomCheckbox.displayName = "CustomCheckbox";

export default CustomCheckbox;
