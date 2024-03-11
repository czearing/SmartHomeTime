export const fetchOpenAi = async (prompt: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/open-ai?prompt=${prompt}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();

  return data;
};
