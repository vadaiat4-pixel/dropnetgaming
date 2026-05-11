import React, { useEffect, useMemo, useState } from "react";

const languages = [
  "Русский", "English", "Deutsch", "Français", "Español", "Italiano", "Português", "Polski", "Українська", "中文",
  "日本語", "한국어", "العربية", "हिन्दी", "Türkçe", "Nederlands", "Svenska", "Norsk", "Suomi", "Dansk",
  "Čeština", "Română", "Magyar", "Ελληνικά", "Tiếng Việt", "Bahasa Indonesia", "Kiswahili", "Afrikaans", "Esperanto", "Latin"
];

const en = {
  matchmaking: "Matchmaking", play: "Play", tournaments: "Tournaments", league: "League", search: "Search", profile: "Profile",
  stats: "Statistics", friends: "Friends", inventory: "Inventory", missions: "Missions", maps: "Maps", servers: "Servers",
  anticheat: "Anticheat", settings: "Settings", admin: "Admin", findMatch: "FIND MATCH", language: "Language", themes: "Themes",
  selectedLanguage: "Selected language", applyTheme: "Click to apply", searchLanguage: "Search language...", mainAction: "Main action",
  back: "Back", open: "Open", demo: "Demo action works", rankless: "Unranked", season: "Season 8", wins: "Get 20 wins",
  invite: "Invite", partySearch: "Party Search", matchType: "Match Type", playerProfile: "Player Profile", latestMatches: "Latest Matches",
  details: "Details", verified: "Verified", friendRequest: "Friend request sent", nineMatches: "9 matches left until skill level",
  siteNote: "DROP NET GAMING • CS2 Update", themeLanguage: "Theme & Language", premium: "Premium queue • Anticheat • CS2 maps",
  pageDescription: "This page is fully clickable and works as a demo section of the Dropnetgaming project.",
  languageNote: "Main languages translate the interface. Other languages use English fallback so the site never breaks."
};

const translations = {
  "Русский": {
    ...en,
    matchmaking: "Матчмейкинг", play: "Играть", tournaments: "Турниры", league: "Лига", search: "Поиск", profile: "Профиль",
    stats: "Статистика", friends: "Друзья", inventory: "Инвентарь", missions: "Миссии", maps: "Карты", servers: "Серверы",
    anticheat: "Античит", settings: "Настройки", admin: "Админка", findMatch: "НАЙТИ МАТЧ", language: "Язык", themes: "Темы",
    selectedLanguage: "Выбран язык", applyTheme: "Нажми, чтобы применить", searchLanguage: "Поиск языка...", mainAction: "Основное действие",
    back: "Назад", open: "Открыто", demo: "Демо-действие работает", rankless: "Без ранга", season: "Сезон 8", wins: "Получить 20 побед",
    invite: "Пригласить", partySearch: "Поиск группы", matchType: "Тип матча", playerProfile: "Профиль игрока", latestMatches: "Последние матчи",
    details: "Подробнее", verified: "Верификация пройдена", friendRequest: "Заявка в друзья отправлена", nineMatches: "9 матчей осталось до получения Skill Level",
    siteNote: "DROP NET GAMING • CS2 Update", themeLanguage: "Тема и язык", premium: "Premium подбор • Античит • Карты CS2",
    pageDescription: "Страница полностью кликабельна и работает как демо-раздел проекта Dropnetgaming.",
    languageNote: "Основные языки переводят интерфейс. Для остальных языков включён английский запасной вариант, чтобы сайт не ломался."
  },
  English: en,
  Deutsch: { ...en, matchmaking: "Spielsuche", play: "Spielen", tournaments: "Turniere", league: "Liga", search: "Suche", profile: "Profil", stats: "Statistik", friends: "Freunde", inventory: "Inventar", missions: "Missionen", maps: "Karten", servers: "Server", settings: "Einstellungen", findMatch: "MATCH FINDEN", language: "Sprache", themes: "Themen", back: "Zurück", rankless: "Ohne Rang", season: "Saison 8" },
  Français: { ...en, play: "Jouer", tournaments: "Tournois", league: "Ligue", search: "Recherche", profile: "Profil", friends: "Amis", inventory: "Inventaire", maps: "Cartes", servers: "Serveurs", settings: "Paramètres", findMatch: "TROUVER UNE PARTIE", language: "Langue", themes: "Thèmes", back: "Retour", rankless: "Sans rang" },
  Español: { ...en, matchmaking: "Emparejamiento", play: "Jugar", tournaments: "Torneos", league: "Liga", search: "Buscar", profile: "Perfil", friends: "Amigos", inventory: "Inventario", missions: "Misiones", maps: "Mapas", servers: "Servidores", settings: "Configuración", findMatch: "BUSCAR PARTIDA", language: "Idioma", themes: "Temas", back: "Atrás", rankless: "Sin rango" },
  Italiano: { ...en, play: "Gioca", profile: "Profilo", settings: "Impostazioni", language: "Lingua", themes: "Temi", findMatch: "TROVA PARTITA" },
  Português: { ...en, play: "Jogar", profile: "Perfil", settings: "Configurações", language: "Idioma", themes: "Temas", findMatch: "PROCURAR PARTIDA" },
  Polski: { ...en, play: "Graj", profile: "Profil", settings: "Ustawienia", language: "Język", themes: "Motywy", findMatch: "ZNAJDŹ MECZ" },
  Українська: { ...en, matchmaking: "Матчмейкінг", play: "Грати", profile: "Профіль", settings: "Налаштування", language: "Мова", themes: "Теми", findMatch: "ЗНАЙТИ МАТЧ" },
  中文: { ...en, matchmaking: "匹配", play: "开始", tournaments: "锦标赛", profile: "资料", settings: "设置", language: "语言", themes: "主题", findMatch: "寻找比赛" },
  日本語: { ...en, matchmaking: "マッチメイキング", play: "プレイ", tournaments: "トーナメント", profile: "プロフィール", settings: "設定", language: "言語", themes: "テーマ", findMatch: "マッチを探す" },
  한국어: { ...en, matchmaking: "매치메이킹", play: "플레이", tournaments: "토너먼트", profile: "프로필", settings: "설정", language: "언어", themes: "테마", findMatch: "매치 찾기" },
  العربية: { ...en, matchmaking: "التوفيق", play: "العب", tournaments: "البطولات", profile: "الملف الشخصي", settings: "الإعدادات", language: "اللغة", themes: "السمات", findMatch: "ابحث عن مباراة" },
  हिन्दी: { ...en, matchmaking: "मैचमेकिंग", play: "खेलें", tournaments: "टूर्नामेंट", profile: "प्रोफ़ाइल", settings: "सेटिंग्स", language: "भाषा", themes: "थीम", findMatch: "मैच खोजें" }
};

function t(language, key) {
  const dict = translations[language] || en;
  return dict[key] || en[key] || key;
}

const theme = {
  name: "Pure Black",
  button: "bg-zinc-900 hover:bg-zinc-800",
  border: "border-zinc-900",
  activeBorder: "border-white"
};

const routes = ["matchmaking", "play", "tournaments", "league", "search", "profile", "stats", "friends", "inventory", "missions", "maps", "servers", "anticheat", "settings", "admin"];
const routeIcons = {
  matchmaking: "home", play: "play", tournaments: "trophy", league: "chart", search: "search", profile: "shield",
  stats: "stats", friends: "users", inventory: "inventory", missions: "missions", maps: "map", servers: "server", anticheat: "shield", settings: "settings", admin: "admin"
};

function runTests() {
  console.assert(languages.includes("Русский"), "Russian language exists");
  console.assert(languages.includes("English"), "English language exists");
  console.assert(t("English", "findMatch") === "FIND MATCH", "English translation works");
  console.assert(t("Русский", "themes") === "Темы", "Russian translation works");
  console.assert(t("Deutsch", "play") === "Spielen", "German translation works");
  console.assert(t("Unknown", "play") === "Play", "Fallback translation works");
  console.assert(routes.includes("profile") && routes.includes("settings"), "Main routes exist");
  console.assert(theme.name === "Pure Black", "Pure black theme is default");
}
runTests();

function Icon({ name, size = 22, className = "" }) {
  const icons = {
    home: "⌂", search: "⌕", play: "▶", stats: "▥", chart: "⇈", shield: "⬟", users: "♟", plus: "+", crown: "♛",
    trophy: "◆", map: "▤", server: "▦", settings: "⚙", inventory: "▣", missions: "◎", crosshair: "⊕", theme: "◒", language: "文", swords: "✕", admin: "▣", database: "▥"
  };
  return <span className={`inline-flex items-center justify-center font-black select-none ${className}`} style={{ width: size, height: size, fontSize: size * 0.9 }}>{icons[name] || "•"}</span>;
}

function goTo(setPage, page, message) {
  setPage(page);
  if (message) window.setTimeout(() => alert(message), 50);
}

function Avatar({ seed = "dn", size = "h-10 w-10" }) {
  return <div className={`${size} rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xs font-black text-white`}>{seed.slice(0, 2).toUpperCase()}</div>;
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
  const cls = dark ? "bg-zinc-950 hover:bg-zinc-900" : theme.button;
  return <ClickButton onClick={onClick} className={`${cls} px-4 py-3 rounded-xl font-black border border-zinc-800 text-white`}>{children}</ClickButton>;
}

function TopNav({ page, setPage, language }) {
  const topLinks = ["matchmaking", "play", "tournaments", "league", "maps", "servers", "admin"];
  return (
    <div className="h-[60px] bg-black border-b border-zinc-900 flex items-center justify-between px-6">
      <ClickButton onClick={() => goTo(setPage, "matchmaking")} className="flex items-center gap-4">
        <div className="text-white font-black text-2xl">DNG</div>
        <div className="bg-black text-white rounded-full h-11 w-11 flex items-center justify-center text-xs font-black border border-zinc-800">CS2</div>
        <span className="text-white font-semibold">EU</span>
      </ClickButton>
      <div className="flex items-center gap-7 text-xs font-black uppercase tracking-wide">
        {topLinks.map((key) => (
          <ClickButton key={key} onClick={() => goTo(setPage, key)} className={`h-[60px] border-b-2 ${page === key ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-white"}`}>
            {t(language, key)}
          </ClickButton>
        ))}
      </div>
      <div className="flex items-center gap-3 text-zinc-300">
        <ClickButton onClick={() => goTo(setPage, "anticheat")} className="hover:text-white"><Icon name="shield" /></ClickButton>
        <ClickButton onClick={() => goTo(setPage, "settings")} className="hover:text-white"><Icon name="theme" /></ClickButton>
        <ClickButton onClick={() => goTo(setPage, "profile")}><Avatar seed="skwizzy" /></ClickButton>
      </div>
    </div>
  );
}

function LeftSidebar({ page, setPage, language }) {
  return (
    <aside className="w-20 bg-black border-r border-zinc-900 flex flex-col items-center py-4 gap-3">
      {routes.filter((key) => key !== "servers").map((key) => (
        <ClickButton key={key} title={t(language, key)} onClick={() => goTo(setPage, key)} className={`h-12 w-12 rounded-xl flex items-center justify-center border ${page === key ? "bg-zinc-950 text-white border-zinc-700" : "bg-black text-zinc-500 border-transparent hover:bg-zinc-950 hover:text-white"}`}>
          <Icon name={routeIcons[key]} />
        </ClickButton>
      ))}
    </aside>
  );
}

function RightBar({ setPage, language }) {
  const buttons = ["profile", "friends", "inventory", "missions", "anticheat", "settings", "admin"];
  return (
    <aside className="w-16 bg-black border-l border-zinc-900 flex flex-col items-center py-4 gap-5 text-zinc-300">
      <ClickButton onClick={() => goTo(setPage, "profile")}><Avatar seed="dn" size="h-11 w-11" /></ClickButton>
      {buttons.map((key) => <ClickButton key={key} onClick={() => goTo(setPage, key)} className="hover:text-white" title={t(language, key)}><Icon name={routeIcons[key]} /></ClickButton>)}
    </aside>
  );
}

function ProfilePage({ setPage, language }) {
  const badges = language === "Русский" ? ["Steam подключён", "Верификация пройдена", "Античит готов", "EU сервер"] : ["Steam connected", "Verified", "Anticheat ready", "EU server"];
  const matches = ["Mirage • Win • 16:12", "Dust II • Lose • 11:13", "Inferno • Win • 13:9", "Nuke • Win • 13:7"];
  return (
    <main className="flex-1 overflow-auto bg-black text-white p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-[360px_1fr] gap-6">
        <section className="rounded-3xl bg-black border border-zinc-900 p-7">
          <div className="flex flex-col items-center text-center">
            <Avatar seed="skwizzy22" size="h-32 w-32" />
            <h1 className="text-3xl font-black mt-5">skwizzy22</h1>
            <p className="text-zinc-500">team_skwizzy22 • Russia</p>
            <div className="mt-4 px-4 py-2 rounded-full bg-black border border-zinc-800 text-white font-black">Level 1 • {t(language, "rankless")}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-7 text-center">
            {[["57%", "Winrate"], ["1.21", "K/D"], ["42%", "HS"], ["0", "ELO"]].map(([num, label]) => <div key={label} className="bg-zinc-950 rounded-2xl p-4 border border-zinc-900"><b>{num}</b><p className="text-xs text-zinc-500">{label}</p></div>)}
          </div>
          <div className="flex gap-3 mt-6">
            <ActionButton onClick={() => alert(t(language, "friendRequest"))}>{t(language, "friends")}</ActionButton>
            <ActionButton dark onClick={() => goTo(setPage, "settings")}>{t(language, "settings")}</ActionButton>
          </div>
        </section>
        <section className="space-y-6">
          <div className="rounded-3xl bg-black border border-zinc-900 p-7">
            <h2 className="text-2xl font-black mb-4">{t(language, "playerProfile")}</h2>
            <p className="text-zinc-500">{language === "Русский" ? "Здесь можно смотреть аватар, статистику, последние матчи, достижения, инвентарь и информацию о CS2 аккаунте." : "Here you can view avatar, statistics, latest matches, achievements, inventory and CS2 account info."}</p>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {badges.map((badge) => <ClickButton key={badge} onClick={() => alert(badge)} className="bg-zinc-950 hover:bg-zinc-900 rounded-2xl p-4 text-left font-bold border border-zinc-900"><Icon name="shield" className="text-white" /><div className="mt-2">{badge}</div></ClickButton>)}
            </div>
          </div>
          <div className="rounded-3xl bg-black border border-zinc-900 p-7">
            <h2 className="text-2xl font-black mb-4">{t(language, "latestMatches")}</h2>
            {matches.map((match) => <ClickButton key={match} onClick={() => alert(`${t(language, "open")}: ${match}`)} className="w-full flex justify-between bg-zinc-950 hover:bg-zinc-900 rounded-xl p-4 mb-3 text-left border border-zinc-900"><span>{match}</span><span className="text-white">{t(language, "details")}</span></ClickButton>)}
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
    <main className="flex-1 overflow-auto bg-black text-white p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <section className="rounded-3xl bg-black border border-zinc-900 p-8">
          <Icon name="settings" size={48} className="text-white" />
          <h1 className="text-4xl font-black mt-3">{t(language, "settings")}</h1>
          <p className="text-zinc-500 mt-2">{t(language, "selectedLanguage")}: <b className="text-white">{language}</b></p>
        </section>
        <section className="rounded-3xl bg-black border border-zinc-900 p-8">
          <h2 className="text-2xl font-black mb-5"><Icon name="theme" className="text-white" /> {t(language, "themes")}</h2>
          <div className="rounded-2xl p-5 text-left border border-white bg-zinc-950">
            <div className="h-16 rounded-xl mb-4 bg-black border border-zinc-900" />
            <b>{theme.name}</b>
            <p className="text-xs text-zinc-500 mt-1">Pure static black background</p>
          </div>
        </section>
        <section className="rounded-3xl bg-black border border-zinc-900 p-8">
          <h2 className="text-2xl font-black mb-5"><Icon name="language" className="text-white" /> {t(language, "language")}</h2>
          <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder={t(language, "searchLanguage")} className="w-full bg-black border border-zinc-800 rounded-xl p-4 mb-5 outline-none focus:border-white" />
          <div className="grid grid-cols-4 gap-3 max-h-[420px] overflow-auto pr-2">
            {filteredLanguages.map((lang) => <ClickButton key={lang} onClick={() => setLanguage(lang)} className={`rounded-xl px-4 py-3 text-left border ${language === lang ? "bg-zinc-900 border-white" : "bg-black border-zinc-900 hover:bg-zinc-950"}`}>{lang}</ClickButton>)}
          </div>
          <p className="text-xs text-zinc-500 mt-4">{t(language, "languageNote")}</p>
        </section>
      </div>
    </main>
  );
}

function Matchmaking({ setPage, language }) {
  const matchTypes = language === "Русский" ? ["Стандартный матч", "Суперматч", "Premium Match"] : ["Standard Match", "Super Match", "Premium Match"];
  return (
    <main className="flex-1 overflow-auto bg-black text-white">
      <div className="bg-black text-white font-bold text-center py-3 border-b border-zinc-900">{t(language, "siteNote")}</div>
      <section className="relative min-h-[520px] px-28 py-16 bg-black">
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-black border border-zinc-800">Europe CS2 5v5 Queue</div>
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <ClickButton onClick={() => goTo(setPage, "profile")} className="h-28 w-28 rounded-full border-[12px] border-zinc-900 hover:border-white flex items-center justify-center text-5xl text-zinc-500 font-black">?</ClickButton>
            <div>
              <ClickButton onClick={() => goTo(setPage, "league")} className="text-sm bg-zinc-950 hover:bg-zinc-900 inline-block px-3 py-1 rounded-full mb-3 border border-zinc-900">{t(language, "season")}</ClickButton>
              <h1 className="text-4xl font-black">{t(language, "rankless")}</h1>
              <div className="h-1 w-[520px] bg-zinc-900 mt-4 rounded"><div className="h-1 w-16 bg-white rounded" /></div>
              <p className="text-xs text-zinc-500 mt-2">{t(language, "nineMatches")}</p>
              <ClickButton onClick={() => goTo(setPage, "profile")} className="mt-7 flex gap-3 items-center hover:text-white"><b>team_skwizzy22</b><span className="bg-zinc-950 px-3 py-2 rounded-full text-sm font-bold border border-zinc-900"><Icon name="shield" size={16} className="inline mr-1" />{t(language, "verified")}</span></ClickButton>
            </div>
          </div>
          <div className="grid gap-3 w-[640px]">
            <ClickButton onClick={() => goTo(setPage, "missions")} className="bg-black border border-zinc-900 hover:border-white rounded-xl p-4 flex items-center justify-between text-left"><div><p className="text-xs tracking-[.25em] text-zinc-500 uppercase">Season Prestige Path</p><h3 className="font-black mt-1">{t(language, "wins")}</h3><div className="h-2 w-72 bg-zinc-900 mt-3 rounded"><div className="h-2 w-16 bg-white rounded" /></div></div><b>0 / 20</b><Icon name="trophy" size={24} className="text-white" /></ClickButton>
            <ClickButton onClick={() => goTo(setPage, "settings")} className="bg-black border border-zinc-900 hover:border-white rounded-xl p-4 flex items-center justify-between text-left"><div><h3 className="font-black">{t(language, "themeLanguage")}</h3><p className="text-white mt-2 font-bold">{t(language, "settings")}</p><p className="text-xs text-zinc-500 mt-2">{language}</p></div><Icon name="settings" size={42} /></ClickButton>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-8 mt-10 max-w-6xl mx-auto">
          {[0, 1, 2, 3].map((slot) => <ClickButton key={slot} onClick={() => (slot === 2 ? goTo(setPage, "profile") : goTo(setPage, "friends"))} className="h-56 rounded-2xl border border-zinc-900 bg-black hover:border-white flex flex-col items-center justify-center">{slot === 2 ? <><Icon name="crown" size={28} className="text-white mb-3" /><Avatar seed="skwizzy22" size="h-24 w-24" /><div className="mt-3 text-white font-bold">skwizzy22</div></> : <><Icon name="plus" size={48} className="text-zinc-500" /><span className="text-xs text-zinc-500 mt-2">{t(language, "invite")}</span></>}</ClickButton>)}
          <ClickButton onClick={() => goTo(setPage, "search")} className="h-56 rounded-2xl border border-zinc-900 bg-black hover:border-white flex flex-col items-center justify-center"><Icon name="search" size={34} className="text-zinc-500 mb-3" /><b className="text-zinc-300">{t(language, "partySearch")}</b></ClickButton>
        </div>
      </section>
      <section className="px-28 -mt-10 relative z-10 pb-16">
        <div className="bg-black border border-zinc-900 rounded-t-2xl px-6 py-4 flex items-center justify-between"><ClickButton onClick={() => goTo(setPage, "play")} className="text-white flex items-center gap-2 font-bold"><Icon name="swords" /> {t(language, "matchType")}</ClickButton><ActionButton onClick={() => goTo(setPage, "play", t(language, "findMatch"))}>{t(language, "findMatch")}</ActionButton><ClickButton onClick={() => goTo(setPage, "servers")} className="text-zinc-400 hover:text-white font-bold flex items-center gap-2"><Icon name="server" /> {t(language, "servers")}</ClickButton></div>
        <div className="grid grid-cols-3 gap-5 bg-black border border-zinc-900 p-6 rounded-b-2xl">{matchTypes.map((typeName) => <ClickButton key={typeName} onClick={() => goTo(setPage, "play", `${t(language, "open")}: ${typeName}`)} className="text-left rounded-2xl bg-black border border-zinc-900 p-5 hover:-translate-y-1 hover:border-white"><h3 className="font-black text-white">{typeName} <span className="text-zinc-500 text-sm">• 5v5</span></h3><p className="text-zinc-500 text-sm mt-3">{t(language, "premium")}</p></ClickButton>)}</div>
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
    <main className="flex-1 overflow-auto bg-black text-white p-12">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-black border border-zinc-900 p-10"><Icon name={icon} size={48} className="text-white mb-5" /><h1 className="text-4xl font-black mb-3">{title}</h1><p className="text-zinc-500 max-w-2xl">{t(language, "pageDescription")}</p><div className="flex gap-3 mt-7"><ActionButton onClick={() => alert(`${title}: ${t(language, "demo")}`)}>{t(language, "mainAction")}</ActionButton><ActionButton dark onClick={() => goTo(setPage, "matchmaking")}>{t(language, "back")}</ActionButton></div></div>
        <div className="grid grid-cols-3 gap-5 mt-8">{cards.map((card, index) => <ClickButton key={card} onClick={() => alert(`${t(language, "open")}: ${card}`)} className="text-left rounded-2xl bg-black border border-zinc-900 p-6 font-bold hover:border-white hover:bg-zinc-950"><div className="text-white mb-3"><Icon name={index % 2 ? "crosshair" : icon} size={26} /></div>{card}<p className="text-xs text-zinc-500 mt-3">{t(language, "demo")}</p></ClickButton>)}</div>
      </div>
    </main>
  );
}


function AdminPage({ language }) {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [overview, setOverview] = useState({ players: 0, matches: 0, tournaments: 0 });
  const [status, setStatus] = useState("Loading database...");
  const [playerForm, setPlayerForm] = useState({ nickname: "", country: "EU", level: 1, elo: 0, winrate: 50 });
  const [matchForm, setMatchForm] = useState({ map: "Mirage", mode: "5v5 Ranked", score: "13:10", result: "Win" });
  const [tournamentForm, setTournamentForm] = useState({ title: "", prize: "XP", status: "open" });

  async function loadAdminData() {
    try {
      const [overviewRes, playersRes, matchesRes, tournamentsRes] = await Promise.all([
        fetch("/api/overview"),
        fetch("/api/players"),
        fetch("/api/matches"),
        fetch("/api/tournaments")
      ]);
      if (!overviewRes.ok || !playersRes.ok || !matchesRes.ok || !tournamentsRes.ok) {
        throw new Error("API is not responding");
      }
      setOverview(await overviewRes.json());
      setPlayers(await playersRes.json());
      setMatches(await matchesRes.json());
      setTournaments(await tournamentsRes.json());
      setStatus("SQLite database connected");
    } catch (error) {
      setStatus("Database offline. Start project with: npm run dev");
    }
  }

  useEffect(() => {
    loadAdminData();
  }, []);

  async function postJson(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      alert(body.error || "Save error");
      return;
    }
    await loadAdminData();
  }

  async function deleteRow(table, id) {
    await fetch(`/api/${table}/${id}`, { method: "DELETE" });
    await loadAdminData();
  }

  return (
    <main className="flex-1 overflow-auto bg-black text-white p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="rounded-3xl bg-black border border-zinc-900 p-8">
          <Icon name="database" size={48} className="text-white" />
          <h1 className="text-4xl font-black mt-3">{language === "Русский" ? "Админ-панель" : "Admin Panel"}</h1>
          <p className="text-zinc-500 mt-2">{status}</p>
        </section>

        <section className="grid grid-cols-3 gap-5">
          <AdminStat title="Players" value={overview.players} />
          <AdminStat title="Matches" value={overview.matches} />
          <AdminStat title="Tournaments" value={overview.tournaments} />
        </section>

        <section className="grid grid-cols-3 gap-5">
          <div className="rounded-3xl bg-black border border-zinc-900 p-6">
            <h2 className="text-xl font-black mb-4">Add player</h2>
            <input className="admin-input" placeholder="nickname" value={playerForm.nickname} onChange={(e) => setPlayerForm({ ...playerForm, nickname: e.target.value })} />
            <input className="admin-input" placeholder="country" value={playerForm.country} onChange={(e) => setPlayerForm({ ...playerForm, country: e.target.value })} />
            <input className="admin-input" type="number" placeholder="level" value={playerForm.level} onChange={(e) => setPlayerForm({ ...playerForm, level: e.target.value })} />
            <ActionButton onClick={() => postJson("/api/players", playerForm)}>Save player</ActionButton>
          </div>

          <div className="rounded-3xl bg-black border border-zinc-900 p-6">
            <h2 className="text-xl font-black mb-4">Add match</h2>
            <input className="admin-input" placeholder="map" value={matchForm.map} onChange={(e) => setMatchForm({ ...matchForm, map: e.target.value })} />
            <input className="admin-input" placeholder="score" value={matchForm.score} onChange={(e) => setMatchForm({ ...matchForm, score: e.target.value })} />
            <select className="admin-input" value={matchForm.result} onChange={(e) => setMatchForm({ ...matchForm, result: e.target.value })}>
              <option>Win</option>
              <option>Lose</option>
            </select>
            <ActionButton onClick={() => postJson("/api/matches", matchForm)}>Save match</ActionButton>
          </div>

          <div className="rounded-3xl bg-black border border-zinc-900 p-6">
            <h2 className="text-xl font-black mb-4">Add tournament</h2>
            <input className="admin-input" placeholder="title" value={tournamentForm.title} onChange={(e) => setTournamentForm({ ...tournamentForm, title: e.target.value })} />
            <input className="admin-input" placeholder="prize" value={tournamentForm.prize} onChange={(e) => setTournamentForm({ ...tournamentForm, prize: e.target.value })} />
            <select className="admin-input" value={tournamentForm.status} onChange={(e) => setTournamentForm({ ...tournamentForm, status: e.target.value })}>
              <option>open</option>
              <option>closed</option>
            </select>
            <ActionButton onClick={() => postJson("/api/tournaments", tournamentForm)}>Save tournament</ActionButton>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-5">
          <AdminTable title="Players" rows={players} columns={["id", "nickname", "country", "level", "elo"]} onDelete={(id) => deleteRow("players", id)} />
          <AdminTable title="Matches" rows={matches} columns={["id", "map", "mode", "score", "result"]} onDelete={(id) => deleteRow("matches", id)} />
          <AdminTable title="Tournaments" rows={tournaments} columns={["id", "title", "prize", "status"]} onDelete={(id) => deleteRow("tournaments", id)} />
        </section>
      </div>
    </main>
  );
}

function AdminStat({ title, value }) {
  return <div className="rounded-2xl bg-zinc-950 border border-zinc-900 p-6"><b className="text-3xl">{value}</b><p className="text-zinc-500 mt-2">{title}</p></div>;
}

function AdminTable({ title, rows, columns, onDelete }) {
  return (
    <div className="rounded-3xl bg-black border border-zinc-900 p-6 overflow-auto">
      <h2 className="text-xl font-black mb-4">{title}</h2>
      <div className="space-y-3">
        {rows.length === 0 && <p className="text-zinc-500">No data</p>}
        {rows.map((row) => (
          <div key={row.id} className="rounded-xl bg-zinc-950 border border-zinc-900 p-3 text-sm">
            {columns.map((column) => (
              <div key={column} className="flex justify-between gap-3 border-b border-zinc-900 py-1 last:border-b-0">
                <span className="text-zinc-500">{column}</span>
                <span className="text-right">{String(row[column])}</span>
              </div>
            ))}
            <ClickButton onClick={() => onDelete(row.id)} className="mt-3 w-full rounded-lg bg-red-950 hover:bg-red-900 px-3 py-2 text-white font-bold">
              Delete
            </ClickButton>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("matchmaking");
  const [language, setLanguage] = useState("Русский");
  const CurrentPage = useMemo(() => {
    if (page === "matchmaking") return () => <Matchmaking setPage={setPage} language={language} />;
    if (page === "profile") return () => <ProfilePage setPage={setPage} language={language} />;
    if (page === "settings") return () => <SettingsPage language={language} setLanguage={setLanguage} />;
    if (page === "admin") return () => <AdminPage language={language} />;
    return () => <GenericPage page={page} setPage={setPage} language={language} />;
  }, [page, language]);
  return (
    <div className="h-screen overflow-hidden font-sans bg-black" style={{ pointerEvents: "auto" }}>
      <TopNav page={page} setPage={setPage} language={language} />
      <div className="h-[calc(100vh-60px)] flex bg-black">
        <LeftSidebar page={page} setPage={setPage} language={language} />
        <CurrentPage />
        <RightBar setPage={setPage} language={language} />
      </div>
    </div>
  );
}
