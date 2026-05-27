import Icon from "./Icon.jsx";
import Logo from "./Logo.jsx";
import { navigate } from "../utils/router.js";

const topNav = [
  { path: "matchmaking", label: "Матчмейкинг", icon: "home" },
  { path: "play", label: "Играть", icon: "play" },
  { path: "match-room", label: "Комната матча", icon: "swords" },
  { path: "tournaments", label: "Турниры", icon: "trophy" },
  { path: "premium", label: "Premium", icon: "crown" },
  { path: "teams", label: "Команды", icon: "users" },
  { path: "leaderboard", label: "Лидерборд", icon: "chart" },
  { path: "news", label: "Новости", icon: "news" },
  { path: "faq", label: "FAQ", icon: "message" },
];

const mainNav = [
  { path: "search", label: "Поиск", icon: "search" },
  { path: "friends", label: "Party Finder", icon: "users" },
  { path: "play", label: "Играть", icon: "play" },
  { path: "match-room", label: "Комната матча", icon: "swords" },
  { path: "premium", label: "Premium", icon: "crown" },
  { path: "teams", label: "Команды", icon: "users" },
  { path: "leaderboard", label: "Лидерборд", icon: "chart" },
  { path: "news", label: "Новости", icon: "news" },
  { path: "quests", label: "Задания", icon: "missions" },
  { path: "feedback", label: "Обратная связь", icon: "message" },
];

const serviceNav = [
  { path: "tournaments", label: "Турниры", icon: "trophy" },
  { path: "inventory", label: "SKINBRO | CS2", icon: "inventory" },
  { path: "testing", label: "Тестирование", icon: "shield" },
  { path: "rules", label: "Правила", icon: "shield" },
  { path: "contacts", label: "Контакты", icon: "message" },
  { path: "privacy", label: "Политика", icon: "shield" },
];

function NavLink({ item, active }) {
  return (
    <button
      type="button"
      className={`nav-link ${active ? "active" : ""}`}
      onClick={() => navigate(item.path)}
      title={item.label}
    >
      <Icon name={item.icon} />
      <span>{item.label}</span>
    </button>
  );
}

function TopLink({ item, active }) {
  return (
    <button
      type="button"
      className={active ? "top-link active" : "top-link"}
      onClick={() => navigate(item.path)}
      title={item.label}
    >
      {item.label}
    </button>
  );
}

export default function Layout({
  children,
  route,
  currentUser,
  onLogout,
  notifications = [],
}) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="logo-button"
          type="button"
          onClick={() => navigate("matchmaking")}
        >
          <Logo compact />
        </button>

        <nav className="top-nav" aria-label="Главное меню">
          {topNav.map((item) => (
            <TopLink
              key={item.path}
              item={item}
              active={route === item.path}
            />
          ))}
        </nav>

        <div className="top-actions">
          <button type="button" className="notif" title="Уведомления">
            🔔 {notifications.length}
          </button>

          {currentUser ? (
            <>
              <button
                type="button"
                className="small-action"
                onClick={() => navigate("profile")}
              >
                {currentUser.nickname || currentUser.username}
              </button>

              {currentUser.role === "admin" && (
                <button
                  type="button"
                  className="small-action admin"
                  onClick={() => navigate("admin")}
                >
                  Админ-панель
                </button>
              )}

              <button
                className="small-action"
                type="button"
                onClick={onLogout}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="small-action"
                onClick={() => navigate("login")}
              >
                Войти
              </button>

              <button
                type="button"
                className="small-action admin"
                onClick={() => navigate("register")}
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      </header>

      <div className="body-grid">
        <aside className="sidebar">
          <button
            className="logo-large-button"
            type="button"
            onClick={() => navigate("matchmaking")}
          >
            <Logo />
          </button>

          <nav className="side-list" aria-label="Разделы сайта">
            {mainNav.map((item) => (
              <NavLink
                key={item.path}
                item={item}
                active={route === item.path}
              />
            ))}

            <div className="side-divider" />

            {serviceNav.map((item) => (
              <NavLink
                key={item.path}
                item={item}
                active={route === item.path}
              />
            ))}
          </nav>
        </aside>

        <main className="page-content">{children}</main>

        <aside className="rightbar" aria-label="Быстрые ссылки">
          {[
            { path: "profile", icon: "users", label: "Профиль" },
            { path: "feedback", icon: "message", label: "Обратная связь" },
            { path: "quests", icon: "missions", label: "Задания" },
            { path: "settings", icon: "settings", label: "Настройки" },
          ].map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              title={item.label}
            >
              <Icon name={item.icon} />
            </button>
          ))}

          {currentUser?.role === "admin" && (
            <button
              type="button"
              onClick={() => navigate("admin")}
              title="Админ-панель"
            >
              <Icon name="admin" />
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
