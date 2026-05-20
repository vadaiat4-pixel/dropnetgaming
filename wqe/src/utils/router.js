export const validRoutes = [
  'matchmaking',
  'play',
  'match-room',
  'tournaments',
  'premium',
  'teams',
  'leaderboard',
  'quests',
  'news',
  'feedback',
  'contacts',
  'privacy',
  'rules',
  'faq',
  'testing',
  'profile',
  'login',
  'register',
  'admin',
  'servers',
  'settings',
  'friends',
  'inventory',
  'search',
  'stats',
  'league',
  'maps',
  'anticheat',
  'not-found',
];

export function getHashRoute() {
  const value = window.location.hash.replace('#/', '').replace('#', '').split('?')[0].trim();
  if (!value) return 'matchmaking';
  return validRoutes.includes(value) ? value : 'not-found';
}

export function navigate(path) {
  const target = validRoutes.includes(path) ? path : 'not-found';
  window.location.hash = `#/${target}`;
}
