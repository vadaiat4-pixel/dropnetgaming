import React, { useEffect, useMemo, useState } from "react";

const STORAGE_USERS = "dropnetgaming_users_v7";
const STORAGE_SESSION = "dropnetgaming_session_v7";
const STORAGE_TICKETS = "dropnetgaming_tickets_v7";
const STORAGE_NEWS = "dropnetgaming_news_v7";
const STORAGE_MATCHES = "dropnetgaming_matches_v7";
const STORAGE_QUESTS = "dropnetgaming_quests_v7";

const DEFAULT_ADMIN = {
  username: "skwizzy22",
  password: "123456",
  nickname: "skwizzy22",
  email: "admin@dropnetgaming.local",
  role: "admin",
  elo: 1000,
  level: 1,
  wins: 0,
  losses: 0,
  matches: 0,
  xp: 0,
};

const defaultNews = [
  { id: 1, tag: "CS2", title: "CS2: крупное обновление Source 2", text: "Улучшения производительности, стрельбы, сетевых элементов и стабильности матчей.", hot: true, createdAt: "Сегодня" },
  { id: 2, tag: "Dropnetgaming", title: "Автоматический матчмейкинг запущен", text: "Теперь поиск матча сам собирает игроков, выбирает карту и создаёт матч.", hot: true, createdAt: "Сегодня" },
  { id: 3, tag: "Gaming", title: "Ежедневные задания на платформе", text: "Игроки получают XP за задания, матчи, победы и активность на сайте.", hot: false, createdAt: "Сегодня" },
];

const maps = ["Mirage", "Inferno", "Dust II", "Nuke", "Ancient", "Anubis", "Vertigo", "Overpass"];
const botNames = ["clutchking", "aimlord", "deagleman", "rushb", "smokemaster", "awpghost", "entrygod", "pixelhunter", "flashpro", "ninjadefuse", "headshotter", "infernofox"];

const ru = {
  matchmaking: "Матчмейкинг",
  play: "Играть",
  tournaments: "Турниры",
  league: "Лига",
  news: "Новости",
  search: "Поиск",
  profile: "Профиль",
  stats: "Статистика",
  friends: "Друзья",
  inventory: "Инвентарь",
  missions: "Задания",
  maps: "Карты",
  servers: "Серверы",
  anticheat: "Античит",
  settings: "Настройки",
  feedback: "Обратная связь",
  leaderboard: "Лидерборд",
  login: "Войти",
  register: "Регистрация",
  logout: "Выйти",
  rank: "Ранг",
  track: "Track",
  partyFinder: "Party Finder",
  createClub: "Создать клуб",
  findMatch: "НАЙТИ МАТЧ",
  selectedLanguage: "Выбран язык",
  language: "Язык",
  themes: "Тема",
  searchLanguage: "Поиск языка...",
  activeTheme: "Активная тема",
  rankless: "Без ранга",
  season: "Сезон 8",
  verified: "Верификация пройдена",
  invite: "Пригласить",
  partySearch: "Поиск группы",
  matchType: "Тип матча",
  premium: "Premium подбор • Античит • Карты CS2",
  mainAction: "Основное действие",
  back: "Назад",
  open: "Открыто",
  demo: "Демо-действие работает",
  playerProfile: "Профиль игрока",
  latestMatches: "Последние матчи",
  details: "Подробнее",
  siteNote: "DROP NET GAMING • CS2 Update",
};

const en = {
  ...ru,
  matchmaking: "Matchmaking",
  play: "Play",
  tournaments: "Tournaments",
  league: "League",
  news: "News",
  search: "Search",
  profile: "Profile",
  stats: "Stats",
  friends: "Friends",
  inventory: "Inventory",
  missions: "Quests",
  maps: "Maps",
  servers: "Servers",
  anticheat: "Anticheat",
  settings: "Settings",
  feedback: "Feedback",
  leaderboard: "Leaderboard",
  login: "Login",
  register: "Register",
  logout: "Logout",
  rank: "Rank",
  rankless: "Unranked",
  findMatch: "FIND MATCH",
  language: "Language",
  themes: "Theme",
  selectedLanguage: "Selected language",
  activeTheme: "Active theme",
};

const translations = { "Русский": ru, English: en };
const languages = ["Русский", "English", "Deutsch", "Français", "Español", "Українська", "Polski", "Türkçe", "中文", "日本語"];

function t(language, key) {
  const dictionary = translations[language] || ru;
  return dictionary[key] || ru[key] || key;
}

const theme = {
  panel: "bg-black/68 backdrop-blur-2xl",
  card: "bg-zinc-950/70 backdrop-blur-2xl",
  border: "border-white/15",
  glow: "shadow-[0_0_48px_rgba(255,255,255,0.10)]",
  button: "bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-700 hover:from-black hover:via-zinc-700 hover:to-zinc-600",
};

const routeIcons = {
  matchmaking: "home",
  play: "play",
  tournaments: "trophy",
  league: "chart",
  leaderboard: "chart",
  news: "news",
  search: "search",
  profile: "shield",
  stats: "stats",
  friends: "users",
  inventory: "inventory",
  missions: "missions",
  maps: "map",
  servers: "server",
  anticheat: "shield",
  settings: "settings",
  feedback: "message",
  login: "login",
  register: "plus",
  admin: "admin",
};

const routes = Object.keys(routeIcons);

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage может быть заблокирован, сайт всё равно работает в текущей сессии.
  }
}

function levelFromElo(elo) {
  if (elo >= 2400) return 10;
  if (elo >= 2200) return 9;
  if (elo >= 2000) return 8;
  if (elo >= 1800) return 7;
  if (elo >= 1600) return 6;
  if (elo >= 1400) return 5;
  if (elo >= 1200) return 4;
  if (elo >= 1050) return 3;
  if (elo >= 900) return 2;
  return 1;
}

function normalizeUser(user) {
  const elo = Number(user.elo ?? 1000);
  return {
    ...user,
    elo,
    level: levelFromElo(elo),
    wins: Number(user.wins ?? 0),
    losses: Number(user.losses ?? 0),
    matches: Number(user.matches ?? 0),
    xp: Number(user.xp ?? 0),
  };
}

function loadUsers() {
  const users = readJson(STORAGE_USERS, []);
  const cleanedUsers = users.filter((user) => user.username !== "admin" && user.username !== DEFAULT_ADMIN.username).map(normalizeUser);
  return [normalizeUser(DEFAULT_ADMIN), ...cleanedUsers];
}

function loadSession() {
  const session = readJson(STORAGE_SESSION, null);
  return session ? normalizeUser(session) : null;
}

function saveSession(user) {
  try {
    if (user) writeJson(STORAGE_SESSION, normalizeUser(user));
    else window.localStorage.removeItem(STORAGE_SESSION);
  } catch {
    // ignore
  }
}

function getRouteFromHash() {
  const cleanHash = window.location.hash.replace("#/", "").replace("#", "").split("?")[0];
  return routes.includes(cleanHash) ? cleanHash : "matchmaking";
}

function goTo(setPage, page, message) {
  const targetPage = routes.includes(page) ? page : "matchmaking";
  window.history.pushState(null, "", `#/${targetPage}`);
  setPage(targetPage);
  if (message) window.setTimeout(() => alert(message), 40);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function makeDailyQuests() {
  const day = new Date().getDate();
  const pool = [
    { title: "Сыграй 1 матч", goal: 1, progress: 0, reward: 40, type: "matches" },
    { title: "Выиграй 1 матч", goal: 1, progress: 0, reward: 60, type: "wins" },
    { title: "Получить +25 ELO", goal: 25, progress: 0, reward: 50, type: "elo" },
    { title: "Открой раздел новостей", goal: 1, progress: 0, reward: 25, type: "news" },
    { title: "Отправь обращение", goal: 1, progress: 0, reward: 30, type: "feedback" },
  ];
  return [pool[day % pool.length], pool[(day + 1) % pool.length], pool[(day + 2) % pool.length]].map((quest, index) => ({ ...quest, id: `${todayKey()}-${index}`, completed: false }));
}

function loadDailyQuests() {
  const saved = readJson(STORAGE_QUESTS, null);
  if (!saved || saved.date !== todayKey()) return { date: todayKey(), quests: makeDailyQuests() };
  return saved;
}

function Icon({ name, size = 22, className = "" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    home: <><path {...p} d="M4 11.5 12 5l8 6.5" /><path {...p} d="M6.5 10.5V20h11v-9.5" /><path {...p} d="M10 20v-5h4v5" /></>,
    search: <><circle {...p} cx="10.5" cy="10.5" r="6.5" /><path {...p} d="M16 16l4 4" /></>,
    play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />,
    stats: <><path {...p} d="M5 19V9" /><path {...p} d="M12 19V5" /><path {...p} d="M19 19v-7" /><path {...p} d="M3 19h18" /></>,
    chart: <><path {...p} d="M4 17l5-5 4 4 7-8" /><path {...p} d="M15 8h5v5" /></>,
    shield: <><path {...p} d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" /><path {...p} d="m9 12 2 2 4-5" /></>,
    users: <><path {...p} d="M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" /><path {...p} d="M3 20c.7-3.4 2.8-5.2 5.5-5.2S13.3 16.6 14 20" /><path {...p} d="M16 11a3 3 0 1 0 0-6" /><path {...p} d="M16 15c2.5.2 4.1 1.8 4.8 5" /></>,
    plus: <><path {...p} d="M12 5v14" /><path {...p} d="M5 12h14" /></>,
    crown: <><path {...p} d="m4 8 4 4 4-7 4 7 4-4-2 11H6L4 8Z" /><path {...p} d="M6 19h12" /></>,
    trophy: <><path {...p} d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path {...p} d="M8 7H4a4 4 0 0 0 4 4" /><path {...p} d="M16 7h4a4 4 0 0 1-4 4" /><path {...p} d="M12 13v4" /><path {...p} d="M8 21h8" /></>,
    map: <><path {...p} d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z" /><path {...p} d="M9 4v14" /><path {...p} d="M15 6v14" /></>,
    server: <><rect {...p} x="4" y="5" width="16" height="6" rx="2" /><rect {...p} x="4" y="13" width="16" height="6" rx="2" /><path {...p} d="M8 8h.01M8 16h.01" /></>,
    settings: <><path {...p} d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /><path {...p} d="M4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" /></>,
    inventory: <><path {...p} d="M4 8h16v11H4V8Z" /><path {...p} d="M7 8V5h10v3" /><path {...p} d="M9 13h6" /></>,
    missions: <><circle {...p} cx="12" cy="12" r="8" /><circle {...p} cx="12" cy="12" r="3" /><path {...p} d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    crosshair: <><circle {...p} cx="12" cy="12" r="7" /><path {...p} d="M12 2v4M12 18v4M2 12h4M18 12h4" /></>,
    login: <><path {...p} d="M10 17l5-5-5-5" /><path {...p} d="M15 12H3" /><path {...p} d="M14 4h5v16h-5" /></>,
    admin: <><path {...p} d="M12 3 20 7v5c0 5-3.3 8-8 9-4.7-1-8-4-8-9V7l8-4Z" /><path {...p} d="M9 11h6" /><path {...p} d="M9 15h6" /></>,
    news: <><path {...p} d="M5 5h14v14H5z" /><path {...p} d="M8 9h8" /><path {...p} d="M8 13h8" /><path {...p} d="M8 17h5" /></>,
    message: <><path {...p} d="M4 5h16v11H8l-4 4V5Z" /><path {...p} d="M8 9h8" /><path {...p} d="M8 13h5" /></>,
    theme: <path {...p} d="M12 3a9 9 0 1 0 9 9 6.5 6.5 0 0 1-9-9Z" />,
    language: <><path {...p} d="M4 5h9" /><path {...p} d="M9 5c-.6 4.2-2.2 7.2-5 9" /><path {...p} d="M14 20l4-9 4 9" /><path {...p} d="M15.5 17h5" /></>,
    swords: <><path {...p} d="M6 4l14 14" /><path {...p} d="M18 4 4 18" /></>,
  };
  return <span className={`inline-flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}><svg viewBox="0 0 24 24" width={size} height={size}>{icons[name] || <circle cx="12" cy="12" r="4" fill="currentColor" />}</svg></span>;
}

function IconBox({ name, active = false }) {
  const activeClass = "bg-gradient-to-br from-cyan-500 via-red-500 to-fuchsia-600 border-cyan-300/70 text-white shadow-[0_0_22px_rgba(34,211,238,0.35)]";
  const idleClass = "bg-white/[0.04] border-white/10 text-zinc-300 group-hover:text-cyan-200 group-hover:border-cyan-300/40 group-hover:bg-cyan-500/10";
  return <span className={`h-9 w-9 shrink-0 rounded-2xl flex items-center justify-center border transition-all duration-200 ${active ? activeClass : idleClass}`}><Icon name={name} size={20} /></span>;
}

function DropnetgamingLogo({ compact = false }) {
  const logoSrc = `${import.meta.env.BASE_URL}logo-dng-final.png`;

  if (compact) {
    return (
      <div className="leading-none px-2">
        <div className="text-white font-black text-3xl tracking-tight">DNG</div>
        <div className="text-[10px] font-black tracking-[0.35em] text-zinc-300/80 text-center">CS2</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[190px] rounded-[28px] overflow-hidden bg-transparent border-0 shadow-none">
      <img
        src={logoSrc}
        alt="DNG logo"
        className="block w-full h-auto object-contain rounded-[28px] bg-transparent"
      />
    </div>
  );
}

function Avatar({ seed = "dn", size = "h-10 w-10" }) {
  return <div className={`${size} rounded-full bg-zinc-950 border border-cyan-900/60 flex items-center justify-center text-xs font-black text-white`}>{seed.slice(0, 2).toUpperCase()}</div>;
}

function ClickButton({ children, onClick, className = "", title }) {
  return <button type="button" title={title} onClick={(event) => { event.preventDefault(); event.stopPropagation(); if (onClick) onClick(); }} className={`relative overflow-hidden cursor-pointer select-none transition-all duration-200 ease-out active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`} style={{ pointerEvents: "auto" }}>{children}</button>;
}

function ActionButton({ children, onClick, dark = false }) {
  const cls = dark ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/30 text-white" : `${theme.button} border-white/20 text-white shadow-[0_0_26px_rgba(255,255,255,0.10)] hover:shadow-[0_0_34px_rgba(255,255,255,0.16)]`;
  return <ClickButton onClick={onClick} className={`${cls} px-5 py-3 rounded-2xl font-black border backdrop-blur-md tracking-wide`}><span className="relative z-10">{children}</span></ClickButton>;
}

function TextInput({ label, value, onChange, type = "text", placeholder }) {
  return <label className="block"><span className="text-sm text-zinc-300 font-semibold">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} type={type} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-cyan-950/60 bg-black/55 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" /></label>;
}

function TopNav({ page, setPage, language, currentUser, onLogout, notifications }) {
  const topLinks = ["matchmaking", "play", "tournaments", "leaderboard", "news"];
  return (
    <div className={`min-h-[60px] bg-black/65 backdrop-blur-md border-b ${theme.border} flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6 py-3 lg:py-0 ${theme.glow}`}>
      <ClickButton onClick={() => goTo(setPage, "matchmaking")} className="flex items-center gap-3"><DropnetgamingLogo compact /></ClickButton>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 text-xs font-black uppercase tracking-wide">{topLinks.map((key) => <ClickButton key={key} onClick={() => goTo(setPage, key)} className={`h-10 px-4 rounded-full border shrink-0 ${page === key ? "bg-gradient-to-r from-cyan-500/25 to-red-500/20 text-white border-cyan-400/60 shadow-[0_0_22px_rgba(34,211,238,0.18)]" : "bg-white/[0.03] text-zinc-300 border-white/5 hover:bg-white/[0.08] hover:text-white hover:border-cyan-300/30"}`}>{t(language, key)}</ClickButton>)}</div>
      <div className="flex items-center gap-2 text-zinc-300">
        <div className="relative rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black">🔔 {notifications.length}</div>
        {currentUser ? <><ClickButton onClick={() => goTo(setPage, "profile")}><Avatar seed={currentUser.nickname || currentUser.username} /></ClickButton>{currentUser.role === "admin" && <ClickButton onClick={() => goTo(setPage, "admin")} className="px-3 py-2 rounded-xl bg-cyan-500/20 border border-cyan-300/40 hover:bg-cyan-500/35 hover:text-white text-xs font-black">Админ-панель</ClickButton>}<ClickButton onClick={onLogout} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-white text-xs font-bold">{t(language, "logout")}</ClickButton></> : <><ClickButton onClick={() => goTo(setPage, "login")} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/15 hover:text-white text-xs font-bold">{t(language, "login")}</ClickButton><ClickButton onClick={() => goTo(setPage, "register")} className="px-3 py-2 rounded-xl bg-cyan-500/20 border border-cyan-300/30 hover:bg-cyan-500/30 hover:text-white text-xs font-bold">{t(language, "register")}</ClickButton></>}
      </div>
    </div>
  );
}

function LeftSidebar({ page, setPage, language }) {
  const mainItems = [
    { key: "search", icon: "search", label: t(language, "search") },
    { key: "friends", icon: "users", label: t(language, "partyFinder") },
    { key: "play", icon: "play", label: t(language, "play") },
    { key: "news", icon: "news", label: t(language, "news") },
    { key: "leaderboard", icon: "chart", label: t(language, "leaderboard") },
    { key: "missions", icon: "missions", label: t(language, "missions") },
    { key: "feedback", icon: "message", label: t(language, "feedback") },
  ];
  const clubItems = [{ key: "tournaments", icon: "users", label: t(language, "tournaments") }, { key: "inventory", icon: "trophy", label: "SKINBRO | CS2" }, { key: "profile", icon: "plus", label: t(language, "createClub") }];
  const itemClass = (key) => `h-12 rounded-2xl flex items-center gap-3 px-4 text-left border backdrop-blur-md shrink-0 lg:w-full ${page === key ? "bg-gradient-to-r from-cyan-500/22 via-red-500/12 to-transparent text-white border-cyan-400/50 shadow-[0_0_24px_rgba(34,211,238,0.16)]" : "bg-white/[0.025] text-zinc-300 border-white/5 hover:bg-white/[0.07] hover:text-white hover:border-cyan-300/30 lg:hover:translate-x-1"}`;
  return <aside className={`w-full lg:w-60 bg-black/60 backdrop-blur-md border-b lg:border-b-0 lg:border-r ${theme.border} flex lg:flex-col py-3 lg:py-6 px-3 lg:px-4 gap-2 overflow-x-auto lg:overflow-visible ${theme.glow}`}><div className="hidden lg:flex justify-center mb-6">
        <ClickButton
          onClick={() => goTo(setPage, "matchmaking")}
          className="bg-transparent border-0 shadow-none p-0 rounded-[28px] overflow-hidden"
        >
          <DropnetgamingLogo />
        </ClickButton>
      </div>{[...mainItems, ...clubItems].map((item, index) => <React.Fragment key={item.key}>{index === mainItems.length && <div className="hidden lg:block h-px bg-cyan-950/50 my-4" />}<ClickButton title={item.label} onClick={() => goTo(setPage, item.key)} className={`${itemClass(item.key)} group`}><IconBox name={item.icon} active={page === item.key} /><span className="text-sm lg:text-base font-semibold tracking-wide whitespace-nowrap">{item.label}</span></ClickButton></React.Fragment>)}</aside>;
}

function RightBar({ setPage, language }) {
  const buttons = ["profile", "friends", "inventory", "missions", "anticheat", "settings"];
  return <aside className={`hidden lg:flex w-16 bg-black/60 backdrop-blur-md border-l ${theme.border} flex-col items-center py-4 gap-5 text-zinc-300 ${theme.glow}`}><ClickButton onClick={() => goTo(setPage, "profile")}><Avatar seed="dn" size="h-11 w-11" /></ClickButton>{buttons.map((key) => <ClickButton key={key} onClick={() => goTo(setPage, key)} className="hover:text-cyan-400" title={t(language, key)}><Icon name={routeIcons[key]} /></ClickButton>)}</aside>;
}

function MatchSearchModal({ searchState, onCancel }) {
  if (!searchState.active && !searchState.found) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className={`w-full max-w-xl rounded-3xl border ${theme.border} ${theme.panel} p-7 text-white ${theme.glow}`}>
        <div className="flex items-center justify-between gap-4"><h2 className="text-3xl font-black">{searchState.found ? "Матч найден!" : "Поиск матча..."}</h2><button type="button" onClick={onCancel} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10">Закрыть</button></div>
        <div className="mt-6 rounded-2xl border border-cyan-950/60 bg-black/40 p-5">
          <div className="flex items-end justify-between"><span className="text-zinc-400">Игроки</span><b className="text-4xl text-cyan-300">{searchState.players}/10</b></div>
          <div className="mt-4 h-3 rounded-full bg-zinc-800"><div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-red-500 transition-all" style={{ width: `${searchState.players * 10}%` }} /></div>
          <p className="mt-4 text-zinc-300">{searchState.message}</p>
        </div>
        {searchState.match && <div className="mt-5 grid sm:grid-cols-3 gap-3 text-center">{[[searchState.match.map, "Карта"], [searchState.match.server, "Сервер"], [`${searchState.match.eloChange > 0 ? "+" : ""}${searchState.match.eloChange}`, "ELO"]].map(([value, label]) => <div key={label} className="rounded-2xl border border-cyan-950/60 bg-black/40 p-4"><b className="text-xl">{value}</b><p className="text-xs text-zinc-400">{label}</p></div>)}</div>}
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return <div className={`${theme.card} rounded-2xl border border-cyan-950/50 p-4 text-center`}><b className="text-2xl text-cyan-200">{value}</b><p className="text-xs text-zinc-400">{label}</p></div>;
}

function Matchmaking({ setPage, language, currentUser, onStartMatch, quests, matches }) {
  const partySlots = [0, 1, 2, 3];
  const matchTypes = language === "Русский" ? ["Стандартный матч", "Суперматч", "Premium Match"] : ["Standard Match", "Super Match", "Premium Match"];
  const user = currentUser || { nickname: "skwizzy22", username: "guest", elo: 1000, level: 1, wins: 0, matches: 0 };
  return <main className="flex-1 overflow-auto bg-transparent text-white"><div className="bg-gradient-to-r from-black via-zinc-800 to-black text-white font-black text-center py-3 border-b border-white/10 shadow-[0_0_34px_rgba(255,255,255,0.12)] tracking-wide">{t(language, "siteNote")} • STEEL WINGS ARENA</div><section className="relative min-h-[520px] px-4 sm:px-6 lg:px-28 py-10 lg:py-16 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.18),transparent_42%),radial-gradient(circle_at_75%_20%,rgba(239,35,60,0.15),transparent_36%),linear-gradient(90deg,rgba(0,0,0,0.70),rgba(26,7,2,0.55),rgba(10,0,18,0.72))]"><div className="lg:absolute lg:top-5 lg:left-1/2 lg:-translate-x-1/2 bg-black/70 text-white px-4 py-1 rounded-full text-sm font-black border border-cyan-900/60 inline-block">Europe CS2 5v5 Queue</div><div className="mt-6 lg:mt-0 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8"><div className="flex flex-col sm:flex-row sm:items-center gap-8"><ClickButton onClick={() => goTo(setPage, "profile")} className="h-28 w-28 rounded-full border-[12px] border-zinc-900 hover:border-cyan-500 flex items-center justify-center text-5xl text-cyan-300 font-black">{user.level}</ClickButton><div><ClickButton onClick={() => goTo(setPage, "leaderboard")} className="text-sm bg-black/70 hover:bg-cyan-950/40 inline-block px-3 py-1 rounded-full mb-3 border border-cyan-950/60">ELO {user.elo}</ClickButton><h1 className="text-4xl font-black">Level {user.level}</h1><div className="h-1 max-w-[520px] w-full bg-zinc-800 mt-4 rounded"><div className="h-1 bg-gradient-to-r from-cyan-400 to-red-500 rounded" style={{ width: `${Math.min(100, (user.elo % 200) / 2)}%` }} /></div><p className="text-xs text-zinc-400 mt-2">Побед: {user.wins} • Матчей: {user.matches} • XP: {user.xp}</p><ClickButton onClick={() => goTo(setPage, "profile")} className="mt-7 flex gap-3 items-center hover:text-cyan-300"><b>{user.nickname || user.username}</b><span className="bg-black/70 px-3 py-2 rounded-full text-sm font-bold border border-cyan-950/60"><Icon name="shield" size={16} className="inline mr-1" />{t(language, "verified")}</span></ClickButton></div></div><div className="grid gap-3 w-full xl:w-[640px]"><ClickButton onClick={() => goTo(setPage, "missions")} className={`${theme.panel} border ${theme.border} hover:border-cyan-400 rounded-xl p-4 flex items-center justify-between text-left`}><div><p className="text-xs tracking-[.25em] text-zinc-400 uppercase">Daily Quests</p><h3 className="font-black mt-1">{quests.quests.filter((q) => q.completed).length}/{quests.quests.length} заданий выполнено</h3><div className="h-2 w-72 max-w-full bg-zinc-800 mt-3 rounded"><div className="h-2 bg-gradient-to-r from-cyan-400 to-red-500 rounded" style={{ width: `${(quests.quests.filter((q) => q.completed).length / quests.quests.length) * 100}%` }} /></div></div><Icon name="trophy" size={24} className="text-cyan-400" /></ClickButton><ClickButton onClick={() => goTo(setPage, "leaderboard")} className={`${theme.panel} border ${theme.border} hover:border-cyan-400 rounded-xl p-4 flex items-center justify-between text-left`}><div><h3 className="font-black">ELO и уровни</h3><p className="text-cyan-400 mt-2 font-bold">Открыть лидерборд</p><p className="text-xs text-zinc-400 mt-2">Последних матчей: {matches.length}</p></div><Icon name="chart" size={42} className="text-cyan-400" /></ClickButton></div></div><div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8 mt-10 max-w-6xl mx-auto">{partySlots.map((slot) => <ClickButton key={slot} onClick={() => (slot === 2 ? goTo(setPage, "profile") : goTo(setPage, "friends"))} className={`${theme.panel} h-44 lg:h-56 rounded-3xl border ${theme.border} hover:border-cyan-400 flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(34,211,238,0.18)]`}>{slot === 2 ? <><Icon name="crown" size={28} className="text-cyan-400 mb-3" /><Avatar seed={user.nickname || user.username} size="h-20 w-20 lg:h-24 lg:w-24" /><div className="mt-3 text-white font-bold">{user.nickname || user.username}</div></> : <><Icon name="plus" size={48} className="text-zinc-400" /><span className="text-xs text-zinc-400 mt-2">{t(language, "invite")}</span></>}</ClickButton>)}<ClickButton onClick={() => goTo(setPage, "search")} className={`${theme.panel} h-44 lg:h-56 rounded-3xl border ${theme.border} hover:border-cyan-400 flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(34,211,238,0.18)]`}><Icon name="search" size={34} className="text-zinc-400 mb-3" /><b className="text-zinc-200">{t(language, "partySearch")}</b></ClickButton></div></section><section className="px-4 sm:px-6 lg:px-28 -mt-4 lg:-mt-10 relative z-10 pb-16"><div className={`${theme.panel} border ${theme.border} rounded-t-2xl px-4 lg:px-6 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between`}><ClickButton onClick={() => goTo(setPage, "play")} className="text-cyan-400 flex items-center gap-2 font-bold"><Icon name="swords" /> {t(language, "matchType")}</ClickButton><ActionButton onClick={onStartMatch}>{t(language, "findMatch")}</ActionButton><ClickButton onClick={() => goTo(setPage, "servers")} className="text-zinc-300 hover:text-cyan-400 font-bold flex items-center gap-2"><Icon name="server" /> {t(language, "servers")}</ClickButton></div><div className={`grid md:grid-cols-3 gap-5 ${theme.panel} border ${theme.border} p-4 lg:p-6 rounded-b-2xl`}>{matchTypes.map((typeName) => <ClickButton key={typeName} onClick={onStartMatch} className={`${theme.card} text-left rounded-3xl border border-cyan-950/60 p-5 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.16)]`}><h3 className="font-black text-white">{typeName} <span className="text-zinc-400 text-sm">• 5v5</span></h3><p className="text-zinc-400 text-sm mt-3">{t(language, "premium")}</p></ClickButton>)}</div><SiteFooter currentUser={currentUser} setPage={setPage} /></section></main>;
}

function NewsPage({ setPage, news, markQuest }) {
  useEffect(() => { markQuest("news", 1); }, [markQuest]);
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-7xl mx-auto"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"><div><p className="text-cyan-300 font-black uppercase tracking-[0.3em] text-xs">Dropnetgaming feed</p><h1 className="text-3xl sm:text-5xl font-black mt-3">Новости CS2 и игр</h1><p className="text-zinc-400 mt-3 max-w-2xl">Новости теперь добавляются через админ-панель и сразу появляются на сайте.</p></div><ActionButton onClick={() => goTo(setPage, "feedback")}>Предложить новость</ActionButton></div></section><div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">{news.map((item) => <article key={item.id} className={`${theme.card} rounded-3xl border border-cyan-950/60 p-6 hover:-translate-y-1 hover:border-cyan-400 transition-all`}><div className="flex items-center justify-between"><span className="rounded-full bg-cyan-500/15 border border-cyan-300/30 px-3 py-1 text-xs font-black text-cyan-200">{item.tag}</span>{item.hot && <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-black text-red-200">HOT</span>}</div><h2 className="text-xl font-black mt-5">{item.title}</h2><p className="text-zinc-400 mt-3 leading-relaxed">{item.text}</p><p className="mt-5 text-xs text-zinc-500">{item.createdAt}</p></article>)}</div></div></main>;
}

function SiteFooter({ currentUser, setPage }) {
  return <footer className="mt-10 border-t border-cyan-500/10 bg-transparent text-white"><div className="grid gap-6 md:grid-cols-3 px-5 lg:px-16 py-8 text-sm"><div><h3 className="font-black mb-3">Dropnetgaming</h3><p className="text-zinc-400 leading-relaxed">Игровая платформа для CS2: матчи, ELO, задания, новости, админка и обратная связь.</p></div><div className="text-center space-y-3"><button type="button" onClick={() => goTo(setPage, "feedback")} className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 font-black hover:bg-white/[0.07]">🌐 Служба поддержки сайта</button><p>Вы зашли под именем <b>{currentUser ? currentUser.nickname || currentUser.username : "Гость"}</b></p><p className="hover:text-cyan-300 cursor-pointer">Автоматический матчмейкинг включён</p><p className="hover:text-cyan-300 cursor-pointer">Ежедневные задания обновляются каждый день</p></div><div className="md:text-right"><h3 className="font-black mb-3">Скачать мобильное приложение</h3><div className="flex flex-col md:items-end gap-3"><button type="button" className="w-44 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-left hover:bg-white/[0.07]"><span className="text-xs">GET IT ON</span><br /><b>Google Play</b></button><button type="button" className="w-44 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-left hover:bg-white/[0.07]"><span className="text-xs">Download on the</span><br /><b>App Store</b></button></div></div></div><div className="relative border-t border-cyan-500/10 bg-transparent py-4 text-center font-semibold">Тема оформления сайта разработана <div className="text-2xl font-black tracking-wide">dropnetgaming</div><button type="button" onClick={() => goTo(setPage, "feedback")} className="absolute right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/15 bg-white/[0.04] text-white font-black hover:bg-white/[0.08]">?</button></div></footer>;
}

function FeedbackPage({ currentUser, tickets, setTickets, markQuest }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const submit = () => {
    if (!subject.trim() || !message.trim()) { setStatus("Заполни тему и текст обращения"); return; }
    const ticket = { id: Date.now(), subject: subject.trim(), message: message.trim(), author: currentUser?.nickname || currentUser?.username || "Гость", createdAt: new Date().toLocaleString("ru-RU"), status: "Новое" };
    const next = [ticket, ...tickets];
    setTickets(next);
    writeJson(STORAGE_TICKETS, next);
    markQuest("feedback", 1);
    setSubject("");
    setMessage("");
    setStatus("Обращение отправлено администраторам");
  };
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="mx-auto max-w-4xl"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><Icon name="message" size={48} className="text-cyan-400" /><h1 className="text-3xl sm:text-5xl font-black mt-4">Обратная связь с админами</h1><p className="text-zinc-400 mt-3">Напиши проблему, предложение или жалобу. Обращение попадёт в админ-панель.</p><div className="mt-7 space-y-4"><TextInput label="Тема обращения" value={subject} onChange={setSubject} placeholder="Например: не работает поиск матча" /><label className="block"><span className="text-sm text-zinc-300 font-semibold">Текст обращения</span><textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={7} placeholder="Опиши проблему подробно..." className="mt-2 w-full rounded-2xl border border-cyan-950/60 bg-black/55 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" /></label>{status && <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-3 text-cyan-100">{status}</div>}<ActionButton onClick={submit}>Отправить обращение</ActionButton></div></section></div></main>;
}

function AuthPage({ mode, setPage, language, users, setUsers, setCurrentUser }) {
  const isRegister = mode === "register";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const submit = () => {
    const login = username.trim();
    if (!login || !password.trim()) { setError("Заполни логин и пароль"); return; }
    if (isRegister) {
      if (users.some((user) => user.username.toLowerCase() === login.toLowerCase())) { setError("Такой логин уже занят"); return; }
      const newUser = normalizeUser({ username: login, password, nickname: nickname.trim() || login, email: email.trim(), role: "user", elo: 1000, wins: 0, losses: 0, matches: 0, xp: 0 });
      const nextUsers = [...users, newUser];
      setUsers(nextUsers); writeJson(STORAGE_USERS, nextUsers); setCurrentUser(newUser); saveSession(newUser); goTo(setPage, "profile"); return;
    }
    const found = users.find((user) => user.username === login && user.password === password);
    if (!found) { setError("Неверный логин или пароль"); return; }
    const normalized = normalizeUser(found);
    setCurrentUser(normalized); saveSession(normalized); goTo(setPage, normalized.role === "admin" ? "admin" : "profile");
  };
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="mx-auto max-w-xl rounded-3xl border border-cyan-500/25 bg-black/60 p-6 lg:p-8 shadow-[0_0_42px_rgba(59,130,246,0.20)] backdrop-blur-xl"><Icon name={isRegister ? "plus" : "login"} size={46} className="text-cyan-400" /><h1 className="mt-4 text-3xl lg:text-4xl font-black">{isRegister ? t(language, "register") : t(language, "login")}</h1><p className="mt-2 text-zinc-400">{isRegister ? "Создай аккаунт Dropnetgaming. Данные сохраняются в браузере." : "Войди в аккаунт Dropnetgaming."}</p><div className="mt-7 space-y-4"><TextInput label="Логин" value={username} onChange={setUsername} placeholder="username" />{isRegister && <TextInput label="Никнейм" value={nickname} onChange={setNickname} placeholder="skwizzy22" />}{isRegister && <TextInput label="Email" value={email} onChange={setEmail} placeholder="mail@example.com" />}<TextInput label="Пароль" value={password} onChange={setPassword} type="password" placeholder="password" />{error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-red-200">{error}</div>}<div className="flex flex-col sm:flex-row gap-3"><ActionButton onClick={submit}>{isRegister ? "Зарегистрироваться" : "Войти"}</ActionButton><ActionButton dark onClick={() => goTo(setPage, isRegister ? "login" : "register")}>{isRegister ? "Уже есть аккаунт" : "Создать аккаунт"}</ActionButton></div></div></div></main>;
}

function AdminPage({ currentUser, users, setUsers, tickets, setTickets, news, setNews, setPage }) {
  const [notice, setNotice] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newTag, setNewTag] = useState("CS2");
  const [newHot, setNewHot] = useState(true);

  if (!currentUser || currentUser.role !== "admin") return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="mx-auto max-w-2xl rounded-3xl border border-cyan-500/25 bg-black/60 p-8 backdrop-blur-xl"><Icon name="admin" size={48} className="text-cyan-400" /><h1 className="mt-4 text-4xl font-black">Админ-панель</h1><p className="mt-3 text-zinc-400">Доступ только для администратора. Войди в аккаунт администратора.</p><div className="mt-6"><ActionButton onClick={() => goTo(setPage, "login")}>Войти</ActionButton></div></div></main>;

  const deleteTicket = (id) => { const next = tickets.filter((ticket) => ticket.id !== id); setTickets(next); writeJson(STORAGE_TICKETS, next); setNotice("Обращение удалено"); };
  const updateTicketStatus = (id, status) => { const next = tickets.map((ticket) => ticket.id === id ? { ...ticket, status } : ticket); setTickets(next); writeJson(STORAGE_TICKETS, next); setNotice("Статус обращения обновлён"); };
  const makeAdmin = (username) => { const next = users.map((user) => user.username === username ? { ...user, role: "admin" } : user); setUsers(next); writeJson(STORAGE_USERS, next); setNotice(`${username} теперь администратор`); };
  const deleteUser = (username) => { if (username === DEFAULT_ADMIN.username) { setNotice("Главного админа удалить нельзя"); return; } const next = users.filter((user) => user.username !== username); setUsers(next); writeJson(STORAGE_USERS, next); setNotice(`${username} удалён`); };
  const addNews = () => { if (!newTitle.trim() || !newText.trim()) { setNotice("Заполни заголовок и текст новости"); return; } const item = { id: Date.now(), title: newTitle.trim(), text: newText.trim(), tag: newTag.trim() || "CS2", hot: newHot, createdAt: new Date().toLocaleString("ru-RU") }; const next = [item, ...news]; setNews(next); writeJson(STORAGE_NEWS, next); setNewTitle(""); setNewText(""); setNotice("Новость добавлена на сайт"); };
  const deleteNews = (id) => { const next = news.filter((item) => item.id !== id); setNews(next); writeJson(STORAGE_NEWS, next); setNotice("Новость удалена"); };

  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-7xl mx-auto space-y-6"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><Icon name="admin" size={50} className="text-cyan-400" /><h1 className="mt-3 text-3xl lg:text-4xl font-black">Админ-панель Dropnetgaming</h1><p className="mt-2 text-zinc-400">Пользователи, новости, обращения и роли.</p>{notice && <div className="mt-4 rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-3 text-cyan-100">{notice}</div>}</section><section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{[[users.length, "Пользователей"], [users.filter((user) => user.role === "admin").length, "Админов"], [tickets.length, "Обращений"], [news.length, "Новостей"]].map(([value, label]) => <StatCard key={label} value={value} label={label} />)}</section><section className={`${theme.panel} rounded-3xl border ${theme.border} p-6`}><h2 className="text-2xl font-black mb-4">Добавить новость</h2><div className="grid lg:grid-cols-[1fr_1fr_160px_140px] gap-3"><input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Заголовок" className="rounded-2xl border border-cyan-950/60 bg-black/55 px-4 py-3 outline-none focus:border-cyan-400" /><input value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Текст новости" className="rounded-2xl border border-cyan-950/60 bg-black/55 px-4 py-3 outline-none focus:border-cyan-400" /><input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Тег" className="rounded-2xl border border-cyan-950/60 bg-black/55 px-4 py-3 outline-none focus:border-cyan-400" /><label className="flex items-center gap-2 rounded-2xl border border-cyan-950/60 bg-black/55 px-4 py-3"><input type="checkbox" checked={newHot} onChange={(e) => setNewHot(e.target.checked)} /> HOT</label></div><div className="mt-4"><ActionButton onClick={addNews}>Опубликовать новость</ActionButton></div><div className="mt-5 grid gap-3">{news.map((item) => <div key={item.id} className="rounded-2xl border border-cyan-950/60 bg-black/35 p-4"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"><b>{item.title}</b><button type="button" onClick={() => deleteNews(item.id)} className="rounded-xl border border-red-400/30 px-3 py-2 hover:bg-red-500/20">Удалить</button></div><p className="mt-2 text-zinc-300">{item.text}</p><p className="mt-2 text-xs text-zinc-500">{item.tag} • {item.createdAt}</p></div>)}</div></section><section className={`${theme.panel} rounded-3xl border ${theme.border} p-6`}><h2 className="text-2xl font-black mb-4">Обращения</h2><div className="grid gap-3">{tickets.length === 0 && <p className="text-zinc-400">Пока обращений нет.</p>}{tickets.map((ticket) => <div key={ticket.id} className="rounded-2xl border border-cyan-950/60 bg-black/35 p-4"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"><b>{ticket.subject}</b><div className="flex gap-2"><select value={ticket.status} onChange={(e) => updateTicketStatus(ticket.id, e.target.value)} className="rounded-xl border border-cyan-950/60 bg-black/70 px-3 py-2"><option>Новое</option><option>В работе</option><option>Закрыто</option><option>Отклонено</option></select><button type="button" onClick={() => deleteTicket(ticket.id)} className="rounded-xl border border-red-400/30 px-3 py-2 hover:bg-red-500/20">Удалить</button></div></div><p className="mt-2 text-zinc-300">{ticket.message}</p><p className="mt-3 text-xs text-zinc-500">{ticket.author} • {ticket.createdAt} • {ticket.status}</p></div>)}</div></section><section className={`${theme.panel} rounded-3xl border ${theme.border} p-6 overflow-x-auto`}><h2 className="text-2xl font-black mb-4">Аккаунты</h2><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-cyan-500/10 text-cyan-200"><tr><th className="p-4">Логин</th><th className="p-4">Ник</th><th className="p-4">ELO</th><th className="p-4">Level</th><th className="p-4">Роль</th><th className="p-4">Действия</th></tr></thead><tbody>{users.map((user) => <tr key={user.username} className="border-t border-cyan-950/40"><td className="p-4 font-bold">{user.username}</td><td className="p-4">{user.nickname || user.username}</td><td className="p-4 text-cyan-200 font-black">{user.elo}</td><td className="p-4">{user.level}</td><td className="p-4"><span className={`rounded-full px-3 py-1 text-xs font-black ${user.role === "admin" ? "bg-cyan-500/20 text-cyan-200" : "bg-white/10 text-zinc-300"}`}>{user.role}</span></td><td className="p-4 flex gap-2"><button type="button" onClick={() => makeAdmin(user.username)} className="rounded-xl border border-cyan-400/30 px-3 py-2 hover:bg-cyan-500/20">Админ</button><button type="button" onClick={() => deleteUser(user.username)} className="rounded-xl border border-red-400/30 px-3 py-2 hover:bg-red-500/20">Удалить</button></td></tr>)}</tbody></table></section></div></main>;
}

function ProfilePage({ setPage, language, currentUser, matches, tickets }) {
  const profile = currentUser || { username: "guest", nickname: "Гость", role: "guest", elo: 1000, level: 1, wins: 0, losses: 0, matches: 0, xp: 0 };
  const userTickets = tickets.filter((ticket) => ticket.author === profile.nickname || ticket.author === profile.username);
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-7xl mx-auto grid lg:grid-cols-[360px_1fr] gap-6"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-7 ${theme.glow}`}><div className="flex flex-col items-center text-center"><Avatar seed={profile.nickname || profile.username} size="h-32 w-32" /><h1 className="text-3xl font-black mt-5">{profile.nickname || profile.username}</h1><p className="text-zinc-400">@{profile.username} • {profile.role}</p><div className="mt-4 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-800/50 text-cyan-300 font-black">Level {profile.level} • {profile.elo} ELO</div></div><div className="grid grid-cols-2 gap-3 mt-7 text-center"><StatCard value={`${profile.wins}`} label="Побед" /><StatCard value={`${profile.losses}`} label="Поражений" /><StatCard value={`${profile.matches}`} label="Матчей" /><StatCard value={`${profile.xp}`} label="XP" /></div><div className="flex gap-3 mt-6"><ActionButton onClick={() => alert("Заявка в друзья отправлена")}>{t(language, "friends")}</ActionButton><ActionButton dark onClick={() => goTo(setPage, "settings")}>{t(language, "settings")}</ActionButton></div></section><section className="space-y-6"><div className={`rounded-3xl ${theme.panel} border ${theme.border} p-7`}><h2 className="text-2xl font-black mb-4">{t(language, "latestMatches")}</h2>{matches.length === 0 && <p className="text-zinc-400">Матчей пока нет. Нажми “НАЙТИ МАТЧ”.</p>}{matches.slice(0, 8).map((match) => <div key={match.id} className={`${theme.card} rounded-xl p-4 mb-3 border border-cyan-950/50`}><div className="flex justify-between gap-3"><b>{match.map} • {match.result}</b><span className={match.eloChange >= 0 ? "text-green-400" : "text-red-400"}>{match.eloChange >= 0 ? "+" : ""}{match.eloChange} ELO</span></div><p className="text-xs text-zinc-400 mt-2">{match.server} • {match.score} • {match.createdAt}</p></div>)}</div><div className={`rounded-3xl ${theme.panel} border ${theme.border} p-7`}><h2 className="text-2xl font-black mb-4">Мои обращения</h2>{userTickets.length === 0 && <p className="text-zinc-400">У тебя пока нет обращений.</p>}{userTickets.map((ticket) => <div key={ticket.id} className="rounded-xl border border-cyan-950/50 bg-black/35 p-4 mb-3"><b>{ticket.subject}</b><p className="text-zinc-400 mt-2">{ticket.message}</p><p className="text-xs text-cyan-300 mt-2">Статус: {ticket.status}</p></div>)}</div></section></div></main>;
}

function MissionsPage({ quests }) {
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-5xl mx-auto"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><Icon name="missions" size={48} className="text-cyan-400" /><h1 className="text-4xl font-black mt-4">Ежедневные задания</h1><p className="text-zinc-400 mt-2">Задания автоматически обновляются каждый день. За выполнение начисляется XP.</p></section><div className="grid md:grid-cols-3 gap-5 mt-6">{quests.quests.map((quest) => <div key={quest.id} className={`${theme.card} rounded-3xl border border-cyan-950/60 p-6`}><div className="flex items-center justify-between"><Icon name="trophy" className="text-cyan-400" /><span className={quest.completed ? "text-green-400 font-black" : "text-zinc-400 font-black"}>{quest.completed ? "ГОТОВО" : `${quest.progress}/${quest.goal}`}</span></div><h2 className="text-xl font-black mt-5">{quest.title}</h2><div className="mt-4 h-2 rounded-full bg-zinc-800"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-red-500" style={{ width: `${Math.min(100, (quest.progress / quest.goal) * 100)}%` }} /></div><p className="mt-4 text-cyan-200 font-black">+{quest.reward} XP</p></div>)}</div></div></main>;
}

function LeaderboardPage({ users, currentUser }) {
  const bots = botNames.map((name, index) => normalizeUser({ username: name, nickname: name, role: "bot", elo: 2150 - index * 95, wins: 80 - index * 4, losses: 20 + index, matches: 100 + index * 3, xp: 1500 - index * 75 }));
  const leaders = [...users.map(normalizeUser), ...bots].sort((a, b) => b.elo - a.elo).slice(0, 20);
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-6xl mx-auto"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><Icon name="chart" size={48} className="text-cyan-400" /><h1 className="text-4xl font-black mt-4">Лидерборд</h1><p className="text-zinc-400 mt-2">Топ игроков по ELO. Твой аккаунт тоже попадает в таблицу.</p></section><section className={`${theme.panel} rounded-3xl border ${theme.border} p-4 sm:p-6 mt-6 overflow-x-auto`}><table className="w-full min-w-[720px] text-left"><thead className="text-cyan-200 bg-cyan-500/10"><tr><th className="p-4">#</th><th className="p-4">Игрок</th><th className="p-4">ELO</th><th className="p-4">Level</th><th className="p-4">Победы</th><th className="p-4">Матчи</th></tr></thead><tbody>{leaders.map((user, index) => <tr key={`${user.username}-${index}`} className={`border-t border-cyan-950/50 ${currentUser?.username === user.username ? "bg-cyan-500/10" : ""}`}><td className="p-4 font-black text-cyan-300">#{index + 1}</td><td className="p-4"><div className="flex items-center gap-3"><Avatar seed={user.nickname || user.username} /><b>{user.nickname || user.username}</b></div></td><td className="p-4 font-black">{user.elo}</td><td className="p-4">{user.level}</td><td className="p-4">{user.wins}</td><td className="p-4">{user.matches}</td></tr>)}</tbody></table></section></div></main>;
}

function SettingsPage({ language, setLanguage }) {
  const [filter, setFilter] = useState("");
  const filteredLanguages = languages.filter((lang) => lang.toLowerCase().includes(filter.toLowerCase()));
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-6xl mx-auto space-y-6"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><Icon name="settings" size={48} className="text-cyan-400" /><h1 className="text-4xl font-black mt-3">{t(language, "settings")}</h1><p className="text-zinc-400 mt-2">{t(language, "selectedLanguage")}: <b className="text-white">{language}</b></p></section><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8`}><h2 className="text-2xl font-black mb-5"><Icon name="theme" className="text-cyan-400" /> {t(language, "themes")}</h2><div className="rounded-2xl p-5 text-left border border-cyan-900/60 bg-gradient-to-br from-cyan-600/30 via-red-700/25 to-purple-700/25"><div className="h-16 rounded-xl mb-4 bg-gradient-to-r from-cyan-500 via-red-600 to-purple-700" /><b>Steel Wings Arena</b><p className="text-xs text-zinc-400 mt-1">{t(language, "activeTheme")}</p></div></section><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8`}><h2 className="text-2xl font-black mb-5"><Icon name="language" className="text-cyan-400" /> {t(language, "language")}</h2><input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder={t(language, "searchLanguage")} className="w-full bg-black/60 border border-cyan-950/60 rounded-xl p-4 mb-5 outline-none focus:border-cyan-500" /><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[420px] overflow-auto pr-2">{filteredLanguages.map((lang) => <ClickButton key={lang} onClick={() => setLanguage(lang)} className={`rounded-xl px-4 py-3 text-left border ${language === lang ? "bg-cyan-600 border-cyan-300" : "bg-black/50 border-cyan-950/50 hover:bg-cyan-950/30"}`}>{lang}</ClickButton>)}</div><p className="text-xs text-zinc-400 mt-4">Основные языки переводят интерфейс. Для остальных языков включён английский запасной вариант.</p></section></div></main>;
}

function GenericPage({ page, setPage, language }) {
  const title = t(language, page);
  const icon = routeIcons[page] || "play";
  const cardMap = { play: ["5v5 Ranked", "Premium Queue", "Custom Lobby", "Aim Training"], tournaments: ["5x5 Weekend Cup", "Dropnet Open League", "School Cyber Cup", "Create Team"], league: ["Bronze Division", "Silver Division", "Elite Division", "Top 100 Players"], stats: ["Winrate", "K/D", "HS", "Dust2"], friends: ["Добавить друга", "Онлайн: 3", "Заявки: 1", "Группы"], search: ["Найти игрока", "Найти команду", "Открытые лобби", "Фильтр по рангу"], inventory: ["AK-47 Redline", "AWP Graphite", "M4A1-S Nitro", "Dropnet Medal"], maps: ["Mirage", "Dust II", "Inferno", "Nuke", "Ancient", "Anubis"], servers: ["Germany 12ms", "Poland 22ms", "Sweden 31ms", "Netherlands 38ms"], anticheat: ["Статус: не запущен", "Версия: demo", "Проверить файлы", "Запустить клиент"] };
  const cards = cardMap[page] || ["Demo Card 1", "Demo Card 2", "Demo Card 3"];
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-12"><div className="max-w-6xl mx-auto"><div className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-10 ${theme.glow}`}><Icon name={icon} size={48} className="text-cyan-400 mb-5" /><h1 className="text-3xl lg:text-4xl font-black mb-3">{title}</h1><p className="text-zinc-400 max-w-2xl">Этот раздел полностью кликабельный и работает как демо-страница Dropnetgaming.</p><div className="flex flex-col sm:flex-row gap-3 mt-7"><ActionButton onClick={() => alert(`${title}: ${t(language, "demo")}`)}>{t(language, "mainAction")}</ActionButton><ActionButton dark onClick={() => goTo(setPage, "matchmaking")}>{t(language, "back")}</ActionButton></div></div><div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">{cards.map((card, index) => <ClickButton key={card} onClick={() => alert(`${t(language, "open")}: ${card}`)} className={`${theme.card} text-left rounded-3xl border border-cyan-950/60 p-6 font-bold hover:border-cyan-400 hover:bg-cyan-950/25 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.14)]`}><div className="text-cyan-400 mb-3"><Icon name={index % 2 ? "crosshair" : icon} size={26} /></div>{card}<p className="text-xs text-zinc-400 mt-3">{t(language, "demo")}</p></ClickButton>)}</div></div></main>;
}

export default function DropnetgamingApp() {
  const [page, setPage] = useState(getRouteFromHash);
  const [language, setLanguage] = useState("Русский");
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(loadSession);
  const [tickets, setTickets] = useState(() => readJson(STORAGE_TICKETS, []));
  const [news, setNews] = useState(() => readJson(STORAGE_NEWS, defaultNews));
  const [matches, setMatches] = useState(() => readJson(STORAGE_MATCHES, []));
  const [quests, setQuests] = useState(loadDailyQuests);
  const [notifications, setNotifications] = useState([]);
  const [searchState, setSearchState] = useState({ active: false, found: false, players: 0, message: "", match: null });

  useEffect(() => { const syncPageWithUrl = () => setPage(getRouteFromHash()); window.addEventListener("hashchange", syncPageWithUrl); if (!window.location.hash) window.history.replaceState(null, "", "#/matchmaking"); return () => window.removeEventListener("hashchange", syncPageWithUrl); }, []);
  useEffect(() => { writeJson(STORAGE_USERS, users); }, [users]);
  useEffect(() => { writeJson(STORAGE_NEWS, news); }, [news]);
  useEffect(() => { writeJson(STORAGE_MATCHES, matches); }, [matches]);
  useEffect(() => { writeJson(STORAGE_QUESTS, quests); }, [quests]);

  const updateCurrentUser = (updatedUser) => {
    const normalized = normalizeUser(updatedUser);
    setCurrentUser(normalized);
    saveSession(normalized);
    setUsers((prev) => prev.map((user) => user.username === normalized.username ? normalized : user));
  };

  const addNotification = (text) => setNotifications((prev) => [{ id: Date.now(), text }, ...prev].slice(0, 8));

  const markQuest = (type, amount) => {
    setQuests((prev) => {
      let rewardXp = 0;
      const nextQuests = prev.quests.map((quest) => {
        if (quest.type !== type || quest.completed) return quest;
        const progress = Math.min(quest.goal, quest.progress + amount);
        const completed = progress >= quest.goal;
        if (completed && !quest.completed) rewardXp += quest.reward;
        return { ...quest, progress, completed };
      });
      if (rewardXp > 0 && currentUser) {
        const updated = normalizeUser({ ...currentUser, xp: currentUser.xp + rewardXp });
        window.setTimeout(() => updateCurrentUser(updated), 0);
        addNotification(`Задание выполнено: +${rewardXp} XP`);
      }
      return { ...prev, quests: nextQuests };
    });
  };

  const finishMatch = () => {
    const map = maps[Math.floor(Math.random() * maps.length)];
    const win = Math.random() > 0.42;
    const eloChange = win ? 24 + Math.floor(Math.random() * 12) : -(14 + Math.floor(Math.random() * 10));
    const score = win ? `${13}-${7 + Math.floor(Math.random() * 5)}` : `${8 + Math.floor(Math.random() * 4)}-13`;
    const player = currentUser || normalizeUser({ username: "guest", nickname: "Гость", role: "user", elo: 1000, wins: 0, losses: 0, matches: 0, xp: 0 });
    const updated = normalizeUser({
      ...player,
      elo: Math.max(100, player.elo + eloChange),
      wins: player.wins + (win ? 1 : 0),
      losses: player.losses + (win ? 0 : 1),
      matches: player.matches + 1,
      xp: player.xp + (win ? 45 : 20),
    });
    const match = { id: Date.now(), map, server: "EU Germany", result: win ? "Win" : "Lose", score, eloChange, createdAt: new Date().toLocaleString("ru-RU") };
    setMatches((prev) => [match, ...prev].slice(0, 30));
    if (currentUser) updateCurrentUser(updated);
    markQuest("matches", 1);
    if (win) markQuest("wins", 1);
    if (eloChange > 0) markQuest("elo", eloChange);
    addNotification(`Матч завершён: ${match.result}, ${eloChange > 0 ? "+" : ""}${eloChange} ELO`);
    setSearchState({ active: false, found: true, players: 10, message: "Матч найден и завершён в демо-режиме", match });
  };

  const startMatchSearch = () => {
    if (!currentUser) { goTo(setPage, "login", "Сначала войди в аккаунт"); return; }
    setSearchState({ active: true, found: false, players: 1, message: "Подключаемся к очереди...", match: null });
    const steps = [
      [3, "Ищем игроков твоего уровня..."],
      [5, "Проверяем сервер и античит..."],
      [8, "Почти готово, собираем команды..."],
      [10, "Матч найден!"],
    ];
    steps.forEach(([players, message], index) => {
      window.setTimeout(() => setSearchState((prev) => ({ ...prev, players, message })), 850 * (index + 1));
    });
    window.setTimeout(finishMatch, 4300);
  };

  const onLogout = () => { setCurrentUser(null); saveSession(null); goTo(setPage, "matchmaking"); };

  const CurrentPage = useMemo(() => {
    if (page === "matchmaking") return () => <Matchmaking setPage={setPage} language={language} currentUser={currentUser} onStartMatch={startMatchSearch} quests={quests} matches={matches} />;
    if (page === "news") return () => <NewsPage setPage={setPage} news={news} markQuest={markQuest} />;
    if (page === "feedback") return () => <FeedbackPage currentUser={currentUser} tickets={tickets} setTickets={setTickets} markQuest={markQuest} />;
    if (page === "profile") return () => <ProfilePage setPage={setPage} language={language} currentUser={currentUser} matches={matches} tickets={tickets} />;
    if (page === "settings") return () => <SettingsPage language={language} setLanguage={setLanguage} />;
    if (page === "missions") return () => <MissionsPage quests={quests} />;
    if (page === "leaderboard") return () => <LeaderboardPage users={users} currentUser={currentUser} />;
    if (page === "login") return () => <AuthPage mode="login" setPage={setPage} language={language} users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />;
    if (page === "register") return () => <AuthPage mode="register" setPage={setPage} language={language} users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />;
    if (page === "admin") return () => <AdminPage currentUser={currentUser} users={users} setUsers={setUsers} tickets={tickets} setTickets={setTickets} news={news} setNews={setNews} setPage={setPage} />;
    return () => <GenericPage page={page} setPage={setPage} language={language} />;
  }, [page, language, currentUser, users, tickets, news, matches, quests]);

  const backgroundStyle = {
    background:
      "radial-gradient(circle at 12% 16%, rgba(255,255,255,0.10), transparent 24%), radial-gradient(circle at 78% 14%, rgba(148,163,184,0.12), transparent 28%), radial-gradient(circle at 68% 86%, rgba(255,255,255,0.07), transparent 32%), linear-gradient(135deg, #020202 0%, #080a0f 32%, #020617 68%, #000000 100%)",
  };

  return <div className="relative min-h-screen lg:h-screen overflow-auto lg:overflow-hidden font-sans" style={backgroundStyle}><div className="pointer-events-none absolute inset-0 opacity-35 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" /><div className="pointer-events-none absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" /><div className="pointer-events-none absolute right-[-100px] bottom-[-140px] h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl" /><MatchSearchModal searchState={searchState} onCancel={() => setSearchState({ active: false, found: false, players: 0, message: "", match: null })} /><div className="relative z-10 min-h-screen lg:h-full flex flex-col"><TopNav page={page} setPage={setPage} language={language} currentUser={currentUser} onLogout={onLogout} notifications={notifications} /><div className="flex-1 flex flex-col lg:flex-row bg-transparent overflow-visible lg:overflow-hidden"><LeftSidebar page={page} setPage={setPage} language={language} /><CurrentPage /><RightBar setPage={setPage} language={language} /></div></div></div>;
}
