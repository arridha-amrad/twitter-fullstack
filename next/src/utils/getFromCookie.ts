export const getFromCookie = (key: string) => {
  const cookie = document.cookie;
  const data = cookie.split(";").find((data) => data.startsWith(`${key}=`));
  return data;
};
