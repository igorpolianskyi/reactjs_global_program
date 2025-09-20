import { useSearchParams } from "react-router-dom";

export function useUpdateSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (updates: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  return { searchParams, updateParams };
}