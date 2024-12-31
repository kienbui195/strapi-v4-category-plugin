export const getLocalLocale = () => {
  return localStorage.getItem("LOCALE");
};

export const saveLocalLocale = (locale) => {
  localStorage.setItem("LOCALE", locale);
};
