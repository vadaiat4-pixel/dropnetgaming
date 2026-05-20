import { Button } from '../components/Button.jsx';
import { Card, PageHero } from '../components/Card.jsx';

function TeamCard({ title, players }) {
  return (
    <Card>
      <h2>{title}</h2>
      {players.map((player) => (
        <div key={player} className="player-row">
          <span className="avatar-sm">{player.slice(0, 2).toUpperCase()}</span>
          <strong>{player}</strong>
          <span className="ready">готов</span>
        </div>
      ))}
    </Card>
  );
}

export function MatchRoomPage({ user, matches, onStartMatch }) {
  const last = matches[0];
  const teamA = [user?.nickname || 'skwizzy22', 'aimlord', 'rushb', 'smokemaster', 'entrygod'];
  const teamB = ['clutchking', 'deagleman', 'awpghost', 'pixelhunter', 'ninjadefuse'];

  return (
    <div className="page">
      <PageHero
        kicker="Match room"
        title="Комната матча"
        text="Отдельная страница найденного матча: команды, карта, сервер, принятие матча и результат. Это уже не одностраничник, а полноценный игровой раздел."
        actions={<Button onClick={onStartMatch}>Запустить поиск</Button>}
      />

      <section className="match-room-grid">
        <TeamCard title="Team A" players={teamA} />
        <Card className="match-center-card">
          <span className="muted-label">Карта</span>
          <h2>{last?.map || 'Mirage'}</h2>
          <p>Сервер: {last?.server || 'EU Germany'}</p>
          <p>Статус: {last ? 'Матч завершён' : 'Ожидание игроков'}</p>
          <div className="score-box">{last ? `${last.result} • ${last.score}` : 'Ожидается принятие'}</div>
        </Card>
        <TeamCard title="Team B" players={teamB} />
      </section>
    </div>
  );
}

export function PlayPage({ onStartMatch }) {
  return (
    <div className="page">
      <PageHero kicker="Play" title="Играть" text="Отдельная игровая страница: выбор режима, поиск матча, кастомные комнаты и тренировочные сценарии." actions={<Button onClick={onStartMatch}>Найти матч</Button>} />
      <section className="cards-grid three">
        {['5v5 Ranked', 'Premium Queue', 'Custom Lobby', 'Aim Training', 'Retake', 'Wingman'].map((mode) => (
          <Card key={mode}>
            <h2>{mode}</h2>
            <p>Кликабельный режим игрового раздела. В рабочем backend здесь будет API очереди.</p>
            <Button onClick={onStartMatch} variant="ghost">Запустить</Button>
          </Card>
        ))}
      </section>
    </div>
  );
}
