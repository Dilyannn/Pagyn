import React from "react"
import { ChevronDown } from "lucide-react"

const SelectField = ({
  icon: Icon,
  label,
  name,
  options = [],
  error,
  className = "",
  placeholder = "Select an option",
  value,
  onChange,
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl py-3 px-4 
            text-gray-900 placeholder:text-gray-400 appearance-none
            transition-all duration-200 outline-none cursor-pointer
            hover:border-gray-200 hover:bg-gray-50
            focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10
            ${Icon ? "pl-12" : ""}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}
            ${!value ? "text-gray-400" : "text-gray-900"}
          `}
          {...props}
        >
           <option value="" disabled hidden>{placeholder}</option>
           {options.map((option) => {
             const optionValue = typeof option === 'object' ? option.value : option;
             const optionLabel = typeof option === 'object' ? option.label : option;
             return (
               <option key={optionValue} value={optionValue} className="text-gray-900">
                 {optionLabel}
               </option>
             );
           })}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-violet-500 transition-colors">
            <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  )
}

export default SelectField
