import { useQuery } from "@tanstack/react-query";
import { fetchOpenAi } from "../server";

export const usePersona = (input: string, instructions: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["open-ai", input],
    queryFn: () => fetchOpenAi(input, instructions),
    enabled: !!input,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });

  return { persona: data, isPersonaLoading: isLoading };
};
