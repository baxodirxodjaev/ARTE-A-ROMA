// hooks/useCreateQuery.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useCreateQuery = <T>(
  key: string,
  queryFn: () => Promise<T[]>
): UseQueryResult<T[], Error> => {
  return useQuery<T[]>({
    queryKey: [key],
    queryFn,
    staleTime: 1000 * 60 * 5,
  });
};
