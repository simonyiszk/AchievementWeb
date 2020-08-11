export const jwtTokenName = 'simonyi_achievement_jwt';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const isLoggedIn = () => {
  return !!getCookie(jwtTokenName);
};

export const logout = () => {
  document.cookie = jwtTokenName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
