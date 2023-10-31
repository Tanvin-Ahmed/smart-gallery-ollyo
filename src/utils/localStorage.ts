export const setDataInLocalStorage = (
  key: string,
  value: object | string | number
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromLocalStorage = (key: string) => {
  const str = localStorage.getItem(key);

  if (str) {
    return JSON.parse(str);
  }
  return null;
};

export const removeDataFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
