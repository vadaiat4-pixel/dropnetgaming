import React, { useEffect, useMemo, useState } from "react";

const languages = [
  "Русский",
  "English",
  "Deutsch",
  "Français",
  "Español",
  "Italiano",
  "Português",
  "Polski",
  "Українська",
  "中文",
  "日本語",
  "한국어",
  "العربية",
  "हिन्दी",
  "Türkçe",
  "Nederlands",
  "Svenska",
  "Norsk",
  "Suomi",
  "Dansk",
  "Čeština",
  "Română",
  "Magyar",
  "Ελληνικά",
  "Tiếng Việt",
  "Bahasa Indonesia",
  "Kiswahili",
  "Afrikaans",
  "Esperanto",
  "Latin"
];

const en = {
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
  rank: "Rank",
  track: "Track",
  partyFinder: "Party Finder",
  findMatch: "FIND MATCH",
  selectedLanguage: "Selected language",
  language: "Language",
  themes: "Theme",
  searchLanguage: "Search language...",
  applyTheme: "Active theme",
  rankless: "Unranked",
  season: "Season 8",
  nineMatches: "9 matches left until Skill Level",
  verified: "Verified",
  invite: "Invite",
  partySearch: "Party Search",
  matchType: "Match Type",
  wins: "Get 20 wins",
  themeLanguage: "Theme and language",
  premium: "Premium queue - Anticheat - CS2 maps",
  mainAction: "Main action",
  back: "Back",
  open: "Open",
  demo: "Demo action works",
  playerProfile: "Player Profile",
  latestMatches: "Latest Matches",
  details: "Details",
  friendRequest: "Friend request sent",
  siteNote: "DROP NET GAMING - CS2 Update",
  pageDescription: "This section is fully clickable and works as a demo page for Dropnetgaming.",
  languageNote: "Main languages translate the interface. Other languages use English fallback so the site never breaks."
};

const translations = {
  English: en,
  "Русский": {
    ...en,
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
    rank: "Ранг",
    findMatch: "НАЙТИ МАТЧ",
    selectedLanguage: "Выбран язык",
    language: "Язык",
    themes: "Тема",
    searchLanguage: "Поиск языка...",
    applyTheme: "Активная тема",
    rankless: "Без ранга",
    season: "Сезон 8",
    nineMatches: "9 матчей осталось до получения Skill Level",
    verified: "Верификация пройдена",
    invite: "Пригласить",
    partySearch: "Поиск группы",
    matchType: "Тип матча",
    wins: "Получить 20 побед",
    themeLanguage: "Тема и язык",
    premium: "Premium подбор - Античит - Карты CS2",
    mainAction: "Основное действие",
    back: "Назад",
    open: "Открыто",
    demo: "Демо-действие работает",
    playerProfile: "Профиль игрока",
    latestMatches: "Последние матчи",
    details: "Подробнее",
    friendRequest: "Заявка в друзья отправлена",
    pageDescription: "Этот раздел полностью кликабельный и работает как демо-страница Dropnetgaming.",
    languageNote: "Основные языки переводят интерфейс. Для остальных языков включён английский запасной вариант, чтобы сайт не ломался."
  },
  Deutsch: {
    ...en,
    matchmaking: "Spielsuche",
    play: "Spielen",
    tournaments: "Turniere",
    league: "Liga",
    search: "Suche",
    profile: "Profil",
    settings: "Einstellungen",
    language: "Sprache",
    themes: "Thema",
    findMatch: "MATCH FINDEN",
    rankless: "Ohne Rang"
  },
  Français: {
    ...en,
    play: "Jouer",
    tournaments: "Tournois",
    league: "Ligue",
    search: "Recherche",
    profile: "Profil",
    settings: "Paramètres",
    language: "Langue",
    themes: "Thème",
    findMatch: "TROUVER UNE PARTIE",
    rankless: "Sans rang"
  },
  Español: {
    ...en,
    matchmaking: "Emparejamiento",
    play: "Jugar",
    tournaments: "Torneos",
    league: "Liga",
    search: "Buscar",
    profile: "Perfil",
    settings: "Configuración",
    language: "Idioma",
    themes: "Tema",
    findMatch: "BUSCAR PARTIDA",
    rankless: "Sin rango"
  },
  Italiano: { ...en, play: "Gioca", profile: "Profilo", settings: "Impostazioni", language: "Lingua", findMatch: "TROVA PARTITA" },
  Português: { ...en, play: "Jogar", profile: "Perfil", settings: "Configurações", language: "Idioma", findMatch: "PROCURAR PARTIDA" },
  Polski: { ...en, play: "Graj", profile: "Profil", settings: "Ustawienia", language: "Język", findMatch: "ZNAJDŹ MECZ" },
  Українська: { ...en, matchmaking: "Матчмейкінг", play: "Грати", profile: "Профіль", settings: "Налаштування", language: "Мова", findMatch: "ЗНАЙТИ МАТЧ" },
  中文: { ...en, matchmaking: "匹配", play: "开始", tournaments: "锦标赛", profile: "资料", settings: "设置", language: "语言", findMatch: "寻找比赛" },
  日本語: { ...en, matchmaking: "マッチメイキング", play: "プレイ", tournaments: "トーナメント", profile: "プロフィール", settings: "設定", language: "言語", findMatch: "マッチを探す" },
  한국어: { ...en, matchmaking: "매치메이킹", play: "플레이", tournaments: "토너먼트", profile: "프로필", settings: "설정", language: "언어", findMatch: "매치 찾기" },
  العربية: { ...en, matchmaking: "التوفيق", play: "العب", tournaments: "البطولات", profile: "الملف الشخصي", settings: "الإعدادات", language: "اللغة", findMatch: "ابحث عن مباراة" },
  हिन्दी: { ...en, matchmaking: "मैचमेकिंग", play: "खेलें", tournaments: "टूर्नामेंट", profile: "प्रोफ़ाइल", settings: "सेटिंग्स", language: "भाषा", findMatch: "मैच खोजें" }
};

function t(language, key) {
  const dict = translations[language] || en;
  return dict[key] || en[key] || key;
}

const theme = {
  button: "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500",
  border: "border-orange-950/60",
  activeBorder: "border-orange-500",
  panel: "bg-black/60 backdrop-blur-md",
  card: "bg-zinc-950/70 backdrop-blur-md",
  glow: "shadow-[0_0_35px_rgba(249,115,22,0.16)]",
  background: "bg-[radial-gradient(circle_at_18%_12%,rgba(249,115,22,0.20),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_70%_92%,rgba(220,38,38,0.16),transparent_35%),linear-gradient(135deg,#080808_0%,#170b06_34%,#090015_72%,#000000_100%)]"
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
  settings: "settings"
};

const routes = Object.keys(routeIcons);

function runTests() {
  console.assert(languages.includes("Русский"), "Russian language exists");
  console.assert(languages.includes("English"), "English language exists");
  console.assert(t("English", "findMatch") === "FIND MATCH", "English translation works");
  console.assert(t("Русский", "themes") === "Тема", "Russian translation works");
  console.assert(t("Deutsch", "play") === "Spielen", "German translation works");
  console.assert(t("Unknown", "play") === "Play", "Unknown language fallback works");
  console.assert(routes.includes("profile") && routes.includes("settings"), "Profile and settings routes exist");
  console.assert(routeIcons.play === "play", "Route icons exist");
  console.assert(typeof theme.background === "string" && theme.background.includes("gradient"), "Gradient theme exists");
}
runTests();

function Icon({ name, size = 22, className = "" }) {
  const icons = {
    home: "⌂",
    search: "⌕",
    play: "▶",
    stats: "▥",
    chart: "⇈",
    shield: "⬟",
    users: "♟",
    plus: "+",
    crown: "♛",
    trophy: "◆",
    map: "▤",
    server: "▦",
    settings: "⚙",
    inventory: "▣",
    missions: "◎",
    crosshair: "⊕",
    theme: "◒",
    language: "文",
    swords: "✕"
  };

  return (
    <span className={`inline-flex items-center justify-center font-black select-none ${className}`} style={{ width: size, height: size, fontSize: size * 0.9 }}>
      {icons[name] || "•"}
    </span>
  );
}

function AnimeLogo() {
  return (
    <div className="relative h-36 w-36 rounded-full overflow-hidden bg-[#120806] border-2 border-white shadow-[0_0_34px_rgba(255,255,255,0.24)]">
      <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label="Dropnetgaming logo">
        <defs>
          <clipPath id="dropnetLogoClip">
            <circle cx="110" cy="110" r="96" />
          </clipPath>
          <radialGradient id="dropnetLogoGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1b0d08" />
            <stop offset="65%" stopColor="#080302" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
        </defs>
        <rect width="220" height="220" fill="#120806" />
        <circle cx="110" cy="110" r="101" fill="url(#dropnetLogoGlow)" stroke="#ffffff" strokeWidth="6" />
        <circle cx="110" cy="110" r="93" fill="#050505" stroke="#ffffff" strokeWidth="2" />
        <g clipPath="url(#dropnetLogoClip)">
          <rect width="220" height="220" fill="#050505" />
          <path d="M22 73 C52 33, 106 19, 174 35 C142 42, 112 57, 82 82 C116 63, 154 61, 204 78 C163 84, 128 100, 91 133 C106 111, 128 94, 166 84 C130 103, 105 128, 78 175 C76 139, 87 107, 111 82 C77 99, 52 124, 26 170 C28 128, 33 95, 22 73 Z" fill="#ffffff" />
          <path d="M23 62 C52 73, 84 73, 123 62 C96 82, 61 94, 21 105 Z" fill="#ffffff" />
          <path d="M77 31 C96 49, 121 56, 151 52 C126 66, 98 68, 72 56 Z" fill="#ffffff" />
          <path d="M33 122 C57 102, 88 96, 119 110 C91 115, 66 127, 43 150 Z" fill="#ffffff" />
          <path d="M103 104 C127 83, 161 79, 198 94 C166 101, 138 115, 112 143 Z" fill="#ffffff" />
          <path d="M42 128 C65 113, 92 112, 114 124" fill="none" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
          <path d="M118 113 C143 98, 169 98, 192 110" fill="none" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
          <path d="M70 126 L94 129 L82 143 Z" fill="#050505" />
          <path d="M148 111 L173 114 L161 129 Z" fill="#050505" />
          <path d="M76 124 C86 120, 98 121, 108 126" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M151 110 C162 106, 175 108, 186 113" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M99 124 C92 150, 92 169, 104 181 C116 170, 124 156, 128 137" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <path d="M84 184 C111 200, 151 194, 188 158 C171 206, 119 221, 63 191 Z" fill="#ffffff" />
          <path d="M73 184 C104 207, 154 205, 190 159" fill="none" stroke="#050505" strokeWidth="6" strokeLinecap="round" />
          <path d="M103 186 C116 193, 133 193, 150 185 C136 202, 119 204, 103 186 Z" fill="#050505" />
          <path d="M21 167 C55 169, 88 181, 123 218 C76 223, 39 205, 21 167 Z" fill="#ffffff" />
          <path d="M190 129 C205 148, 212 172, 207 202 C194 173, 181 153, 162 139 Z" fill="#ffffff" />
          <path d="M33 76 C55 91, 83 98, 119 94" fill="none" stroke="#050505" strokeWidth="5" strokeLinecap="round" />
          <path d="M84 78 C108 95, 134 102, 170 98" fill="none" stroke="#050505" strokeWidth="5" strokeLinecap="round" />
          <path d="M145 74 C168 88, 190 94, 215 94" fill="none" stroke="#050505" strokeWidth="5" strokeLinecap="round" />
        </g>
        <circle cx="110" cy="110" r="101" fill="none" stroke="#ffffff" strokeWidth="4" />
        <circle cx="110" cy="110" r="91" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.75" />
      </svg>
    </div>
  );
}

function getRouteFromHash() {
  const rawHash = window.location.hash.replace("#/", "").replace("#", "");
  const route = rawHash.split("?")[0].trim();
  return routes.includes(route) ? route : "matchmaking";
}

function goTo(setPage, page, message) {
  const targetPage = routes.includes(page) ? page : "matchmaking";
  window.history.pushState(null, "", `#/${targetPage}`);
  setPage(targetPage);
  if (message) {
    window.setTimeout(() => alert(message), 40);
  }
}

function Avatar({ seed = "dn", size = "h-10 w-10" }) {
  return (
    <div className={`${size} rounded-full bg-zinc-950 border border-orange-900/60 flex items-center justify-center text-xs font-black text-white`}>
      {seed.slice(0, 2).toUpperCase()}
    </div>
  );
}

function ClickButton({ children, onClick, className = "", title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (onClick) onClick();
      }}
      className={`${className} cursor-pointer select-none transition active:scale-[0.98]`}
      style={{ pointerEvents: "auto" }}
    >
      {children}
    </button>
  );
}

function ActionButton({ children, onClick, dark = false }) {
  const cls = dark ? "bg-zinc-950/80 hover:bg-zinc-900" : theme.button;
  return (
    <ClickButton onClick={onClick} className={`${cls} px-4 py-3 rounded-xl font-black border border-orange-900/40 text-white shadow-[0_0_18px_rgba(249,115,22,0.15)]`}>
      {children}
    </ClickButton>
  );
}

function TopNav({ page, setPage, language }) {
  const topLinks = ["matchmaking", "play", "tournaments", "league", "maps", "servers"];

  return (
    <div className={`h-[60px] bg-black/65 backdrop-blur-md border-b ${theme.border} flex items-center justify-between px-6 ${theme.glow}`}>
      <ClickButton onClick={() => goTo(setPage, "matchmaking")} className="flex items-center gap-4">
        <div className="text-white font-black text-2xl">DNG</div>
        <div className="bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-full h-11 w-11 flex items-center justify-center text-xs font-black border border-orange-400/40 shadow-[0_0_18px_rgba(249,115,22,0.28)]">CS2</div>
        <span className="text-white font-semibold">EU</span>
      </ClickButton>

      <div className="flex items-center gap-7 text-xs font-black uppercase tracking-wide">
        {topLinks.map((key) => (
          <ClickButton key={key} onClick={() => goTo(setPage, key)} className={`h-[60px] border-b-2 ${page === key ? `text-white ${theme.activeBorder}` : "text-zinc-400 border-transparent hover:text-white"}`}>
            {t(language, key)}
          </ClickButton>
        ))}
      </div>

      <div className="flex items-center gap-3 text-zinc-300">
        <ClickButton onClick={() => goTo(setPage, "anticheat")} className="hover:text-orange-400"><Icon name="shield" /></ClickButton>
        <ClickButton onClick={() => goTo(setPage, "settings")} className="hover:text-orange-400"><Icon name="theme" /></ClickButton>
        <ClickButton onClick={() => goTo(setPage, "profile")}><Avatar seed="skwizzy" /></ClickButton>
      </div>
    </div>
  );
}

function LeftSidebar({ page, setPage, language }) {
  const mainItems = [
    { key: "search", icon: "search", label: t(language, "search") },
    { key: "friends", icon: "users", label: t(language, "partyFinder") },
    { key: "play", icon: "play", label: t(language, "play") },
    { key: "league", icon: "stats", label: t(language, "rank") },
    { key: "stats", icon: "chart", label: t(language, "track") },
    { key: "missions", icon: "missions", label: t(language, "missions") }
  ];
  const clubItems = [
    { key: "tournaments", icon: "users", label: t(language, "clubs") },
    { key: "inventory", icon: "trophy", label: "SKINBRO | CS2" },
    { key: "profile", icon: "plus", label: t(language, "createClub") }
  ];
  const itemClass = (key) => {
    return `w-full h-12 rounded-lg flex items-center gap-3 px-3 text-left border ${page === key ? "bg-orange-950/35 text-white border-orange-800/60" : "bg-transparent text-zinc-300 border-transparent hover:bg-orange-950/25 hover:text-white"}`;
  };

  return (
    <aside className={`w-60 bg-black/60 backdrop-blur-md border-r ${theme.border} flex flex-col py-6 px-4 gap-2 ${theme.glow}`}>
      <ClickButton onClick={() => goTo(setPage, "matchmaking")} className="mb-6 flex items-center justify-center">
        <AnimeLogo />
      </ClickButton>

      {mainItems.map((item) => (
        <ClickButton key={item.key} title={item.label} onClick={() => goTo(setPage, item.key)} className={itemClass(item.key)}>
          <Icon name={item.icon} size={23} />
          <span className="text-base font-medium tracking-wide">{item.label}</span>
        </ClickButton>
      ))}

      <div className="h-px bg-orange-950/50 my-6" />

      {clubItems.map((item) => (
        <ClickButton key={item.key} title={item.label} onClick={() => goTo(setPage, item.key)} className={itemClass(item.key)}>
          <Icon name={item.icon} size={23} />
          <span className="text-base font-medium tracking-wide">{item.label}</span>
        </ClickButton>
      ))}
    </aside>
  );
}

function RightBar({ setPage, language }) {
  const buttons = ["profile", "friends", "inventory", "missions", "anticheat", "settings"];
  return (
    <aside className={`w-16 bg-black/60 backdrop-blur-md border-l ${theme.border} flex flex-col items-center py-4 gap-5 text-zinc-300 ${theme.glow}`}>
      <ClickButton onClick={() => goTo(setPage, "profile")}>
        <Avatar seed="dn" size="h-11 w-11" />
      </ClickButton>
      {buttons.map((key) => (
        <ClickButton key={key} onClick={() => goTo(setPage, key)} className="hover:text-orange-400" title={t(language, key)}>
          <Icon name={routeIcons[key]} />
        </ClickButton>
      ))}
    </aside>
  );
}

function ProfilePage({ setPage, language }) {
  const badges = language === "Русский"
    ? ["Steam подключён", "Верификация пройдена", "Античит готов", "EU сервер"]
    : ["Steam connected", "Verified", "Anticheat ready", "EU server"];
  const matches = ["Mirage - Win - 16:12", "Dust II - Lose - 11:13", "Inferno - Win - 13:9", "Nuke - Win - 13:7"];
  const stats = [["57%", "Winrate"], ["1.21", "K/D"], ["42%", "HS"], ["0", "ELO"]];

  return (
    <main className="flex-1 overflow-auto bg-transparent text-white p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-[360px_1fr] gap-6">
        <section className={`rounded-3xl ${theme.panel} border ${theme.border} p-7 ${theme.glow}`}>
          <div className="flex flex-col items-center text-center">
            <Avatar seed="skwizzy22" size="h-32 w-32" />
            <h1 className="text-3xl font-black mt-5">skwizzy22</h1>
            <p className="text-zinc-400">team_skwizzy22 - Russia</p>
            <div className="mt-4 px-4 py-2 rounded-full bg-orange-950/30 border border-orange-800/50 text-orange-300 font-black">Level 1 - {t(language, "rankless")}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-7 text-center">
            {stats.map(([value, label]) => (
              <div key={label} className={`${theme.card} rounded-2xl p-4 border border-orange-950/50`}>
                <b>{value}</b>
                <p className="text-xs text-zinc-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <ActionButton onClick={() => alert(t(language, "friendRequest"))}>{t(language, "friends")}</ActionButton>
            <ActionButton dark onClick={() => goTo(setPage, "settings")}>{t(language, "settings")}</ActionButton>
          </div>
        </section>

        <section className="space-y-6">
          <div className={`rounded-3xl ${theme.panel} border ${theme.border} p-7`}>
            <h2 className="text-2xl font-black mb-4">{t(language, "playerProfile")}</h2>
            <p className="text-zinc-400">{language === "Русский" ? "Здесь можно смотреть аватар, статистику, последние матчи, достижения, инвентарь и информацию о CS2 аккаунте." : "Here you can view avatar, statistics, latest matches, achievements, inventory and CS2 account info."}</p>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {badges.map((badge) => (
                <ClickButton key={badge} onClick={() => alert(badge)} className={`${theme.card} hover:bg-orange-950/30 rounded-2xl p-4 text-left font-bold border border-orange-950/50`}>
                  <Icon name="shield" className="text-orange-400" />
                  <div className="mt-2">{badge}</div>
                </ClickButton>
              ))}
            </div>
          </div>

          <div className={`rounded-3xl ${theme.panel} border ${theme.border} p-7`}>
            <h2 className="text-2xl font-black mb-4">{t(language, "latestMatches")}</h2>
            {matches.map((match) => (
              <ClickButton key={match} onClick={() => alert(`${t(language, "open")}: ${match}`)} className={`${theme.card} w-full flex justify-between hover:bg-orange-950/30 rounded-xl p-4 mb-3 text-left border border-orange-950/50`}>
                <span>{match}</span>
                <span className="text-orange-400">{t(language, "details")}</span>
              </ClickButton>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SettingsPage({ language, setLanguage }) {
  const [filter, setFilter] = useState("");
  const filteredLanguages = languages.filter((lang) => lang.toLowerCase().includes(filter.toLowerCase()));

  return (
    <main className="flex-1 overflow-auto bg-transparent text-white p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <section className={`rounded-3xl ${theme.panel} border ${theme.border} p-8 ${theme.glow}`}>
          <Icon name="settings" size={48} className="text-orange-400" />
          <h1 className="text-4xl font-black mt-3">{t(language, "settings")}</h1>
          <p className="text-zinc-400 mt-2">{t(language, "selectedLanguage")}: <b className="text-white">{language}</b></p>
        </section>

        <section className={`rounded-3xl ${theme.panel} border ${theme.border} p-8`}>
          <h2 className="text-2xl font-black mb-5"><Icon name="theme" className="text-orange-400" /> {t(language, "themes")}</h2>
          <div className="rounded-2xl p-5 text-left border border-orange-900/60 bg-gradient-to-br from-orange-600/30 via-red-700/25 to-purple-700/25">
            <div className="h-16 rounded-xl mb-4 bg-gradient-to-r from-orange-500 via-red-600 to-purple-700" />
            <b>Neon Gradient</b>
            <p className="text-xs text-zinc-400 mt-1">{t(language, "applyTheme")}</p>
          </div>
        </section>

        <section className={`rounded-3xl ${theme.panel} border ${theme.border} p-8`}>
          <h2 className="text-2xl font-black mb-5"><Icon name="language" className="text-orange-400" /> {t(language, "language")}</h2>
          <input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder={t(language, "searchLanguage")}
            className="w-full bg-black/60 border border-orange-950/60 rounded-xl p-4 mb-5 outline-none focus:border-orange-500"
          />
          <div className="grid grid-cols-4 gap-3 max-h-[420px] overflow-auto pr-2">
            {filteredLanguages.map((lang) => (
              <ClickButton key={lang} onClick={() => setLanguage(lang)} className={`rounded-xl px-4 py-3 text-left border ${language === lang ? "bg-orange-600 border-orange-300" : "bg-black/50 border-orange-950/50 hover:bg-orange-950/30"}`}>
                {lang}
              </ClickButton>
            ))}
          </div>
          <p className="text-xs text-zinc-400 mt-4">{t(language, "languageNote")}</p>
        </section>
      </div>
    </main>
  );
}

function Matchmaking({ setPage, language }) {
  const partySlots = [0, 1, 2, 3];
  const matchTypes = language === "Русский" ? ["Стандартный матч", "Суперматч", "Premium Match"] : ["Standard Match", "Super Match", "Premium Match"];

  return (
    <main className="flex-1 overflow-auto bg-transparent text-white">
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 text-white font-black text-center py-3 border-b border-orange-400/20 shadow-[0_0_24px_rgba(249,115,22,0.2)]">
        {t(language, "siteNote")}
      </div>

      <section className="relative min-h-[520px] px-28 py-16 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.10),transparent_42%),linear-gradient(90deg,rgba(0,0,0,0.55),rgba(20,5,0,0.45),rgba(10,0,18,0.55))]">
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-1 rounded-full text-sm font-black border border-orange-900/60">Europe CS2 5v5 Queue</div>

        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <ClickButton onClick={() => goTo(setPage, "profile")} className="h-28 w-28 rounded-full border-[12px] border-zinc-900 hover:border-orange-500 flex items-center justify-center text-5xl text-zinc-400 font-black">?</ClickButton>
            <div>
              <ClickButton onClick={() => goTo(setPage, "league")} className="text-sm bg-black/70 hover:bg-orange-950/40 inline-block px-3 py-1 rounded-full mb-3 border border-orange-950/60">{t(language, "season")}</ClickButton>
              <h1 className="text-4xl font-black">{t(language, "rankless")}</h1>
              <div className="h-1 w-[520px] bg-zinc-800 mt-4 rounded"><div className="h-1 w-16 bg-gradient-to-r from-orange-400 to-red-500 rounded" /></div>
              <p className="text-xs text-zinc-400 mt-2">{t(language, "nineMatches")}</p>
              <ClickButton onClick={() => goTo(setPage, "profile")} className="mt-7 flex gap-3 items-center hover:text-orange-300">
                <b>team_skwizzy22</b>
                <span className="bg-black/70 px-3 py-2 rounded-full text-sm font-bold border border-orange-950/60"><Icon name="shield" size={16} className="inline mr-1" />{t(language, "verified")}</span>
              </ClickButton>
            </div>
          </div>

          <div className="grid gap-3 w-[640px]">
            <ClickButton onClick={() => goTo(setPage, "missions")} className={`${theme.panel} border ${theme.border} hover:border-orange-400 rounded-xl p-4 flex items-center justify-between text-left`}>
              <div>
                <p className="text-xs tracking-[.25em] text-zinc-400 uppercase">Season Prestige Path</p>
                <h3 className="font-black mt-1">{t(language, "wins")}</h3>
                <div className="h-2 w-72 bg-zinc-800 mt-3 rounded"><div className="h-2 w-16 bg-gradient-to-r from-orange-400 to-red-500 rounded" /></div>
              </div>
              <b>0 / 20</b>
              <Icon name="trophy" size={24} className="text-orange-400" />
            </ClickButton>

            <ClickButton onClick={() => goTo(setPage, "settings")} className={`${theme.panel} border ${theme.border} hover:border-orange-400 rounded-xl p-4 flex items-center justify-between text-left`}>
              <div>
                <h3 className="font-black">{t(language, "themeLanguage")}</h3>
                <p className="text-orange-400 mt-2 font-bold">{t(language, "settings")}</p>
                <p className="text-xs text-zinc-400 mt-2">{language}</p>
              </div>
              <Icon name="settings" size={42} className="text-orange-400" />
            </ClickButton>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8 mt-10 max-w-6xl mx-auto">
          {partySlots.map((slot) => (
            <ClickButton key={slot} onClick={() => (slot === 2 ? goTo(setPage, "profile") : goTo(setPage, "friends"))} className={`${theme.panel} h-56 rounded-2xl border ${theme.border} hover:border-orange-400 flex flex-col items-center justify-center`}>
              {slot === 2 ? (
                <>
                  <Icon name="crown" size={28} className="text-orange-400 mb-3" />
                  <Avatar seed="skwizzy22" size="h-24 w-24" />
                  <div className="mt-3 text-white font-bold">skwizzy22</div>
                </>
              ) : (
                <>
                  <Icon name="plus" size={48} className="text-zinc-400" />
                  <span className="text-xs text-zinc-400 mt-2">{t(language, "invite")}</span>
                </>
              )}
            </ClickButton>
          ))}
          <ClickButton onClick={() => goTo(setPage, "search")} className={`${theme.panel} h-56 rounded-2xl border ${theme.border} hover:border-orange-400 flex flex-col items-center justify-center`}>
            <Icon name="search" size={34} className="text-zinc-400 mb-3" />
            <b className="text-zinc-200">{t(language, "partySearch")}</b>
          </ClickButton>
        </div>
      </section>

      <section className="px-28 -mt-10 relative z-10 pb-16">
        <div className={`${theme.panel} border ${theme.border} rounded-t-2xl px-6 py-4 flex items-center justify-between`}>
          <ClickButton onClick={() => goTo(setPage, "play")} className="text-orange-400 flex items-center gap-2 font-bold"><Icon name="swords" /> {t(language, "matchType")}</ClickButton>
          <ActionButton onClick={() => goTo(setPage, "play", t(language, "findMatch"))}>{t(language, "findMatch")}</ActionButton>
          <ClickButton onClick={() => goTo(setPage, "servers")} className="text-zinc-300 hover:text-orange-400 font-bold flex items-center gap-2"><Icon name="server" /> {t(language, "servers")}</ClickButton>
        </div>
        <div className={`grid grid-cols-3 gap-5 ${theme.panel} border ${theme.border} p-6 rounded-b-2xl`}>
          {matchTypes.map((typeName) => (
            <ClickButton key={typeName} onClick={() => goTo(setPage, "play", `${t(language, "open")}: ${typeName}`)} className={`${theme.card} text-left rounded-2xl border border-orange-950/60 p-5 hover:-translate-y-1 hover:border-orange-400`}>
              <h3 className="font-black text-white">{typeName} <span className="text-zinc-400 text-sm">- 5v5</span></h3>
              <p className="text-zinc-400 text-sm mt-3">{t(language, "premium")}</p>
            </ClickButton>
          ))}
        </div>
      </section>
    </main>
  );
}

function GenericPage({ page, setPage, language }) {
  const title = t(language, page);
  const icon = routeIcons[page] || "play";
  const cardMap = {
    play: ["5v5 Ranked", "Premium Queue", "Custom Lobby", "Aim Training"],
    tournaments: ["5x5 Weekend Cup", "Dropnet Open League", "School Cyber Cup", "Create Team"],
    league: ["Bronze Division", "Silver Division", "Elite Division", "Top 100 Players"],
    stats: ["Winrate: 57%", "K/D: 1.21", "HS: 42%", "Dust2: 64%"],
    friends: language === "Русский" ? ["Добавить друга", "Онлайн: 3", "Заявки: 1", "Группы"] : ["Add Friend", "Online: 3", "Requests: 1", "Groups"],
    search: language === "Русский" ? ["Найти игрока", "Найти команду", "Открытые лобби", "Фильтр по рангу"] : ["Find Player", "Find Team", "Open Lobbies", "Rank Filter"],
    inventory: ["AK-47 Redline", "AWP Graphite", "M4A1-S Nitro", "Dropnet Medal"],
    missions: ["20 Wins", "50 Headshots", "10 MVP", "3 Clutches 1v2"],
    maps: ["Mirage", "Dust II", "Inferno", "Nuke", "Ancient", "Anubis"],
    servers: ["Germany 12ms", "Poland 22ms", "Sweden 31ms", "Netherlands 38ms"],
    anticheat: language === "Русский" ? ["Статус: не запущен", "Версия: demo", "Проверить файлы", "Запустить клиент"] : ["Status: Off", "Version: demo", "Verify Files", "Launch Client"]
  };
  const cards = cardMap[page] || ["Demo Card 1", "Demo Card 2", "Demo Card 3"];

  return (
    <main className="flex-1 overflow-auto bg-transparent text-white p-12">
      <div className="max-w-6xl mx-auto">
        <div className={`rounded-3xl ${theme.panel} border ${theme.border} p-10 ${theme.glow}`}>
          <Icon name={icon} size={48} className="text-orange-400 mb-5" />
          <h1 className="text-4xl font-black mb-3">{title}</h1>
          <p className="text-zinc-400 max-w-2xl">{t(language, "pageDescription")}</p>
          <div className="flex gap-3 mt-7">
            <ActionButton onClick={() => alert(`${title}: ${t(language, "demo")}`)}>{t(language, "mainAction")}</ActionButton>
            <ActionButton dark onClick={() => goTo(setPage, "matchmaking")}>{t(language, "back")}</ActionButton>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-8">
          {cards.map((card, index) => (
            <ClickButton key={card} onClick={() => alert(`${t(language, "open")}: ${card}`)} className={`${theme.card} text-left rounded-2xl border border-orange-950/60 p-6 font-bold hover:border-orange-400 hover:bg-orange-950/25`}>
              <div className="text-orange-400 mb-3"><Icon name={index % 2 ? "crosshair" : icon} size={26} /></div>
              {card}
              <p className="text-xs text-zinc-400 mt-3">{t(language, "demo")}</p>
            </ClickButton>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function DropnetgamingApp() {
  const [page, setPage] = useState(getRouteFromHash);
  const [language, setLanguage] = useState("Русский");

  useEffect(() => {
    const syncPageWithUrl = () => setPage(getRouteFromHash());
    window.addEventListener("hashchange", syncPageWithUrl);
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/matchmaking");
    }
    return () => window.removeEventListener("hashchange", syncPageWithUrl);
  }, []);

  const CurrentPage = useMemo(() => {
    if (page === "matchmaking") return () => <Matchmaking setPage={setPage} language={language} />;
    if (page === "profile") return () => <ProfilePage setPage={setPage} language={language} />;
    if (page === "settings") return () => <SettingsPage language={language} setLanguage={setLanguage} />;
    return () => <GenericPage page={page} setPage={setPage} language={language} />;
  }, [page, language]);

  return (
    <div className={`h-screen overflow-hidden font-sans ${theme.background}`} style={{ pointerEvents: "auto" }}>
      <TopNav page={page} setPage={setPage} language={language} />
      <div className="h-[calc(100vh-60px)] flex bg-transparent">
        <LeftSidebar page={page} setPage={setPage} language={language} />
        <CurrentPage />
        <RightBar setPage={setPage} language={language} />
      </div>
    </div>
  );
}
