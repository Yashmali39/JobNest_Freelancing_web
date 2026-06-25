function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary: `
      bg-blue-500
      text-white
      hover:bg-blue-600
      hover:shadow-lg
      hover:shadow-blue-500/20
    `,

    secondary: `
      bg-[#1A1A1A]
      border
      border-[#262626]
      text-white
      hover:bg-[#222222]
      hover:border-[#3A3A3A]
    `,

    danger: `
      bg-red-500
      text-white
      hover:bg-red-600
      hover:shadow-lg
      hover:shadow-red-500/20
    `,

    success: `
      bg-green-500
      text-white
      hover:bg-green-600
      hover:shadow-lg
      hover:shadow-green-500/20
    `,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        px-4
        py-2

        rounded-xl

        font-medium

        transition-all
        duration-200

        hover:-translate-y-0.5
        active:translate-y-0

        focus:outline-none
        focus:ring-2
        focus:ring-blue-500/30

        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
        disabled:hover:shadow-none

        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;