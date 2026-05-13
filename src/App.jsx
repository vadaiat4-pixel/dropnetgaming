import React, { useEffect, useMemo, useState } from "react";

const STORAGE_USERS = "dropnetgaming_users_v3";
const STORAGE_SESSION = "dropnetgaming_session_v3";
const STORAGE_TICKETS = "dropnetgaming_tickets_v1";

const DEFAULT_ADMIN = {
  username: "skwizzy22",
  password: "123456",
  nickname: "skwizzy22",
  email: "admin@dropnetgaming.local",
  role: "admin"
};

const languages = [
  "Русский", "English", "Deutsch", "Français", "Español", "Italiano", "Português", "Polski", "Українська", "中文",
  "日本語", "한국어", "العربية", "हिन्दी", "Türkçe", "Nederlands", "Svenska", "Norsk", "Suomi", "Dansk",
  "Čeština", "Română", "Magyar", "Ελληνικά", "Tiếng Việt", "Bahasa Indonesia", "Kiswahili", "Afrikaans", "Esperanto", "Latin"
];

const ru = {
  matchmaking: "Матчмейкинг",
  play: "Играть",
  tournaments: "Турниры",
  league: "Лига",
  search: "Поиск",
  profile: "Профиль",
  stats: "Статистика",
  friends: "Друзья",
  inventory: "Инвентарь",
  missions: "Лента",
  maps: "Карты",
  servers: "Серверы",
  anticheat: "Античит",
  settings: "Настройки",
  clubs: "Клубы",
  createClub: "Создать клуб",
  admin: "Админка",
  news: "Новости",
  feedback: "Обратная связь",
  login: "Войти",
  register: "Регистрация",
  logout: "Выйти",
  rank: "Ранг",
  track: "Track",
  partyFinder: "Party Finder",
  findMatch: "НАЙТИ МАТЧ",
  selectedLanguage: "Выбран язык",
  language: "Язык",
  themes: "Тема",
  searchLanguage: "Поиск языка...",
  activeTheme: "Активная тема",
  rankless: "Без ранга",
  season: "Сезон 8",
  nineMatches: "9 матчей осталось до получения Skill Level",
  verified: "Верификация пройдена",
  invite: "Пригласить",
  partySearch: "Поиск группы",
  matchType: "Тип матча",
  wins: "Получить 20 побед",
  themeLanguage: "Тема и язык",
  premium: "Premium подбор • Античит • Карты CS2",
  mainAction: "Основное действие",
  back: "Назад",
  open: "Открыто",
  demo: "Демо-действие работает",
  playerProfile: "Профиль игрока",
  latestMatches: "Последние матчи",
  details: "Подробнее",
  friendRequest: "Заявка в друзья отправлена",
  siteNote: "DROP NET GAMING • CS2 Update",
  pageDescription: "Этот раздел полностью кликабельный и работает как демо-страница Dropnetgaming.",
  languageNote: "Основные языки переводят интерфейс. Для остальных языков включён английский запасной вариант, чтобы сайт не ломался."
};

const en = {
  ...ru,
  matchmaking: "Matchmaking",
  play: "Play",
  tournaments: "Tournaments",
  league: "League",
  search: "Search",
  profile: "Profile",
  stats: "Stats",
  friends: "Friends",
  inventory: "Inventory",
  missions: "Feed",
  maps: "Maps",
  servers: "Servers",
  anticheat: "Anticheat",
  settings: "Settings",
  clubs: "Clubs",
  createClub: "Create Club",
  admin: "Admin Panel",
  news: "News",
  feedback: "Feedback",
  login: "Login",
  register: "Register",
  logout: "Logout",
  rank: "Rank",
  rankless: "Unranked",
  findMatch: "FIND MATCH",
  language: "Language",
  themes: "Theme",
  selectedLanguage: "Selected language",
  activeTheme: "Active theme"
};

const translations = {
  "Русский": ru,
  English: en,
  Deutsch: { ...en, play: "Spielen", search: "Suche", profile: "Profil", settings: "Einstellungen", news: "Nachrichten", feedback: "Kontakt" },
  Français: { ...en, play: "Jouer", search: "Recherche", profile: "Profil", settings: "Paramètres", news: "Actualités", feedback: "Contact" },
  Español: { ...en, play: "Jugar", search: "Buscar", profile: "Perfil", settings: "Configuración", news: "Noticias", feedback: "Contacto" },
  Українська: { ...ru, play: "Грати", profile: "Профіль", settings: "Налаштування", news: "Новини", feedback: "Зворотний зв'язок" }
};

function t(language, key) {
  const dict = translations[language] || en;
  return dict[key] || en[key] || ru[key] || key;
}

const theme = {
  button: "bg-gradient-to-r from-[#ff6a00] via-[#ef233c] to-[#8b5cf6] hover:from-[#ff8a1d] hover:via-[#ff2d55] hover:to-[#a855f7]",
  border: "border-orange-500/25",
  activeBorder: "border-orange-300",
  panel: "bg-[#080403]/72 backdrop-blur-xl",
  card: "bg-[#110706]/78 backdrop-blur-xl",
  glow: "shadow-[0_0_42px_rgba(255,90,20,0.20)]"
};

const routeIcons = {
  matchmaking: "home",
  play: "play",
  tournaments: "trophy",
  league: "chart",
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
  news: "news",
  feedback: "message",
  login: "login",
  register: "plus",
  admin: "admin"
};

const routes = Object.keys(routeIcons);

function runTests() {
  console.assert(languages.includes("Русский"), "Russian language exists");
  console.assert(t("English", "findMatch") === "FIND MATCH", "English translation works");
  console.assert(t("Русский", "themes") === "Тема", "Russian translation works");
  console.assert(routes.includes("admin") && routes.includes("news") && routes.includes("feedback"), "New routes exist");
  console.assert(routeIcons.news === "news", "News icon exists");
  console.assert(t("Unknown", "unknownKey") === "unknownKey", "Unknown key fallback works");
}
runTests();

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadUsers() {
  const users = readJson(STORAGE_USERS, []);
  const cleanedUsers = users.filter((user) => user.username !== "admin" && user.username !== DEFAULT_ADMIN.username);
  return [DEFAULT_ADMIN, ...cleanedUsers];
}

function loadSession() {
  return readJson(STORAGE_SESSION, null);
}

function saveSession(user) {
  if (user) writeJson(STORAGE_SESSION, user);
  else localStorage.removeItem(STORAGE_SESSION);
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
    swords: <><path {...p} d="M6 4l14 14" /><path {...p} d="M18 4 4 18" /></>
  };
  return <span className={`inline-flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}><svg viewBox="0 0 24 24" width={size} height={size}>{icons[name] || <circle cx="12" cy="12" r="4" fill="currentColor" />}</svg></span>;
}

function IconBox({ name, active = false }) {
  return <span className={`h-9 w-9 shrink-0 rounded-2xl flex items-center justify-center border transition-all duration-200 ${active ? "bg-gradient-to-br from-orange-500 via-red-500 to-fuchsia-600 border-orange-300/70 text-white shadow-[0_0_22px_rgba(249,115,22,0.35)]" : "bg-white/[0.04] border-white/10 text-zinc-300 group-hover:text-orange-200 group-hover:border-orange-300/40 group-hover:bg-orange-500/10"}`}><Icon name={name} size={20} /></span>;
}

function AnimeLogo() {
  return (
    <div className="relative h-24 w-24 lg:h-36 lg:w-36 rounded-full overflow-hidden bg-black border-2 border-orange-400 shadow-[0_0_34px_rgba(249,115,22,0.35)]">
      <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Dropnetgaming logo">
        <defs>
          <radialGradient id="dropnetBg" cx="50%" cy="42%" r="70%"><stop offset="0%" stopColor="#2a1008" /><stop offset="55%" stopColor="#090909" /><stop offset="100%" stopColor="#000" /></radialGradient>
          <linearGradient id="dropnetOrange" x1="40" y1="25" x2="185" y2="190"><stop offset="0%" stopColor="#ffb86b" /><stop offset="45%" stopColor="#f97316" /><stop offset="100%" stopColor="#dc2626" /></linearGradient>
          <linearGradient id="dropnetWhite" x1="70" y1="70" x2="160" y2="145"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#fed7aa" /></linearGradient>
        </defs>
        <circle cx="110" cy="110" r="108" fill="#020202" />
        <circle cx="110" cy="110" r="99" fill="url(#dropnetBg)" stroke="url(#dropnetOrange)" strokeWidth="6" />
        <circle cx="110" cy="110" r="78" fill="none" stroke="#fb923c" strokeWidth="2" opacity="0.35" />
        <path d="M110 27 L173 57 L160 154 L110 193 L60 154 L47 57 Z" fill="#090909" stroke="url(#dropnetOrange)" strokeWidth="5" />
        <path d="M110 44 L156 66 L147 145 L110 174 L73 145 L64 66 Z" fill="#15100e" stroke="#fff7ed" strokeWidth="1.5" opacity="0.7" />
        <circle cx="110" cy="110" r="28" fill="none" stroke="#fb923c" strokeWidth="2.5" opacity="0.7" />
        <path d="M61 110 H159M110 63V160" stroke="#fb923c" strokeWidth="2.5" opacity="0.48" />
        <text x="110" y="116" textAnchor="middle" dominantBaseline="middle" fontSize="45" fontWeight="900" fontFamily="Arial Black, Arial" fill="url(#dropnetWhite)" letterSpacing="-2">DNG</text>
        <text x="110" y="144" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="Arial" fill="#fb923c" letterSpacing="4">CS2</text>
      </svg>
    </div>
  );
}

function Avatar({ seed = "dn", size = "h-10 w-10" }) {
  return <div className={`${size} rounded-full bg-zinc-950 border border-orange-900/60 flex items-center justify-center text-xs font-black text-white`}>{seed.slice(0, 2).toUpperCase()}</div>;
}

function ClickButton({ children, onClick, className = "", title }) {
  return <button type="button" title={title} onClick={(event) => { event.preventDefault(); event.stopPropagation(); if (onClick) onClick(); }} className={`relative overflow-hidden cursor-pointer select-none transition-all duration-200 ease-out active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`} style={{ pointerEvents: "auto" }}>{children}</button>;
}

function ActionButton({ children, onClick, dark = false }) {
  const cls = dark ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-orange-300/50 text-white" : `${theme.button} border-orange-300/40 text-white shadow-[0_0_28px_rgba(249,115,22,0.28)] hover:shadow-[0_0_40px_rgba(249,115,22,0.42)]`;
  return <ClickButton onClick={onClick} className={`${cls} px-5 py-3 rounded-2xl font-black border backdrop-blur-md tracking-wide`}><span className="relative z-10">{children}</span></ClickButton>;
}

function TextInput({ label, value, onChange, type = "text", placeholder }) {
  return <label className="block"><span className="text-sm text-zinc-300 font-semibold">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} type={type} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-orange-950/60 bg-black/55 px-4 py-3 text-white outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20" /></label>;
}

function TopNav({ page, setPage, language, currentUser, onLogout }) {
  const topLinks = ["matchmaking", "play", "tournaments", "league", "news"];
  return (
    <div className={`min-h-[60px] bg-black/65 backdrop-blur-md border-b ${theme.border} flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6 py-3 lg:py-0 ${theme.glow}`}>
      <ClickButton onClick={() => goTo(setPage, "matchmaking")} className="flex items-center gap-3"><div className="text-white font-black text-2xl">DNG</div><div className="bg-gradient-to-br from-orange-500 via-red-500 to-fuchsia-600 text-white rounded-2xl h-11 w-11 flex items-center justify-center text-xs font-black border border-orange-300/50 shadow-[0_0_24px_rgba(249,115,22,0.34)]">CS2</div><span className="text-white font-semibold">EU</span></ClickButton>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 text-xs font-black uppercase tracking-wide">{topLinks.map((key) => <ClickButton key={key} onClick={() => goTo(setPage, key)} className={`h-10 px-4 rounded-full border shrink-0 ${page === key ? "bg-gradient-to-r from-orange-500/25 to-red-500/20 text-white border-orange-400/60 shadow-[0_0_22px_rgba(249,115,22,0.18)]" : "bg-white/[0.03] text-zinc-300 border-white/5 hover:bg-white/[0.08] hover:text-white hover:border-orange-300/30"}`}>{t(language, key)}</ClickButton>)}</div>
      <div className="flex items-center gap-2 text-zinc-300">{currentUser ? <><ClickButton onClick={() => goTo(setPage, "profile")}><Avatar seed={currentUser.nickname || currentUser.username} /></ClickButton><ClickButton onClick={onLogout} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-white text-xs font-bold">{t(language, "logout")}</ClickButton></> : <><ClickButton onClick={() => goTo(setPage, "login")} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-orange-500/15 hover:text-white text-xs font-bold">{t(language, "login")}</ClickButton><ClickButton onClick={() => goTo(setPage, "register")} className="px-3 py-2 rounded-xl bg-orange-500/20 border border-orange-300/30 hover:bg-orange-500/30 hover:text-white text-xs font-bold">{t(language, "register")}</ClickButton></>}</div>
    </div>
  );
}

function LeftSidebar({ page, setPage, language }) {
  const mainItems = [
    { key: "search", icon: "search", label: t(language, "search") },
    { key: "friends", icon: "users", label: t(language, "partyFinder") },
    { key: "play", icon: "play", label: t(language, "play") },
    { key: "news", icon: "news", label: t(language, "news") },
    { key: "league", icon: "stats", label: t(language, "rank") },
    { key: "stats", icon: "chart", label: t(language, "track") },
    { key: "feedback", icon: "message", label: t(language, "feedback") }
  ];
  const clubItems = [{ key: "tournaments", icon: "users", label: t(language, "clubs") }, { key: "inventory", icon: "trophy", label: "SKINBRO | CS2" }, { key: "profile", icon: "plus", label: t(language, "createClub") }];
  const itemClass = (key) => `h-12 rounded-2xl flex items-center gap-3 px-4 text-left border backdrop-blur-md shrink-0 lg:w-full ${page === key ? "bg-gradient-to-r from-orange-500/22 via-red-500/12 to-transparent text-white border-orange-400/50 shadow-[0_0_24px_rgba(249,115,22,0.16)]" : "bg-white/[0.025] text-zinc-300 border-white/5 hover:bg-white/[0.07] hover:text-white hover:border-orange-300/30 lg:hover:translate-x-1"}`;
  return <aside className={`w-full lg:w-60 bg-black/60 backdrop-blur-md border-b lg:border-b-0 lg:border-r ${theme.border} flex lg:flex-col py-3 lg:py-6 px-3 lg:px-4 gap-2 overflow-x-auto lg:overflow-visible ${theme.glow}`}><div className="hidden lg:flex justify-center mb-6"><ClickButton onClick={() => goTo(setPage, "matchmaking")}><AnimeLogo /></ClickButton></div>{mainItems.map((item) => <ClickButton key={item.key} title={item.label} onClick={() => goTo(setPage, item.key)} className={`${itemClass(item.key)} group`}><IconBox name={item.icon} active={page === item.key} /><span className="text-sm lg:text-base font-semibold tracking-wide whitespace-nowrap">{item.label}</span></ClickButton>)}<div className="hidden lg:block h-px bg-orange-950/50 my-6" />{clubItems.map((item) => <ClickButton key={item.key} title={item.label} onClick={() => goTo(setPage, item.key)} className={`${itemClass(item.key)} group`}><IconBox name={item.icon} active={page === item.key} /><span className="text-sm lg:text-base font-semibold tracking-wide whitespace-nowrap">{item.label}</span></ClickButton>)}</aside>;
}

function RightBar({ setPage, language }) {
  const buttons = ["profile", "friends", "inventory", "missions", "anticheat", "settings"];
  return <aside className={`hidden lg:flex w-16 bg-black/60 backdrop-blur-md border-l ${theme.border} flex-col items-center py-4 gap-5 text-zinc-300 ${theme.glow}`}><ClickButton onClick={() => goTo(setPage, "profile")}><Avatar seed="dn" size="h-11 w-11" /></ClickButton>{buttons.map((key) => <ClickButton key={key} onClick={() => goTo(setPage, key)} className="hover:text-orange-400" title={t(language, key)}><Icon name={routeIcons[key]} /></ClickButton>)}</aside>;
}

const newsItems = [
  { tag: "CS2", title: "CS2: крупное обновление Source 2", text: "Разработчики улучшают производительность, стрельбу, сетевые элементы и стабильность матчей.", hot: true },
  { tag: "CS2", title: "Retakes и обновлённые режимы", text: "В новостной ленте Dropnetgaming можно следить за режимами, картами и соревновательными изменениями." },
  { tag: "Dota 2", title: "Киберспортивный сезон набирает обороты", text: "Команды готовятся к новым турнирам, а игроки обсуждают баланс и мету." },
  { tag: "Valorant", title: "Новые агенты и карты в центре внимания", text: "Тактические шутеры продолжают развивать соревновательный формат." },
  { tag: "Gaming", title: "Игровая индустрия активно использует AI", text: "Студии применяют AI-инструменты для ускорения анимации, тестирования и разработки." },
  { tag: "Dropnet", title: "Запуск новостей на платформе", text: "Теперь на сайте есть отдельная страница с новостями CS2 и других игр." }
];

function NewsPage({ setPage }) {
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-7xl mx-auto"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"><div><p className="text-orange-300 font-black uppercase tracking-[0.3em] text-xs">Dropnetgaming feed</p><h1 className="text-3xl sm:text-5xl font-black mt-3">Новости CS2 и игр</h1><p className="text-zinc-400 mt-3 max-w-2xl">Лента новостей для проекта: CS2, киберспорт, обновления, турниры и игровые события.</p></div><ActionButton onClick={() => goTo(setPage, "feedback")}>Предложить новость</ActionButton></div></section><div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">{newsItems.map((item) => <article key={item.title} className={`${theme.card} rounded-3xl border border-orange-950/60 p-6 hover:-translate-y-1 hover:border-orange-400 transition-all`}><div className="flex items-center justify-between"><span className="rounded-full bg-orange-500/15 border border-orange-300/30 px-3 py-1 text-xs font-black text-orange-200">{item.tag}</span>{item.hot && <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-black text-red-200">HOT</span>}</div><h2 className="text-xl font-black mt-5">{item.title}</h2><p className="text-zinc-400 mt-3 leading-relaxed">{item.text}</p><button onClick={() => alert(`Открыта новость: ${item.title}`)} className="mt-5 text-orange-300 font-black hover:text-orange-100">Читать подробнее →</button></article>)}</div></div></main>;
}

function SiteFooter({ currentUser, setPage }) {
  return <footer className="mt-10 border-t border-orange-500/20 bg-[#151515]/90 text-white"><div className="grid gap-6 md:grid-cols-3 px-5 lg:px-16 py-8 text-sm"><div><h3 className="font-black mb-3">Dropnetgaming</h3><p className="text-zinc-400 leading-relaxed">Игровая платформа для CS2: матчи, профиль, новости, админка и обратная связь.</p></div><div className="text-center space-y-3"><button onClick={() => goTo(setPage, "feedback")} className="rounded-xl border border-white/60 px-5 py-3 font-black hover:bg-white/10">🌐 Служба поддержки сайта</button><p>Вы зашли под именем <b>{currentUser ? currentUser.nickname || currentUser.username : "Гость"}</b></p><p className="hover:text-orange-300 cursor-pointer">Сводка хранения данных</p><p className="hover:text-orange-300 cursor-pointer">Скачать мобильное приложение</p><p className="hover:text-orange-300 cursor-pointer">Начать тур для пользователя на этой странице</p></div><div className="md:text-right"><h3 className="font-black mb-3">Скачать мобильное приложение</h3><div className="flex flex-col md:items-end gap-3"><button className="w-44 rounded-lg border border-white/60 bg-black px-4 py-2 text-left hover:bg-white/10"><span className="text-xs">GET IT ON</span><br /><b>Google Play</b></button><button className="w-44 rounded-lg border border-white/60 bg-black px-4 py-2 text-left hover:bg-white/10"><span className="text-xs">Download on the</span><br /><b>App Store</b></button></div></div></div><div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 py-4 text-center font-semibold">Тема оформления сайта разработана <div className="text-2xl font-black tracking-wide">dropnetgaming</div><button onClick={() => goTo(setPage, "feedback")} className="absolute right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/75 text-black font-black">?</button></div></footer>;
}

function FeedbackPage({ currentUser, tickets, setTickets }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const submit = () => {
    if (!subject.trim() || !message.trim()) { setStatus("Заполни тему и текст обращения"); return; }
    const ticket = { id: Date.now(), subject: subject.trim(), message: message.trim(), author: currentUser?.nickname || currentUser?.username || "Гость", createdAt: new Date().toLocaleString("ru-RU"), status: "Новое" };
    const next = [ticket, ...tickets];
    setTickets(next);
    writeJson(STORAGE_TICKETS, next);
    setSubject("");
    setMessage("");
    setStatus("Обращение отправлено администраторам");
  };
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="mx-auto max-w-4xl"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><Icon name="message" size={48} className="text-orange-400" /><h1 className="text-3xl sm:text-5xl font-black mt-4">Обратная связь с админами</h1><p className="text-zinc-400 mt-3">Напиши проблему, предложение или жалобу. Обращение попадёт в админ-панель.</p><div className="mt-7 space-y-4"><TextInput label="Тема обращения" value={subject} onChange={setSubject} placeholder="Например: не работает поиск матча" /><label className="block"><span className="text-sm text-zinc-300 font-semibold">Текст обращения</span><textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={7} placeholder="Опиши проблему подробно..." className="mt-2 w-full rounded-2xl border border-orange-950/60 bg-black/55 px-4 py-3 text-white outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20" /></label>{status && <div className="rounded-xl border border-orange-400/30 bg-orange-500/10 p-3 text-orange-100">{status}</div>}<ActionButton onClick={submit}>Отправить обращение</ActionButton></div></section></div></main>;
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
      const newUser = { username: login, password, nickname: nickname.trim() || login, email: email.trim(), role: "user" };
      const nextUsers = [...users, newUser];
      setUsers(nextUsers); writeJson(STORAGE_USERS, nextUsers); setCurrentUser(newUser); saveSession(newUser); goTo(setPage, "profile"); return;
    }
    const found = users.find((user) => user.username === login && user.password === password);
    if (!found) { setError("Неверный логин или пароль"); return; }
    setCurrentUser(found); saveSession(found); goTo(setPage, found.role === "admin" ? "admin" : "profile");
  };
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="mx-auto max-w-xl rounded-3xl border border-orange-500/25 bg-black/60 p-6 lg:p-8 shadow-[0_0_42px_rgba(255,90,20,0.20)] backdrop-blur-xl"><Icon name={isRegister ? "plus" : "login"} size={46} className="text-orange-400" /><h1 className="mt-4 text-3xl lg:text-4xl font-black">{isRegister ? t(language, "register") : t(language, "login")}</h1><p className="mt-2 text-zinc-400">{isRegister ? "Создай аккаунт Dropnetgaming. Данные сохраняются в браузере." : "Войди в аккаунт. Админ: admin / admin123"}</p><div className="mt-7 space-y-4"><TextInput label="Логин" value={username} onChange={setUsername} placeholder="username" />{isRegister && <TextInput label="Никнейм" value={nickname} onChange={setNickname} placeholder="skwizzy22" />}{isRegister && <TextInput label="Email" value={email} onChange={setEmail} placeholder="mail@example.com" />}<TextInput label="Пароль" value={password} onChange={setPassword} type="password" placeholder="password" />{error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-red-200">{error}</div>}<div className="flex flex-col sm:flex-row gap-3"><ActionButton onClick={submit}>{isRegister ? "Зарегистрироваться" : "Войти"}</ActionButton><ActionButton dark onClick={() => goTo(setPage, isRegister ? "login" : "register")}>{isRegister ? "Уже есть аккаунт" : "Создать аккаунт"}</ActionButton></div></div></div></main>;
}

function AdminPage({ currentUser, users, setUsers, tickets, setTickets, setPage }) {
  const [notice, setNotice] = useState("");
  if (!currentUser || currentUser.role !== "admin") return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="mx-auto max-w-2xl rounded-3xl border border-orange-500/25 bg-black/60 p-8 backdrop-blur-xl"><Icon name="admin" size={48} className="text-orange-400" /><h1 className="mt-4 text-4xl font-black">Админ-панель</h1><p className="mt-3 text-zinc-400">Доступ только для администратора. Войди под логином <b className="text-white">admin</b> и паролем <b className="text-white">admin123</b>.</p><div className="mt-6"><ActionButton onClick={() => goTo(setPage, "login")}>Войти как админ</ActionButton></div></div></main>;
  const deleteTicket = (id) => { const next = tickets.filter((ticket) => ticket.id !== id); setTickets(next); writeJson(STORAGE_TICKETS, next); setNotice("Обращение удалено"); };
  const makeAdmin = (username) => { const next = users.map((user) => user.username === username ? { ...user, role: "admin" } : user); setUsers(next); writeJson(STORAGE_USERS, next); setNotice(`${username} теперь администратор`); };
  const deleteUser = (username) => { if (username === DEFAULT_ADMIN.username) { setNotice("Главного админа удалить нельзя"); return; } const next = users.filter((user) => user.username !== username); setUsers(next); writeJson(STORAGE_USERS, next); setNotice(`${username} удалён`); };
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-7xl mx-auto space-y-6"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><Icon name="admin" size={50} className="text-orange-400" /><h1 className="mt-3 text-3xl lg:text-4xl font-black">Админ-панель Dropnetgaming</h1><p className="mt-2 text-zinc-400">Пользователи, роли и обращения из формы обратной связи.</p>{notice && <div className="mt-4 rounded-xl border border-orange-400/30 bg-orange-500/10 p-3 text-orange-100">{notice}</div>}</section><section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{[[users.length, "Пользователей"], [users.filter((u) => u.role === "admin").length, "Админов"], [tickets.length, "Обращений"], [newsItems.length, "Новостей"]].map(([value, label]) => <div key={label} className={`${theme.card} rounded-3xl border border-orange-950/60 p-6`}><div className="text-3xl font-black text-orange-300">{value}</div><div className="text-sm text-zinc-400">{label}</div></div>)}</section><section className={`${theme.panel} rounded-3xl border ${theme.border} p-6`}><h2 className="text-2xl font-black mb-4">Обращения</h2><div className="grid gap-3">{tickets.length === 0 && <p className="text-zinc-400">Пока обращений нет.</p>}{tickets.map((ticket) => <div key={ticket.id} className="rounded-2xl border border-orange-950/60 bg-black/35 p-4"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"><b>{ticket.subject}</b><button onClick={() => deleteTicket(ticket.id)} className="rounded-xl border border-red-400/30 px-3 py-2 hover:bg-red-500/20">Удалить</button></div><p className="mt-2 text-zinc-300">{ticket.message}</p><p className="mt-3 text-xs text-zinc-500">{ticket.author} • {ticket.createdAt} • {ticket.status}</p></div>)}</div></section><section className={`${theme.panel} rounded-3xl border ${theme.border} p-6 overflow-x-auto`}><h2 className="text-2xl font-black mb-4">Аккаунты</h2><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-orange-500/10 text-orange-200"><tr><th className="p-4">Логин</th><th className="p-4">Ник</th><th className="p-4">Email</th><th className="p-4">Роль</th><th className="p-4">Действия</th></tr></thead><tbody>{users.map((user) => <tr key={user.username} className="border-t border-orange-950/40"><td className="p-4 font-bold">{user.username}</td><td className="p-4">{user.nickname || user.username}</td><td className="p-4 text-zinc-400">{user.email || "—"}</td><td className="p-4"><span className={`rounded-full px-3 py-1 text-xs font-black ${user.role === "admin" ? "bg-orange-500/20 text-orange-200" : "bg-white/10 text-zinc-300"}`}>{user.role}</span></td><td className="p-4 flex gap-2"><button onClick={() => makeAdmin(user.username)} className="rounded-xl border border-orange-400/30 px-3 py-2 hover:bg-orange-500/20">Админ</button><button onClick={() => deleteUser(user.username)} className="rounded-xl border border-red-400/30 px-3 py-2 hover:bg-red-500/20">Удалить</button></td></tr>)}</tbody></table></section></div></main>;
}

function ProfilePage({ setPage, language, currentUser }) {
  const profile = currentUser || { username: "guest", nickname: "Гость", role: "guest" };
  const badges = ["Steam подключён", "Верификация пройдена", "Античит готов", "EU сервер"];
  const matches = ["Mirage • Win • 16:12", "Dust II • Lose • 11:13", "Inferno • Win • 13:9", "Nuke • Win • 13:7"];
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-7xl mx-auto grid lg:grid-cols-[360px_1fr] gap-6"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-7 ${theme.glow}`}><div className="flex flex-col items-center text-center"><Avatar seed={profile.nickname || profile.username} size="h-32 w-32" /><h1 className="text-3xl font-black mt-5">{profile.nickname || profile.username}</h1><p className="text-zinc-400">@{profile.username} • {profile.role}</p><div className="mt-4 px-4 py-2 rounded-full bg-orange-950/30 border border-orange-800/50 text-orange-300 font-black">Level 1 • {t(language, "rankless")}</div></div><div className="grid grid-cols-2 gap-3 mt-7 text-center">{[["57%", "Winrate"], ["1.21", "K/D"], ["42%", "HS"], ["0", "ELO"]].map(([value, label]) => <div key={label} className={`${theme.card} rounded-2xl p-4 border border-orange-950/50`}><b>{value}</b><p className="text-xs text-zinc-400">{label}</p></div>)}</div><div className="flex gap-3 mt-6"><ActionButton onClick={() => alert(t(language, "friendRequest"))}>{t(language, "friends")}</ActionButton><ActionButton dark onClick={() => goTo(setPage, "settings")}>{t(language, "settings")}</ActionButton></div></section><section className="space-y-6"><div className={`rounded-3xl ${theme.panel} border ${theme.border} p-7`}><h2 className="text-2xl font-black mb-4">{t(language, "playerProfile")}</h2><p className="text-zinc-400">Здесь можно смотреть аккаунт, статистику, последние матчи, достижения, инвентарь и информацию о CS2 профиле.</p><div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">{badges.map((badge) => <ClickButton key={badge} onClick={() => alert(badge)} className={`${theme.card} hover:bg-orange-950/30 rounded-2xl p-4 text-left font-bold border border-orange-950/50`}><Icon name="shield" className="text-orange-400" /><div className="mt-2">{badge}</div></ClickButton>)}</div></div><div className={`rounded-3xl ${theme.panel} border ${theme.border} p-7`}><h2 className="text-2xl font-black mb-4">{t(language, "latestMatches")}</h2>{matches.map((match) => <ClickButton key={match} onClick={() => alert(`${t(language, "open")}: ${match}`)} className={`${theme.card} w-full flex justify-between hover:bg-orange-950/30 rounded-xl p-4 mb-3 text-left border border-orange-950/50`}><span>{match}</span><span className="text-orange-400">{t(language, "details")}</span></ClickButton>)}</div></section></div></main>;
}

function SettingsPage({ language, setLanguage }) {
  const [filter, setFilter] = useState("");
  const filteredLanguages = languages.filter((lang) => lang.toLowerCase().includes(filter.toLowerCase()));
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10"><div className="max-w-6xl mx-auto space-y-6"><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8 ${theme.glow}`}><Icon name="settings" size={48} className="text-orange-400" /><h1 className="text-4xl font-black mt-3">{t(language, "settings")}</h1><p className="text-zinc-400 mt-2">{t(language, "selectedLanguage")}: <b className="text-white">{language}</b></p></section><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8`}><h2 className="text-2xl font-black mb-5"><Icon name="theme" className="text-orange-400" /> {t(language, "themes")}</h2><div className="rounded-2xl p-5 text-left border border-orange-900/60 bg-gradient-to-br from-orange-600/30 via-red-700/25 to-purple-700/25"><div className="h-16 rounded-xl mb-4 bg-gradient-to-r from-orange-500 via-red-600 to-purple-700" /><b>Inferno Cyber Arena</b><p className="text-xs text-zinc-400 mt-1">{t(language, "activeTheme")}</p></div></section><section className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-8`}><h2 className="text-2xl font-black mb-5"><Icon name="language" className="text-orange-400" /> {t(language, "language")}</h2><input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder={t(language, "searchLanguage")} className="w-full bg-black/60 border border-orange-950/60 rounded-xl p-4 mb-5 outline-none focus:border-orange-500" /><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[420px] overflow-auto pr-2">{filteredLanguages.map((lang) => <ClickButton key={lang} onClick={() => setLanguage(lang)} className={`rounded-xl px-4 py-3 text-left border ${language === lang ? "bg-orange-600 border-orange-300" : "bg-black/50 border-orange-950/50 hover:bg-orange-950/30"}`}>{lang}</ClickButton>)}</div><p className="text-xs text-zinc-400 mt-4">{t(language, "languageNote")}</p></section></div></main>;
}

function Matchmaking({ setPage, language, currentUser }) {
  const partySlots = [0, 1, 2, 3];
  const matchTypes = language === "Русский" ? ["Стандартный матч", "Суперматч", "Premium Match"] : ["Standard Match", "Super Match", "Premium Match"];
  return <main className="flex-1 overflow-auto bg-transparent text-white"><div className="bg-gradient-to-r from-[#ff6a00] via-[#ef233c] to-[#7c3aed] text-white font-black text-center py-3 border-b border-orange-300/30 shadow-[0_0_34px_rgba(255,90,20,0.28)] tracking-wide">{t(language, "siteNote")} • INFERNO CYBER ARENA</div><section className="relative min-h-[520px] px-4 sm:px-6 lg:px-28 py-10 lg:py-16 bg-[radial-gradient(circle_at_50%_45%,rgba(255,106,0,0.18),transparent_42%),radial-gradient(circle_at_75%_20%,rgba(239,35,60,0.15),transparent_36%),linear-gradient(90deg,rgba(0,0,0,0.70),rgba(26,7,2,0.55),rgba(10,0,18,0.72))]"><div className="lg:absolute lg:top-5 lg:left-1/2 lg:-translate-x-1/2 bg-black/70 text-white px-4 py-1 rounded-full text-sm font-black border border-orange-900/60 inline-block">Europe CS2 5v5 Queue</div><div className="mt-6 lg:mt-0 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8"><div className="flex flex-col sm:flex-row sm:items-center gap-8"><ClickButton onClick={() => goTo(setPage, "profile")} className="h-28 w-28 rounded-full border-[12px] border-zinc-900 hover:border-orange-500 flex items-center justify-center text-5xl text-zinc-400 font-black">?</ClickButton><div><ClickButton onClick={() => goTo(setPage, "league")} className="text-sm bg-black/70 hover:bg-orange-950/40 inline-block px-3 py-1 rounded-full mb-3 border border-orange-950/60">{t(language, "season")}</ClickButton><h1 className="text-4xl font-black">{t(language, "rankless")}</h1><div className="h-1 max-w-[520px] w-full bg-zinc-800 mt-4 rounded"><div className="h-1 w-16 bg-gradient-to-r from-orange-400 to-red-500 rounded" /></div><p className="text-xs text-zinc-400 mt-2">{t(language, "nineMatches")}</p><ClickButton onClick={() => goTo(setPage, "profile")} className="mt-7 flex gap-3 items-center hover:text-orange-300"><b>{currentUser ? currentUser.nickname || currentUser.username : "team_skwizzy22"}</b><span className="bg-black/70 px-3 py-2 rounded-full text-sm font-bold border border-orange-950/60"><Icon name="shield" size={16} className="inline mr-1" />{t(language, "verified")}</span></ClickButton></div></div><div className="grid gap-3 w-full xl:w-[640px]"><ClickButton onClick={() => goTo(setPage, "missions")} className={`${theme.panel} border ${theme.border} hover:border-orange-400 rounded-xl p-4 flex items-center justify-between text-left`}><div><p className="text-xs tracking-[.25em] text-zinc-400 uppercase">Season Prestige Path</p><h3 className="font-black mt-1">{t(language, "wins")}</h3><div className="h-2 w-72 max-w-full bg-zinc-800 mt-3 rounded"><div className="h-2 w-16 bg-gradient-to-r from-orange-400 to-red-500 rounded" /></div></div><b>0 / 20</b><Icon name="trophy" size={24} className="text-orange-400" /></ClickButton><ClickButton onClick={() => goTo(setPage, "settings")} className={`${theme.panel} border ${theme.border} hover:border-orange-400 rounded-xl p-4 flex items-center justify-between text-left`}><div><h3 className="font-black">{t(language, "themeLanguage")}</h3><p className="text-orange-400 mt-2 font-bold">{t(language, "settings")}</p><p className="text-xs text-zinc-400 mt-2">{language}</p></div><Icon name="settings" size={42} className="text-orange-400" /></ClickButton></div></div><div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8 mt-10 max-w-6xl mx-auto">{partySlots.map((slot) => <ClickButton key={slot} onClick={() => (slot === 2 ? goTo(setPage, "profile") : goTo(setPage, "friends"))} className={`${theme.panel} h-44 lg:h-56 rounded-3xl border ${theme.border} hover:border-orange-400 flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(249,115,22,0.18)]`}>{slot === 2 ? <><Icon name="crown" size={28} className="text-orange-400 mb-3" /><Avatar seed={currentUser ? currentUser.nickname || currentUser.username : "skwizzy22"} size="h-20 w-20 lg:h-24 lg:w-24" /><div className="mt-3 text-white font-bold">{currentUser ? currentUser.nickname || currentUser.username : "skwizzy22"}</div></> : <><Icon name="plus" size={48} className="text-zinc-400" /><span className="text-xs text-zinc-400 mt-2">{t(language, "invite")}</span></>}</ClickButton>)}<ClickButton onClick={() => goTo(setPage, "search")} className={`${theme.panel} h-44 lg:h-56 rounded-3xl border ${theme.border} hover:border-orange-400 flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(249,115,22,0.18)]`}><Icon name="search" size={34} className="text-zinc-400 mb-3" /><b className="text-zinc-200">{t(language, "partySearch")}</b></ClickButton></div></section><section className="px-4 sm:px-6 lg:px-28 -mt-4 lg:-mt-10 relative z-10 pb-16"><div className={`${theme.panel} border ${theme.border} rounded-t-2xl px-4 lg:px-6 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between`}><ClickButton onClick={() => goTo(setPage, "play")} className="text-orange-400 flex items-center gap-2 font-bold"><Icon name="swords" /> {t(language, "matchType")}</ClickButton><ActionButton onClick={() => goTo(setPage, "play", t(language, "findMatch"))}>{t(language, "findMatch")}</ActionButton><ClickButton onClick={() => goTo(setPage, "servers")} className="text-zinc-300 hover:text-orange-400 font-bold flex items-center gap-2"><Icon name="server" /> {t(language, "servers")}</ClickButton></div><div className={`grid md:grid-cols-3 gap-5 ${theme.panel} border ${theme.border} p-4 lg:p-6 rounded-b-2xl`}>{matchTypes.map((typeName) => <ClickButton key={typeName} onClick={() => goTo(setPage, "play", `${t(language, "open")}: ${typeName}`)} className={`${theme.card} text-left rounded-3xl border border-orange-950/60 p-5 hover:-translate-y-1 hover:border-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.16)]`}><h3 className="font-black text-white">{typeName} <span className="text-zinc-400 text-sm">• 5v5</span></h3><p className="text-zinc-400 text-sm mt-3">{t(language, "premium")}</p></ClickButton>)}</div><SiteFooter currentUser={currentUser} setPage={setPage} /></section></main>;
}

function GenericPage({ page, setPage, language }) {
  const title = t(language, page);
  const icon = routeIcons[page] || "play";
  const cardMap = { play: ["5v5 Ranked", "Premium Queue", "Custom Lobby", "Aim Training"], tournaments: ["5x5 Weekend Cup", "Dropnet Open League", "School Cyber Cup", "Create Team"], league: ["Bronze Division", "Silver Division", "Elite Division", "Top 100 Players"], stats: ["Winrate: 57%", "K/D: 1.21", "HS: 42%", "Dust2: 64%"], friends: ["Добавить друга", "Онлайн: 3", "Заявки: 1", "Группы"], search: ["Найти игрока", "Найти команду", "Открытые лобби", "Фильтр по рангу"], inventory: ["AK-47 Redline", "AWP Graphite", "M4A1-S Nitro", "Dropnet Medal"], missions: ["20 Wins", "50 Headshots", "10 MVP", "3 Clutches 1v2"], maps: ["Mirage", "Dust II", "Inferno", "Nuke", "Ancient", "Anubis"], servers: ["Germany 12ms", "Poland 22ms", "Sweden 31ms", "Netherlands 38ms"], anticheat: ["Статус: не запущен", "Версия: demo", "Проверить файлы", "Запустить клиент"] };
  const cards = cardMap[page] || ["Demo Card 1", "Demo Card 2", "Demo Card 3"];
  return <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-12"><div className="max-w-6xl mx-auto"><div className={`rounded-3xl ${theme.panel} border ${theme.border} p-6 lg:p-10 ${theme.glow}`}><Icon name={icon} size={48} className="text-orange-400 mb-5" /><h1 className="text-3xl lg:text-4xl font-black mb-3">{title}</h1><p className="text-zinc-400 max-w-2xl">{t(language, "pageDescription")}</p><div className="flex flex-col sm:flex-row gap-3 mt-7"><ActionButton onClick={() => alert(`${title}: ${t(language, "demo")}`)}>{t(language, "mainAction")}</ActionButton><ActionButton dark onClick={() => goTo(setPage, "matchmaking")}>{t(language, "back")}</ActionButton></div></div><div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">{cards.map((card, index) => <ClickButton key={card} onClick={() => alert(`${t(language, "open")}: ${card}`)} className={`${theme.card} text-left rounded-3xl border border-orange-950/60 p-6 font-bold hover:border-orange-400 hover:bg-orange-950/25 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(249,115,22,0.14)]`}><div className="text-orange-400 mb-3"><Icon name={index % 2 ? "crosshair" : icon} size={26} /></div>{card}<p className="text-xs text-zinc-400 mt-3">{t(language, "demo")}</p></ClickButton>)}</div></div></main>;
}

export default function DropnetgamingApp() {
  const [page, setPage] = useState(getRouteFromHash);
  const [language, setLanguage] = useState("Русский");
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(loadSession);
  const [tickets, setTickets] = useState(() => readJson(STORAGE_TICKETS, []));

  useEffect(() => { const syncPageWithUrl = () => setPage(getRouteFromHash()); window.addEventListener("hashchange", syncPageWithUrl); if (!window.location.hash) window.history.replaceState(null, "", "#/matchmaking"); return () => window.removeEventListener("hashchange", syncPageWithUrl); }, []);
  useEffect(() => { writeJson(STORAGE_USERS, users); }, [users]);

  const onLogout = () => { setCurrentUser(null); saveSession(null); goTo(setPage, "matchmaking"); };

  const CurrentPage = useMemo(() => {
    if (page === "matchmaking") return () => <Matchmaking setPage={setPage} language={language} currentUser={currentUser} />;
    if (page === "news") return () => <NewsPage setPage={setPage} />;
    if (page === "feedback") return () => <FeedbackPage currentUser={currentUser} tickets={tickets} setTickets={setTickets} />;
    if (page === "profile") return () => <ProfilePage setPage={setPage} language={language} currentUser={currentUser} />;
    if (page === "settings") return () => <SettingsPage language={language} setLanguage={setLanguage} />;
    if (page === "login") return () => <AuthPage mode="login" setPage={setPage} language={language} users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />;
    if (page === "register") return () => <AuthPage mode="register" setPage={setPage} language={language} users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />;
    if (page === "admin") return () => <AdminPage currentUser={currentUser} users={users} setUsers={setUsers} tickets={tickets} setTickets={setTickets} setPage={setPage} />;
    return () => <GenericPage page={page} setPage={setPage} language={language} />;
  }, [page, language, currentUser, users, tickets]);

  const backgroundStyle = { background: "radial-gradient(circle at 14% 18%, rgba(255,106,0,0.32), transparent 24%), radial-gradient(circle at 78% 14%, rgba(239,35,60,0.24), transparent 28%), radial-gradient(circle at 68% 86%, rgba(139,92,246,0.20), transparent 32%), linear-gradient(135deg, #050100 0%, #160603 28%, #080010 64%, #000000 100%)" };

  return <div className="relative min-h-screen lg:h-screen overflow-auto lg:overflow-hidden font-sans" style={backgroundStyle}><div className="pointer-events-none absolute inset-0 opacity-35 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" /><div className="pointer-events-none absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" /><div className="pointer-events-none absolute right-[-100px] bottom-[-140px] h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl" /><div className="relative z-10 min-h-screen lg:h-full flex flex-col"><TopNav page={page} setPage={setPage} language={language} currentUser={currentUser} onLogout={onLogout} /><div className="flex-1 flex flex-col lg:flex-row bg-transparent overflow-visible lg:overflow-hidden"><LeftSidebar page={page} setPage={setPage} language={language} /><CurrentPage /><RightBar setPage={setPage} language={language} /></div></div></div>;
}
