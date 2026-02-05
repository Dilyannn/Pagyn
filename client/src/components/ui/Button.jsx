function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  icon: Icon,
  className = "",
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/20 hover:shadow-violet-600/30",
    secondary: "bg-violet-50 text-violet-700 hover:bg-violet-100",
    outline: "border-2 border-violet-100 bg-transparent hover:border-violet-200 hover:bg-violet-50 text-gray-700",
    ghost: "hover:bg-violet-50 text-violet-600",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    dark: "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/10",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-10 text-lg",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      className={combinedClasses}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5 mr-2" />}
          {children}
        </>
      )}
    </button>
  );
}

export default Button;