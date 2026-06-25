function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm text-gray-300">
          {label}
        </label>
      )}

      <input
        className={`
          w-full
          px-4
          py-3
          rounded-xl
          bg-[#111111]
          border
          border-[#262626]
          text-white
          outline-none
          focus:border-blue-500
          transition
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-red-400 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;