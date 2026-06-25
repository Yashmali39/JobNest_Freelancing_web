const getPagination = (
  page = 1,
  limit = 10
) => {
  const currentPage = Math.max(
    Number(page),
    1
  );

  const perPage = Math.max(
    Number(limit),
    1
  );

  const skip =
    (currentPage - 1) * perPage;

  return {
    page: currentPage,
    limit: perPage,
    skip,
  };
};

export default getPagination;