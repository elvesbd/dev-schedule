interface PaginationOptions {
  total: number;
  page: number;
  limit: number;
}

export async function Paginate(options: PaginationOptions): Promise<{
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}> {
  const { total, page, limit } = options;

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;

  return {
    totalPages,
    currentPage: page,
    hasNextPage,
  };
}
