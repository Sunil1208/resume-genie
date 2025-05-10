export const validateEmail = (email) => {
  const regext = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regext.test(email);
};
