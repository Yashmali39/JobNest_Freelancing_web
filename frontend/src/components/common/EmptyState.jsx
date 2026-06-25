function EmptyState({
  title,
  description,
}) {
  return (
    <div className="text-center py-16">
      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      <p className="text-gray-400 mt-2">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;