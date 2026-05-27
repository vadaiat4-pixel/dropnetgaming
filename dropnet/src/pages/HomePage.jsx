import { Button } from '../components/Button.jsx';
import { Card, StatCard } from '../components/Card.jsx';
import Icon from '../components/Icon.jsx';
import { navigate } from '../utils/router.js';

export default function HomePage({ user, quests, matches, onStartMatch }) {
  const player = user || { nickname: 'Гость', username: 'guest', level: 1, elo: 1000, wins: 0, matches: 0, xp: 0 };
  const questDone = quests.quests.filter((quest) => quest.completed).length;

  return (
    <div className="page home-page">
      <div className="strip">DROP NET GAMING • CS2 PROJECT • STEEL WINGS ARENA</div>

      <section className="hero-layout">
        <div className="hero-player">
          <button className="level-ring" type="button" onClick={() => navigate('profile')}>{player.level}</button>
          <div>
            <span className="pill">ELO {player.elo}</span>
            <h1>Level {player.level}</h1>
            <div className="progress"><span style={{ width: `${Math.min(100, (player.elo % 200) / 2)}%` }} /></div>
            <p>Побед: {player.wins} • Матчей: {player.matches} • XP: {player.xp}</p>
            <button className="verified" type="button" onClick={() => navigate('profile')}>
              {player.nickname || player.username} <span>⬟ Верификация пройдена</span>
            </button>
          </div>
        </div>

        <div className="hero-showcase" aria-label="DNG character logo">
          <img src={`${import.meta.env.BASE_URL}hero-dng-character.png`} alt="DNG персонаж с крыльями и ножом" />
          <div className="hero-showcase-badge">DNG • CS2</div>
        </div>

        <div className="hero-widgets">
          <Card>
            <div className="widget-row">
              <div>
                <span className="muted-label">DAILY QUESTS</span>
                <h3>{questDone}/{quests.quests.length} заданий выполнено</h3>
                <div className="progress"><span style={{ width: `${(questDone / quests.quests.length) * 100}%` }} /></div>
              </div>
              <Icon name="trophy" size={30} />
            </div>
          </Card>

          <Card>
            <div className="widget-row">
              <div>
                <h3>ELO и уровни</h3>
                <button className="text-link" type="button" onClick={() => navigate('leaderboard')}>Открыть лидерборд</button>
                <p>Последних матчей: {matches.length}</p>
              </div>
              <Icon name="chart" size={36} />
            </div>
          </Card>
        </div>
      </section>

      <section className="party-grid">
        {[0, 1, 2, 3].map((slot) => (
          <button key={slot} className="party-card" type="button" onClick={() => navigate(slot === 2 ? 'profile' : 'teams')}>
            {slot === 2 ? (
              <>
                <Icon name="crown" />
                <div className="avatar-big">{(player.nickname || player.username).slice(0, 2).toUpperCase()}</div>
                <strong>{player.nickname || player.username}</strong>
              </>
            ) : (
              <>
                <span className="plus">+</span>
                <span>Пригласить</span>
              </>
            )}
          </button>
        ))}
        <button className="party-card" type="button" onClick={() => navigate('teams')}>
          <Icon name="search" size={34} />
          <strong>Поиск группы</strong>
        </button>
      </section>

      <section className="match-panel">
        <div className="match-panel-head">
          <button className="text-link" type="button" onClick={() => navigate('play')}>✕ Тип матча</button>
          <Button onClick={onStartMatch}>НАЙТИ МАТЧ</Button>
          <button className="text-link" type="button" onClick={() => navigate('servers')}>▥ Серверы</button>
        </div>
        <div className="match-types">
          {['Стандартный матч', 'Суперматч', 'Premium Match'].map((type) => (
            <button key={type} className="match-type" type="button" onClick={onStartMatch}>
              <strong>{type} • 5v5</strong>
              <span>Premium подбор • Античит • Карты CS2</span>
            </button>
          ))}
        </div>
      </section>

      <section className="commercial-grid">
        <Card>
          <span className="muted-label">Commercial goal</span>
          <h2>Как сайт зарабатывает</h2>
          <p>Dropnetgaming — коммерческая CS2-платформа. Целевые действия: регистрация, поиск матча, оформление Premium, заявка на турнир, обращение и рекламная заявка.</p>
          <div className="actions-row">
            <Button href="#/register">Регистрация</Button>
            <Button href="#/premium" variant="ghost">Premium</Button>
            <Button href="#/feedback" variant="ghost">Оставить заявку</Button>
          </div>
        </Card>
        <Card>
          <span className="muted-label">Trust block</span>
          <h2>Блок доверия</h2>
          <div className="mini-list">
            {['Контакты', 'Политика', 'Правила', 'FAQ', 'Админ-панель', 'Тестирование'].map((item) => <span key={item}>✓ {item}</span>)}
          </div>
        </Card>
      </section>
    </div>
  );
}
