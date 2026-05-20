import React from "react";
import Icon from "./Icon.jsx";
import Logo from "./Logo.jsx";
import { navigate } from "../utils/router.js";

const topNav = [
  { to: "matchmaking", label: "Матчмейкинг", icon: "home" },
  { to: "play", label: "Играть", icon: "play" },
  { to: "match-room", label: "Комната матча", icon: "swords" },
  { to: "tournaments", label: "Турниры", icon: "trophy" },
  { to: "premium", label: "Premium", icon: "crown" },
  { to: "teams", label: "Команды", icon: "users" },
  { to: "leaderboard", label: "Лидерборд", icon: "chart" },
  { to: "news", label: "Новости", icon: "news" },
  { to: "faq", label: "FAQ", icon: "message" },
];

const mainNav = [
  { to: "search", label: "Поиск", icon: "search" },
  { to: "friends", label: "Party Finder", icon: "users" },
  { to: "play", label: "Играть", icon: "play" },
  { to: "match-room", label: "Комната матча", icon: "swords" },
  { to: "premium", label: "Premium", icon: "crown" },
  { to: "teams", label: "Команды", icon: "users" },
  { to: "leaderboard", label: "Лидерборд", icon: "chart" },
  { to: "news", label: "Новости", icon: "news" },
  { to: "quests", label: "Задания", icon: "missions" },
  { to: "feedback", label: "Обратная связь", icon: "message" },
];

const serviceNav = [
  { to: "tournaments", label: "Турниры", icon: "trophy" },
  { to: "inventory", label: "SKINBRO | CS2", icon: "inventory" },
  { to: "rules", label: "Правила", icon: "shield" },
  { to: "contacts", label: "Контакты", icon: "message" },
  { to: "privacy", label: "Политика", icon: "shield" },
];

function NavButton({ item, active }) {
  return (
    <button
      type="button"
      onClick={() => navigate(item.to)}
      className={active ? "nav-item active" : "nav-item"}
      title={item.label}
    >
      <span className="nav-icon">
        <Icon name={item.icon} />
      </span>
      <span>{item.label}</span>
    </button>
  );
}

function TopButton({ item, active }) {
  return (
    <button
      type="button"
      onClick={() => navigate(item.to)}
      className={active ? "top-link active" : "top-link"}
    >
      {item.label}
    </button>
  );
}

export default function Layout({
  route,
  currentUser,
  onLogout,
  notifications = [],
  children,
}) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          type="button"
          className="brand-button"
          onClick={() => navigate("matchmaking")}
        >
          <Logo compact />
        </button>

        <nav className="topnav">
          {topNav.map((item) => (
            <TopButton
              key={item.to}
              item={item}
              active={route === item.to}
            />
          ))}
        </nav>

        <div className="top-actions">
          <button type="button" className="notify-button">
            🔔 {notifications.length}
          </button>

          {currentUser ? (
            <>
              {currentUser.role === "admin" && (
                <button
                  type="button"
                  className="small-button admin-button"
                  onClick={() => navigate("admin")}
                >
                  Админ
                </button>
              )}

              <button
                type="button"
                className="small-button"
                onClick={() => navigate("profile")}
              >
                {currentUser.nickname || currentUser.username}
              </button>

              <button
                type="button"
                className="small-button danger"
                onClick={onLogout}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="small-button"
                onClick={() => navigate("login")}
              >
                Войти
              </button>

              <button
                type="button"
                className="small-button primary"
                onClick={() => navigate("register")}
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      </header>

      <div className="layout-body">
        <aside className="sidebar">
          <button
            type="button"
            className="sidebar-logo-button"
            onClick={() => navigate("matchmaking")}
          >
            <Logo />
          </button>

          <nav className="side-nav">
            {mainNav.map((item) => (
              <NavButton
                key={item.to}
                item={item}
                active={route === item.to}
              />
            ))}
          </nav>

          <div className="side-separator" />

          <nav className="side-nav">
            {serviceNav.map((item) => (
              <NavButton
                key={item.to}
                item={item}
                active={route === item.to}
              />
            ))}
          </nav>
        </aside>

        <main className="page-area">{children}</main>
      </div>
    </div>
  );
}
