import { useEffect, useMemo, useRef, useState } from "react";

import Layout from "./components/Layout.jsx";

import {
  adminUser,
  storageKeys,
  initialNews,
  defaultTestResults,
} from "./data/seed.js";

import { readJson, writeJson, removeKey } from "./utils/storage.js";
import { getHashRoute, navigate } from "./utils/router.js";
import { makeDailyQuests, normalizeUser, todayKey } from "./utils/game.js";

import HomePage from "./pages/HomePage.jsx";
import { LoginPage, RegisterPage } from "./pages/AuthPages.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { MatchRoomPage, PlayPage } from "./pages/MatchPages.jsx";

import {
  PremiumPage,
  TournamentsPage,
  TeamsPage,
} from "./pages/CommercePages.jsx";

import {
  NewsPage,
  FeedbackPage,
  ContactsPage,
  PrivacyPage,
  RulesPage,
  FaqPage,
} from "./pages/ContentPages.jsx";

import { TestingPage } from "./pages/ProjectPages.jsx";

import AdminPage from "./pages/AdminPage.jsx";

import {
  LeaderboardPage,
  QuestsPage,
  GenericPage,
} from "./pages/StatsPages.jsx";

import NotFoundPage from "./pages/NotFoundPage.jsx";

function loadUsers() {
  const saved = readJson(storageKeys.users, []);

  const cleaned = saved
    .filter((user) => user.username !== "admin" && user.username !== adminUser.username)
    .map(normalizeUser);

  return [normalizeUser(adminUser), ...cleaned];
}

function loadQuests() {
  const saved = readJson(storageKeys.quests, null);

  if (!saved || saved.date !== todayKey()) {
    return {
      date: todayKey(),
      quests: makeDailyQuests(),
    };
  }

  return saved;
}

export default function App() {
  const [route, setRoute] = useState(getHashRoute);

  const [users, setUsers] = useState(loadUsers);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = readJson(storageKeys.session, null);
    return saved ? normalizeUser(saved) : null;
  });

  const [tickets, setTickets] = useState(() => readJson(storageKeys.tickets, []));
  const [news, setNews] = useState(() => readJson(storageKeys.news, initialNews));
  const [matches, setMatches] = useState(() => readJson(storageKeys.matches, []));
  const [quests, setQuests] = useState(loadQuests);
  const [tests, setTests] = useState(() =>
    readJson(storageKeys.tests, defaultTestResults)
  );

  const [notifications, setNotifications] = useState([]);

  const processedMiniGameResult = useRef(null);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getHashRoute());
    };

    window.addEventListener("hashchange", onHashChange);

    if (!window.location.hash) {
      navigate("matchmaking");
    }

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    writeJson(storageKeys.users, users);
  }, [users]);

  useEffect(() => {
    writeJson(storageKeys.tickets, tickets);
  }, [tickets]);

  useEffect(() => {
    writeJson(storageKeys.news, news);
  }, [news]);

  useEffect(() => {
    writeJson(storageKeys.matches, matches);
  }, [matches]);

  useEffect(() => {
    writeJson(storageKeys.quests, quests);
  }, [quests]);

  useEffect(() => {
    writeJson(storageKeys.tests, tests);
  }, [tests]);

  useEffect(() => {
    const onMessage = (event) => {
      applyMiniGameResult(event.data);
    };

    const onStorage = (event) => {
      if (event.key !== "dng_minigame_result") {
        return;
      }

      try {
        const payload = JSON.parse(event.newValue);
        applyMiniGameResult(payload);
      } catch {
        // ignore
      }
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("storage", onStorage);

    const savedResult = localStorage.getItem("dng_minigame_result");

    if (savedResult) {
      try {
        applyMiniGameResult(JSON.parse(savedResult));
      } catch {
        // ignore
      }
    }

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("storage", onStorage);
    };
  }, [currentUser]);

  function makeUser(user) {
    return normalizeUser({
      elo: 1000,
      level: 1,
      wins: 0,
      losses: 0,
      matches: 0,
      xp: 0,
      ...user,
    });
  }

  function saveSession(user) {
    writeJson(storageKeys.session, normalizeUser(user));
  }

  function updateCurrentUser(updated) {
    const normalized = normalizeUser(updated);

    setCurrentUser(normalized);
    saveSession(normalized);

    setUsers((prev) =>
      prev.map((user) =>
        user.username === normalized.username ? normalized : user
      )
    );
  }

  function logout() {
    setCurrentUser(null);
    removeKey(storageKeys.session);
    navigate("matchmaking");
  }

  function notify(text) {
    setNotifications((prev) => [{ id: Date.now(), text }, ...prev].slice(0, 8));
  }

  function markQuest(type, amount) {
    let reward = 0;

    setQuests((prev) => {
      const updated = prev.quests.map((quest) => {
        if (quest.type !== type || quest.completed) {
          return quest;
        }

        const progress = Math.min(quest.goal, quest.progress + amount);
        const completed = progress >= quest.goal;

        if (completed) {
          reward += quest.reward;
        }

        return {
          ...quest,
          progress,
          completed,
        };
      });

      return {
        ...prev,
        quests: updated,
      };
    });

    if (reward > 0 && currentUser) {
      updateCurrentUser({
        ...currentUser,
        xp: currentUser.xp + reward,
      });

      notify(`Задание выполнено: +${reward} XP`);
    }
  }

  function applyMiniGameResult(payload) {
    if (!payload || payload.type !== "DNG_GAME_RESULT") {
      return;
    }

    if (!currentUser) {
      return;
    }

    const resultId = `${payload.result}-${payload.eloChange}-${payload.kills}-${payload.createdAt}`;

    if (processedMiniGameResult.current === resultId) {
      return;
    }

    processedMiniGameResult.current = resultId;

    const eloChange = Number(payload.eloChange || 0);
    const isWin = payload.result === "win";
    const isLose = payload.result === "lose";

    const updatedUser = normalizeUser({
      ...currentUser,
      elo: Math.max(100, currentUser.elo + eloChange),
      wins: currentUser.wins + (isWin ? 1 : 0),
      losses: currentUser.losses + (isLose ? 1 : 0),
      matches: currentUser.matches + 1,
      xp: currentUser.xp + (isWin ? 60 : 25),
    });

    updateCurrentUser(updatedUser);

    const match = {
      id: Date.now(),
      map: "DNG Aim Mission",
      server: "Browser Mini Game",
      result: isWin ? "Win" : "Lose",
      score: `${payload.kills || 0} kills`,
      eloChange,
      createdAt: payload.createdAt || new Date().toLocaleString("ru-RU"),
    };

    setMatches((prev) => [match, ...prev].slice(0, 30));

    markQuest("matches", 1);

    if (isWin) {
      markQuest("wins", 1);
    }

    if (eloChange > 0) {
      markQuest("elo", eloChange);
    }

    notify(
      `Мини-игра: ${isWin ? "победа" : "поражение"}, ${
        eloChange > 0 ? "+" : ""
      }${eloChange} ELO`
    );

    try {
      localStorage.removeItem("dng_minigame_result");
    } catch {
      // ignore
    }
  }

  function startMatchSearch() {
    if (!currentUser) {
      navigate("login");
      return;
    }

    const gameUrl = `${window.location.origin}${import.meta.env.BASE_URL}cs2-minigame.html`;

    const gameWindow = window.open(
      gameUrl,
      "dng-cs2-minigame",
      "width=1280,height=760,menubar=no,toolbar=no,location=no,status=no"
    );

    if (!gameWindow) {
      alert("Браузер заблокировал окно игры. Разреши всплывающие окна для сайта.");
      return;
    }

    notify("Мини-игра открыта в отдельном окне");
  }

  const page = useMemo(() => {
    switch (route) {
      case "matchmaking":
        return (
          <HomePage
            user={currentUser}
            quests={quests}
            matches={matches}
            onStartMatch={startMatchSearch}
          />
        );

      case "login":
        return (
          <LoginPage
            users={users}
            setCurrentUser={setCurrentUser}
            saveSession={saveSession}
          />
        );

      case "register":
        return (
          <RegisterPage
            users={users}
            setUsers={setUsers}
            setCurrentUser={setCurrentUser}
            saveSession={saveSession}
            makeUser={makeUser}
          />
        );

      case "profile":
        return (
          <ProfilePage
            user={currentUser}
            matches={matches}
            tickets={tickets}
          />
        );

      case "play":
        return <PlayPage onStartMatch={startMatchSearch} />;

      case "match-room":
        return (
          <MatchRoomPage
            user={currentUser}
            matches={matches}
            onStartMatch={startMatchSearch}
          />
        );

      case "premium":
        return <PremiumPage />;

      case "tournaments":
        return <TournamentsPage />;

      case "teams":
        return <TeamsPage />;

      case "leaderboard":
        return (
          <LeaderboardPage
            users={users}
            currentUser={currentUser}
          />
        );

      case "quests":
        return <QuestsPage quests={quests} />;

      case "news":
        return (
          <NewsPage
            news={news}
            markQuest={markQuest}
          />
        );

      case "feedback":
        return (
          <FeedbackPage
            currentUser={currentUser}
            tickets={tickets}
            setTickets={setTickets}
            markQuest={markQuest}
          />
        );

      case "contacts":
        return <ContactsPage />;

      case "privacy":
        return <PrivacyPage />;

      case "rules":
        return <RulesPage />;

      case "faq":
        return <FaqPage />;

      case "testing":
        return <TestingPage tests={tests} />;

      case "admin":
        return (
          <AdminPage
            currentUser={currentUser}
            users={users}
            setUsers={setUsers}
            tickets={tickets}
            setTickets={setTickets}
            news={news}
            setNews={setNews}
            tests={tests}
            setTests={setTests}
          />
        );

      case "not-found":
        return <NotFoundPage />;

      case "servers":
        return (
          <GenericPage
            title="Серверы"
            text="Страница серверов: список регионов, задержка, статус и подключение к матчам."
          />
        );

      case "settings":
        return (
          <GenericPage
            title="Настройки"
            text="Страница настроек аккаунта, темы, языка и уведомлений."
          />
        );

      case "friends":
        return (
          <GenericPage
            title="Друзья"
            text="Раздел друзей, группы, приглашения и поиск игроков."
          />
        );

      case "inventory":
        return (
          <GenericPage
            title="Инвентарь"
            text="Отдельная страница инвентаря и наград профиля."
          />
        );

      case "search":
        return (
          <GenericPage
            title="Поиск"
            text="Раздел поиска игроков, команд, турниров и новостей."
          />
        );

      case "maps":
        return (
          <GenericPage
            title="Карты"
            text="Отдельная страница карт CS2, режимов, статистики и информации о маппуле."
          />
        );

      case "anticheat":
        return (
          <GenericPage
            title="Античит"
            text="Страница статуса античита, проверки клиента и правил честной игры."
          />
        );

      case "stats":
        return (
          <GenericPage
            title="Статистика"
            text="Страница статистики игрока: ELO, K/D, winrate, матчи и прогресс."
          />
        );

      case "league":
        return (
          <GenericPage
            title="Лига"
            text="Страница лиги, дивизионов, сезонов и рейтинговых наград."
          />
        );

      default:
        return <NotFoundPage />;
    }
  }, [route, currentUser, users, tickets, news, matches, quests, tests]);

  return (
    <Layout
      route={route}
      currentUser={currentUser}
      onLogout={logout}
      notifications={notifications}
    >
      {page}
    </Layout>
  );
}