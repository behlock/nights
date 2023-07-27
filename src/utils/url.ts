export const getQueryParamFromURL = (queryString: string, key: string) => {
  return new URLSearchParams(queryString).get(key)
}
