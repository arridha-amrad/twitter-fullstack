export const getFromCookie = (key: string) => {
  const cookie = document.cookie;
  const data = cookie
    .split(";")
    .find((data) => data.trim().startsWith(`${key}=`));
  return data;
};
