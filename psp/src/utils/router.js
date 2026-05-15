export function getHashRoute() {
  const value = window.location.hash.replace('#/', '').replace('#', '').split('?')[0];
  return value || 'matchmaking';
}

export function navigate(path) {
  window.location.hash = `#/${path}`;
}
