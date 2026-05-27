import { Button } from '../components/Button.jsx';
import { Card, PageHero, StatCard } from '../components/Card.jsx';

export default function ProfilePage({ user, matches, tickets }) {
  const profile = user || { username: 'guest', nickname: 'Гость', role: 'guest', elo: 1000, level: 1, wins: 0, losses: 0, matches: 0, xp: 0 };
  const userTickets = tickets.filter((ticket) => ticket.author === profile.nickname || ticket.author === profile.username);

  return (
    <div className="page profile-grid">
      <Card className="profile-main">
        <div className="avatar-xl">{(profile.nickname || profile.username).slice(0, 2).toUpperCase()}</div>
        <h1>{profile.nickname || profile.username}</h1>
        <p>@{profile.username} • {profile.role}</p>
        <span className="pill">Level {profile.level} • {profile.elo} ELO</span>
        <div className="stats-grid two">
          <StatCard value={profile.wins} label="Побед" />
          <StatCard value={profile.losses} label="Поражений" />
          <StatCard value={profile.matches} label="Матчей" />
          <StatCard value={profile.xp} label="XP" />
        </div>
        <div className="actions-row center"><Button href="#/settings">Настройки</Button><Button href="#/teams" variant="ghost">Команды</Button></div>
      </Card>

      <div className="profile-side">
        <PageHero kicker="Player profile" title="Личный кабинет" text="Страница пользователя: статистика, ELO, последние матчи, обращения, профиль и быстрые действия." />
        <Card>
          <h2>Последние матчи</h2>
          {matches.length === 0 && <p className="muted">Матчей пока нет. Нажми “НАЙТИ МАТЧ”.</p>}
          {matches.slice(0, 8).map((match) => (
            <div key={match.id} className="list-row">
              <div><strong>{match.map} • {match.result}</strong><span>{match.server} • {match.score} • {match.createdAt}</span></div>
              <b className={match.eloChange >= 0 ? 'good' : 'bad'}>{match.eloChange >= 0 ? '+' : ''}{match.eloChange} ELO</b>
            </div>
          ))}
        </Card>

        <Card>
          <h2>Мои обращения</h2>
          {userTickets.length === 0 && <p className="muted">У тебя пока нет обращений.</p>}
          {userTickets.map((ticket) => (
            <div key={ticket.id} className="list-row">
              <div><strong>{ticket.subject}</strong><span>{ticket.message}</span></div>
              <b>{ticket.status}</b>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
