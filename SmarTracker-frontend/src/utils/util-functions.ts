export const clearStorageIfNeeded = () => {
  const isPersist = localStorage.getItem('persist') !== null;
  const isInSession = sessionStorage.getItem('inSession') !== null;

  if (isPersist) localStorage.clear();
  if (isInSession) sessionStorage.clear();
};
