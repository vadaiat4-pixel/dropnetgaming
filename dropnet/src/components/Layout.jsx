import Icon from './Icon.jsx';
import Logo from './Logo.jsx';
import { navigate } from '../utils/router.js';

const topNav = [
  { path: 'matchmaking', label: 'Матчмейкинг', icon: 'home' },
  { path: 'play', label: 'Играть', icon: 'play' },
  { path: 'match-room', label: 'Комната матча', icon: 'swords' },
  { path: 'tournaments', label: 'Турниры', icon: 'trophy' },
  { path: 'premium', label: 'Premium', icon: 'crown' },
  { path: 'teams', label: 'Команды', icon: 'users' },
  { path: 'leaderboard', label: 'Лидерборд', icon: 'chart' },
  { path: 'news', label: 'Новости', icon: 'news' },
  { path: 'faq', label: 'FAQ', icon: 'message' },
];

const mainNav = [
  { path: 'search', label: 'Поиск', icon: 'search' },
  { path: 'friends', label: 'Party Finder', icon: 'users' },
  { path: 'play', label: 'Играть', icon: 'play' },
  { path: 'match-room', label: 'Комната матча', icon: 'swords' },
  { path: 'premium', label: 'Premium', icon: 'crown' },
  { path: 'teams', label: 'Команды', icon: 'users' },
  { path: 'leaderboard', label: 'Лидерборд', icon: 'chart' },
  { path: 'news', label: 'Новости', icon: 'news' },
  { path: 'quests', label: 'Задания', icon: 'missions' },
  { path: 'feedback', label: 'Обратная связь', icon: 'message' },
];

const serviceNav = [
  { path: 'tournaments', label: 'Турниры', icon: 'trophy' },
  { path: 'inventory', label: 'SKINBRO | CS2', icon: 'inventory' },
  { path: 'testing', label: 'Тестирование', icon: 'shield' },
  { path: 'rules', label: 'Правила', icon: 'shield' },
  { path: 'contacts', label: 'Контакты', icon: 'message' },
  { path: 'privacy', label: 'Политика', icon: 'shield' },
];

function NavLink({ item, active }) {
  return (
    <a className={`nav-link ${active ? 'active' : ''}`} href={`#/${item.path}`} title={item.label}>
      <Icon name={item.icon} />
      <span>{item.label}</span>
    </a>
  );
}

export default function Layout({ children, route, currentUser, onLogout, notifications }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="logo-button" type="button" onClick={() => navigate('matchmaking')}>
          <Logo compact />
        </button>

        <nav className="top-nav" aria-label="Главное меню">
          {topNav.map((item) => (
            <a key={item.path} className={route === item.path ? 'top-link active' : 'top-link'} href={`#/${item.path}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="top-actions">
          <div className="notif">🔔 {notifications.length}</div>
          {currentUser ? (
            <>
              <a className="small-action" href="#/profile">{currentUser.nickname || currentUser.username}</a>
              {currentUser.role === 'admin' && <a className="small-action admin" href="#/admin">Админ-панель</a>}
              <button className="small-action" type="button" onClick={onLogout}>Выйти</button>
            </>
          ) : (
            <>
              <a className="small-action" href="#/login">Войти</a>
              <a className="small-action admin" href="#/register">Регистрация</a>
            </>
          )}
        </div>
      </header>

      <div className="body-grid">
        <aside className="sidebar">
          <button className="logo-large-button" type="button" onClick={() => navigate('matchmaking')}>
            <Logo />
          </button>

          <nav className="side-list" aria-label="Разделы сайта">
            {mainNav.map((item) => <NavLink key={item.path} item={item} active={route === item.path} />)}
            <div className="side-divider" />
            {serviceNav.map((item) => <NavLink key={item.path} item={item} active={route === item.path} />)}
          </nav>
        </aside>

        <main className="page-content">{children}</main>

        <aside className="rightbar" aria-label="Быстрые ссылки">
          {[
            { path: 'profile', icon: 'users', label: 'Профиль' },
            { path: 'feedback', icon: 'message', label: 'Обратная связь' },
            { path: 'quests', icon: 'missions', label: 'Задания' },
            { path: 'settings', icon: 'settings', label: 'Настройки' },
          ].map((item) => (
            <a key={item.path} href={`#/${item.path}`} title={item.label}>
              <Icon name={item.icon} />
            </a>
          ))}
          {currentUser?.role === 'admin' && (
            <a href="#/admin" title="Админ-панель"><Icon name="admin" /></a>
          )}
        </aside>
      </div>
    </div>
  );
}
