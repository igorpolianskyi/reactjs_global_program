import { useUpdateSearchParams } from "../../hooks/use-update-search-params";
import SearchForm from "./SearchForm";

const SearchFormWrapper: React.FC = () => {
  const { searchParams, updateParams } = useUpdateSearchParams();
  const query = searchParams.get("query") || "";

  const onSearch = (query: string) => updateParams({ query });

  return <SearchForm initialQuery={query} onSearch={onSearch} />;
}

export default SearchFormWrapper;