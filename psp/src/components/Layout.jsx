import Icon from './Icon.jsx';
import Logo from './Logo.jsx';
import { navigation } from '../data/seed.js';
import { navigate } from '../utils/router.js';

const topLinks = ['matchmaking', 'play', 'match-room', 'tournaments', 'premium', 'teams', 'leaderboard', 'project', 'news', 'faq'];

function NavLink({ item, active }) {
  return (
    <a className={`nav-link ${active ? 'active' : ''}`} href={`#/${item.path}`}>
      <Icon name={item.icon} />
      <span>{item.label}</span>
    </a>
  );
}

export default function Layout({ children, route, currentUser, onLogout, notifications }) {
  const mainItems = navigation.filter((item) => ['main', 'commerce', 'content'].includes(item.group));
  const projectItems = navigation.filter((item) => ['project', 'support'].includes(item.group));

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="logo-button" type="button" onClick={() => navigate('matchmaking')}>
          <Logo compact />
        </button>

        <nav className="top-nav" aria-label="Главное меню">
          {navigation
            .filter((item) => topLinks.includes(item.path))
            .map((item) => (
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
            {mainItems.map((item) => <NavLink key={item.path} item={item} active={route === item.path} />)}
            <div className="side-divider" />
            {projectItems.map((item) => <NavLink key={item.path} item={item} active={route === item.path} />)}
          </nav>
        </aside>

        <main className="page-content">{children}</main>

        <aside className="rightbar" aria-label="Быстрые ссылки">
          {['profile', 'feedback', 'quests', 'settings', 'admin'].map((key) => {
            const item = navigation.find((nav) => nav.path === key) || { path: key, icon: key === 'admin' ? 'admin' : 'settings', label: key };
            if (key === 'admin' && currentUser?.role !== 'admin') return null;
            return (
              <a key={key} href={`#/${item.path}`} title={item.label}>
                <Icon name={item.icon} />
              </a>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
