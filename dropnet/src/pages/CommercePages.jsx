import { Button } from '../components/Button.jsx';
import { Card, PageHero } from '../components/Card.jsx';
import { navigate } from '../utils/router.js';

export function PremiumPage() {
  const plans = [
    ['Free', '0 ₽', 'Профиль, поиск матча, новости, задания'],
    ['Premium', '199 ₽/мес', 'Приоритетная очередь, расширенная статистика, PRO-профиль'],
    ['Team', '499 ₽/мес', 'Командная страница, заявки на турниры, аналитика команды'],
  ];

  return (
    <div className="page">
      <PageHero kicker="Pricing" title="Premium и тарифы" text="Коммерческий раздел с измеримым целевым действием: пользователь выбирает тариф и оставляет заявку на оплату." />
      <section className="cards-grid three">
        {plans.map(([name, price, text]) => (
          <Card key={name}>
            <h2>{name}</h2>
            <div className="price">{price}</div>
            <p>{text}</p>
            <Button onClick={() => navigate('feedback')}>Выбрать тариф</Button>
          </Card>
        ))}
      </section>
    </div>
  );
}

export function TournamentsPage() {
  const tournaments = [
    ['Weekend Cup', '5v5', 'Регистрация открыта'],
    ['DNG Open League', 'Командный формат', 'Скоро'],
    ['School Cyber Cup', 'Для учебных команд', 'Приём заявок'],
  ];
  return (
    <div className="page">
      <PageHero kicker="Tournaments" title="Турниры" text="Коммерческий бизнес-процесс: команда подаёт заявку на турнир и получает подтверждение." actions={<Button href="#/feedback">Подать заявку</Button>} />
      <section className="cards-grid three">
        {tournaments.map(([name, format, status]) => (
          <Card key={name}>
            <h2>{name}</h2>
            <p>{format}</p>
            <span className="pill">{status}</span>
            <Button href="#/feedback" variant="ghost">Заявка</Button>
          </Card>
        ))}
      </section>
    </div>
  );
}

export function TeamsPage() {
  const teams = [
    ['DNG Academy', '5 игроков', 'Открыт набор'],
    ['Steel Wings', '4 игрока', 'Ищут AWPer'],
    ['Night Queue', '7 игроков', 'Турнирный состав'],
  ];
  return (
    <div className="page">
      <PageHero kicker="Teams" title="Команды и клубы" text="Отдельная страница для команд: карточки, набор игроков, заявки и будущие турниры." actions={<Button href="#/feedback">Создать команду</Button>} />
      <section className="cards-grid three">
        {teams.map(([name, count, status]) => (
          <Card key={name}>
            <h2>{name}</h2>
            <p>{count}</p>
            <span className="pill">{status}</span>
            <Button href="#/feedback" variant="ghost">Подать заявку</Button>
          </Card>
        ))}
      </section>
    </div>
  );
}

export function PartnersPage() {
  return (
    <div className="page">
      <PageHero kicker="Advertising" title="Партнёрам и рекламодателям" text="Коммерческая страница для рекламных интеграций: баннеры, продвижение серверов, клубов, турниров и игровых услуг." actions={<Button href="#/feedback">Оставить рекламную заявку</Button>} />
      <section className="cards-grid three">
        {['Баннер на главной', 'Продвижение турнира', 'Партнёрская интеграция'].map((item) => (
          <Card key={item}><h2>{item}</h2><p>Рекламное размещение с заявкой через форму обратной связи.</p><Button href="#/feedback" variant="ghost">Заказать</Button></Card>
        ))}
      </section>
    </div>
  );
}
