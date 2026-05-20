import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import { Button } from './components/Button.jsx';
import { adminUser, storageKeys, initialNews, defaultTestResults, maps } from './data/seed.js';
import { readJson, writeJson, removeKey } from './utils/storage.js';
import { getHashRoute, navigate } from './utils/router.js';
import { makeDailyQuests, normalizeUser, todayKey } from './utils/game.js';
import HomePage from './pages/HomePage.jsx';
import { LoginPage, RegisterPage } from './pages/AuthPages.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { MatchRoomPage, PlayPage } from './pages/MatchPages.jsx';
import { PremiumPage, TournamentsPage, TeamsPage } from './pages/CommercePages.jsx';
import { NewsPage, FeedbackPage, ContactsPage, PrivacyPage, RulesPage, FaqPage } from './pages/ContentPages.jsx';
import { TestingPage } from './pages/ProjectPages.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { LeaderboardPage, QuestsPage, GenericPage } from './pages/StatsPages.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function loadUsers() {
  const saved = readJson(storageKeys.users, []);
  const cleaned = saved.filter((user) => user.username !== 'admin' && user.username !== adminUser.username).map(normalizeUser);
  return [normalizeUser(adminUser), ...cleaned];
}

function loadQuests() {
  const saved = readJson(storageKeys.quests, null);
  if (!saved || saved.date !== todayKey()) return { date: todayKey(), quests: makeDailyQuests() };
  return saved;
}

function MatchModal({ state, onCancel }) {
  if (!state.active && !state.found) return null;
  return (
    <div className="modal-backdrop">
      <section className="modal-card">
        <div className="modal-head">
          <h2>{state.found ? 'Матч найден!' : 'Поиск матча...'}</h2>
          <button type="button" onClick={onCancel}>Закрыть</button>
        </div>
        <div className="modal-progress">
          <div className="modal-count">{state.players}/10</div>
          <div className="progress"><span style={{ width: `${state.players * 10}%` }} /></div>
          <p>{state.message}</p>
        </div>
        {state.match && (
          <div className="modal-stats">
            <span><b>{state.match.map}</b>Карта</span>
            <span><b>{state.match.server}</b>Сервер</span>
            <span><b>{state.match.eloChange > 0 ? '+' : ''}{state.match.eloChange}</b>ELO</span>
          </div>
        )}
      </section>
    </div>
  );
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
  const [tests, setTests] = useState(() => readJson(storageKeys.tests, defaultTestResults));
  const [notifications, setNotifications] = useState([]);
  const [matchState, setMatchState] = useState({ active: false, found: false, players: 0, message: '', match: null });

  useEffect(() => {
    const onHashChange = () => setRoute(getHashRoute());
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) navigate('matchmaking');
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => writeJson(storageKeys.users, users), [users]);
  useEffect(() => writeJson(storageKeys.tickets, tickets), [tickets]);
  useEffect(() => writeJson(storageKeys.news, news), [news]);
  useEffect(() => writeJson(storageKeys.matches, matches), [matches]);
  useEffect(() => writeJson(storageKeys.quests, quests), [quests]);
  useEffect(() => writeJson(storageKeys.tests, tests), [tests]);

  function makeUser(user) {
    return normalizeUser({ elo: 1000, level: 1, wins: 0, losses: 0, matches: 0, xp: 0, ...user });
  }

  function saveSession(user) {
    writeJson(storageKeys.session, normalizeUser(user));
  }

  function updateCurrentUser(updated) {
    const normalized = normalizeUser(updated);
    setCurrentUser(normalized);
    saveSession(normalized);
    setUsers((prev) => prev.map((user) => (user.username === normalized.username ? normalized : user)));
  }

  function logout() {
    setCurrentUser(null);
    removeKey(storageKeys.session);
    navigate('matchmaking');
  }

  function notify(text) {
    setNotifications((prev) => [{ id: Date.now(), text }, ...prev].slice(0, 8));
  }

  function markQuest(type, amount) {
    let reward = 0;
    setQuests((prev) => {
      const updated = prev.quests.map((quest) => {
        if (quest.type !== type || quest.completed) return quest;
        const progress = Math.min(quest.goal, quest.progress + amount);
        const completed = progress >= quest.goal;
        if (completed) reward += quest.reward;
        return { ...quest, progress, completed };
      });
      return { ...prev, quests: updated };
    });

    if (reward > 0 && currentUser) {
      updateCurrentUser({ ...currentUser, xp: currentUser.xp + reward });
      notify(`Задание выполнено: +${reward} XP`);
    }
  }

  function finishMatch() {
    const map = maps[Math.floor(Math.random() * maps.length)];
    const win = Math.random() > 0.42;
    const eloChange = win ? 24 + Math.floor(Math.random() * 12) : -(14 + Math.floor(Math.random() * 10));
    const score = win ? `13-${7 + Math.floor(Math.random() * 5)}` : `${8 + Math.floor(Math.random() * 4)}-13`;
    const player = currentUser;
    const match = { id: Date.now(), map, server: 'EU Germany', result: win ? 'Win' : 'Lose', score, eloChange, createdAt: new Date().toLocaleString('ru-RU') };

    setMatches((prev) => [match, ...prev].slice(0, 30));

    if (player) {
      updateCurrentUser({ ...player, elo: Math.max(100, player.elo + eloChange), wins: player.wins + (win ? 1 : 0), losses: player.losses + (win ? 0 : 1), matches: player.matches + 1, xp: player.xp + (win ? 45 : 20) });
    }

    markQuest('matches', 1);
    if (win) markQuest('wins', 1);
    if (eloChange > 0) markQuest('elo', eloChange);
    notify(`Матч завершён: ${match.result}, ${eloChange > 0 ? '+' : ''}${eloChange} ELO`);
    setMatchState({ active: false, found: true, players: 10, message: 'Матч найден и завершён в демо-режиме', match });
  }

  function startMatchSearch() {
    if (!currentUser) {
      navigate('login');
      return;
    }
    setMatchState({ active: true, found: false, players: 1, message: 'Подключаемся к очереди...', match: null });
    const steps = [[3, 'Ищем игроков твоего уровня...'], [5, 'Проверяем сервер и античит...'], [8, 'Собираем команды...'], [10, 'Матч найден!']];
    steps.forEach(([players, message], index) => {
      window.setTimeout(() => setMatchState((prev) => ({ ...prev, players, message })), 850 * (index + 1));
    });
    window.setTimeout(finishMatch, 4300);
  }

  const page = useMemo(() => {
    switch (route) {
      case 'matchmaking': return <HomePage user={currentUser} quests={quests} matches={matches} onStartMatch={startMatchSearch} />;
      case 'login': return <LoginPage users={users} setCurrentUser={setCurrentUser} saveSession={saveSession} />;
      case 'register': return <RegisterPage users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} saveSession={saveSession} makeUser={makeUser} />;
      case 'profile': return <ProfilePage user={currentUser} matches={matches} tickets={tickets} />;
      case 'play': return <PlayPage onStartMatch={startMatchSearch} />;
      case 'match-room': return <MatchRoomPage user={currentUser} matches={matches} onStartMatch={startMatchSearch} />;
      case 'premium': return <PremiumPage />;
      case 'tournaments': return <TournamentsPage />;
      case 'teams': return <TeamsPage />;
      case 'leaderboard': return <LeaderboardPage users={users} currentUser={currentUser} />;
      case 'quests': return <QuestsPage quests={quests} />;
      case 'news': return <NewsPage news={news} markQuest={markQuest} />;
      case 'feedback': return <FeedbackPage currentUser={currentUser} tickets={tickets} setTickets={setTickets} markQuest={markQuest} />;
      case 'contacts': return <ContactsPage />;
      case 'privacy': return <PrivacyPage />;
      case 'rules': return <RulesPage />;
      case 'faq': return <FaqPage />;
      case 'testing': return <TestingPage tests={tests} />;
      case 'admin': return <AdminPage currentUser={currentUser} users={users} setUsers={setUsers} tickets={tickets} setTickets={setTickets} news={news} setNews={setNews} tests={tests} setTests={setTests} />;
      case 'not-found': return <NotFoundPage />;
      case 'servers': return <GenericPage title="Серверы" text="Страница серверов: список регионов, задержка, статус и подключение к матчам." />;
      case 'settings': return <GenericPage title="Настройки" text="Страница настроек аккаунта, темы, языка и уведомлений." />;
      case 'friends': return <GenericPage title="Друзья" text="Раздел друзей, группы, приглашения и поиск игроков." />;
      case 'inventory': return <GenericPage title="Инвентарь" text="Отдельная страница инвентаря и наград профиля." />;
      case 'search': return <GenericPage title="Поиск" text="Раздел поиска игроков, команд, турниров и новостей." />;
      default: return <NotFoundPage />;
    }
  }, [route, currentUser, users, tickets, news, matches, quests, tests]);

  return (
    <>
      <MatchModal state={matchState} onCancel={() => setMatchState({ active: false, found: false, players: 0, message: '', match: null })} />
      <Layout route={route} currentUser={currentUser} onLogout={logout} notifications={notifications}>
        {page}
      </Layout>
    </>
  );
}
