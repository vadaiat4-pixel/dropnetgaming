const iconMap = {
  home: '⌂',
  play: '▶',
  swords: '⚔',
  crown: '♛',
  trophy: '◆',
  users: '♟',
  chart: '↗',
  news: '▤',
  missions: '◎',
  message: '✉',
  shield: '⬟',
  map: '▦',
  search: '⌕',
  settings: '⚙',
  admin: '▰',
  login: '↪',
  plus: '+',
  inventory: '▣',
  server: '▥',
};

export default function Icon({ name = 'home', className = '', size = 22 }) {
  return (
    <span className={`icon ${className}`} style={{ width: size, height: size, fontSize: Math.round(size * 0.85) }}>
      {iconMap[name] || '•'}
    </span>
  );
}
