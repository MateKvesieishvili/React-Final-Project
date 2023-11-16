import { useSearchParams } from "react-router-dom"

export const useQueryParams = (key) => {
  const [params, setParams] = useSearchParams()

  const changeQueryValue = (key, value) => {
    setParams({ ...params, [key]: value })
  };

  return {
    value: params.get(key),
    changeQueryValue,
  };
};
