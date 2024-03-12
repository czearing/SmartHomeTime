import { useQuery } from "@tanstack/react-query";
import { fetchOpenAi } from "../server";

export const useOpenAi = (input: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["open-ai", input],
    queryFn: () => fetchOpenAi(input),
    enabled: !!input,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });

  return { data, isLoading };
};
