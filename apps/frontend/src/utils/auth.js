export const jwtTokenName = 'simonyi_achievement_jwt';
export const roleTokenName = 'simonyi_achievement_role';

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
  document.cookie = roleTokenName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const getRoles = () => {
  const roles = getCookie(roleTokenName);
  if (!roles) {
    return '';
  }
  return decodeURIComponent(roles);
};

export const isGroupLead = (roleText, groupid) => {
  if (!roleText || typeof roleText !== 'string') {
    return false;
  }
  return roleText.split(',').filter((role) => +role === groupid).length === 1;
};

export const isAdmin = (roleText) => {
  if (!roleText || typeof roleText !== 'string') {
    return false;
  }
  return roleText.split(',').filter((role) => +role === 0).length === 1;
};
