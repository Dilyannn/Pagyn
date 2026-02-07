import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Check } from "lucide-react";

const SelectField = ({
  icon: Icon,
  label,
  name,
  options = [],
  error,
  className = "",
  placeholder = "Select options",
  value,
  onChange,
  multiple = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    if (multiple) {
      if (Array.isArray(value)) {
        if (value.includes(optionValue)) {
          onChange(value.filter((v) => v !== optionValue));
        } else {
          onChange([...value, optionValue]);
        }
      } else {
        onChange([optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleRemove = (e, optionValue) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  // Helper to get label
  const getLabel = (val) => {
    const opt = options.find((o) =>
      typeof o === "object" ? o.value === val : o === val,
    );
    return opt ? (typeof opt === "object" ? opt.label : opt) : val;
  };

  return (
    <div className={`space-y-2 ${className}`} ref={containerRef}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-bold text-gray-700 tracking-tight"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 
            text-gray-900 placeholder:text-gray-400 min-h-13
            transition-all duration-200 outline-none cursor-pointer relative
            hover:border-gray-200 hover:bg-gray-50
            ${isOpen ? "bg-white border-violet-500 ring-4 ring-violet-500/10" : ""}
            ${Icon ? "pl-12" : ""}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}
          `}
        >
          {Icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-violet-500 transition-colors duration-200 pointer-events-none">
              <Icon className="w-5 h-5" />
            </div>
          )}

          <div className="flex flex-wrap gap-2 pr-6">
            {multiple && Array.isArray(value) && value.length > 0 ? (
              value.map((val) => (
                <span
                  key={val}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-sm bg-violet-50 text-violet-700 font-medium border-2 border-dashed border-violet-200"
                >
                  {getLabel(val)}
                  <button
                    onClick={(e) => handleRemove(e, val)}
                    className="ml-1.5 hover:text-violet-900 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            ) : !multiple && value ? (
              <span className="text-gray-900">{getLabel(value)}</span>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>

          <div
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-violet-500" : ""}`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl shadow-gray-200/50 max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100 p-1">
            {options.map((option) => {
              const optionValue =
                typeof option === "object" ? option.value : option;
              const optionLabel =
                typeof option === "object" ? option.label : option;
              const isSelected = multiple
                ? value?.includes(optionValue)
                : value === optionValue;

              return (
                <div
                  key={optionValue}
                  onClick={() => handleSelect(optionValue)}
                  className={`
                    px-4 py-2.5 rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium transition-colors
                    ${isSelected ? "bg-violet-50 text-violet-700" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}
                  `}
                >
                  {optionLabel}
                  {isSelected && <Check className="w-4 h-4 text-violet-600" />}
                </div>
              );
            })}
            {options.length === 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">
                No options available
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;
