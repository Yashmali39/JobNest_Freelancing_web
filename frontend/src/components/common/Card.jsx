function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-[#111111]
        border
        border-[#262626]
        rounded-xl
        p-6
        shadow-lg
        shadow-black/20
        hover:border-blue-500/30
        transition-all
        duration-200
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;