import React from "react";

const TextAriaField = ({
  icon: Icon,
  label,
  name,
  error,
  className = "",
  rows = 4,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-bold text-gray-700 tracking-tight"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <textarea
          id={name}
          name={name}
          rows={rows}
          className={`
            w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 
            text-gray-900 placeholder:text-gray-400
            transition-all duration-200 outline-none
            hover:border-gray-200 hover:bg-gray-50
            focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10
            ${Icon ? "pl-12" : ""}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextAriaField;
