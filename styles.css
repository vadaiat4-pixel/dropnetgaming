import { Card, PageHero } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { botNames } from '../data/seed.js';
import { normalizeUser } from '../utils/game.js';

export function LeaderboardPage({ users, currentUser }) {
  const bots = botNames.map((name, index) => normalizeUser({ username: name, nickname: name, role: 'bot', elo: 2150 - index * 95, wins: 80 - index * 4, losses: 20 + index, matches: 100 + index * 3, xp: 1500 - index * 75 }));
  const leaders = [...users.map(normalizeUser), ...bots].sort((a, b) => b.elo - a.elo).slice(0, 20);

  return (
    <div className="page">
      <PageHero kicker="Leaderboard" title="Лидерборд" text="Топ игроков по ELO. Твой аккаунт тоже попадает в таблицу." />
      <Card className="table-card">
        <table>
          <thead><tr><th>#</th><th>Игрок</th><th>ELO</th><th>Level</th><th>Победы</th><th>Матчи</th></tr></thead>
          <tbody>{leaders.map((user, index) => <tr key={`${user.username}-${index}`} className={currentUser?.username === user.username ? 'selected-row' : ''}><td>#{index + 1}</td><td>{user.nickname || user.username}</td><td>{user.elo}</td><td>{user.level}</td><td>{user.wins}</td><td>{user.matches}</td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}

export function QuestsPage({ quests }) {
  return (
    <div className="page">
      <PageHero kicker="Daily quests" title="Ежедневные задания" text="Задания автоматически обновляются каждый день. За выполнение начисляется XP." />
      <section className="cards-grid three">
        {quests.quests.map((quest) => (
          <Card key={quest.id}>
            <div className="card-head"><h2>{quest.title}</h2><span>{quest.completed ? 'ГОТОВО' : `${quest.progress}/${quest.goal}`}</span></div>
            <div className="progress"><span style={{ width: `${Math.min(100, (quest.progress / quest.goal) * 100)}%` }} /></div>
            <p>Награда: +{quest.reward} XP</p>
          </Card>
        ))}
      </section>
    </div>
  );
}

export function GenericPage({ title, text }) {
  return (
    <div className="page">
      <PageHero kicker="Site section" title={title} text={text || 'Отдельная страница сайта: раздел не является частью одной длинной страницы и работает как самостоятельный экран.'} actions={<Button href="#/matchmaking">На главную</Button>} />
      <section className="cards-grid three">
        {['Основной блок', 'Фильтр / карточки', 'Действие'].map((item) => <Card key={item}><h2>{item}</h2><p>Раздел подготовлен как отдельный экран многостраничной структуры.</p></Card>)}
      </section>
    </div>
  );
}
