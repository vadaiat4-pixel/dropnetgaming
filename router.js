import { useEffect, useState } from 'react';
import { Button } from '../components/Button.jsx';
import { Card, PageHero } from '../components/Card.jsx';

export function NewsPage({ news, markQuest }) {
  useEffect(() => {
    markQuest('news', 1);
  }, []);

  return (
    <div className="page">
      <PageHero kicker="News feed" title="Новости CS2 и игр" text="Новости добавляются через админ-панель и сразу появляются на сайте." actions={<Button href="#/feedback">Предложить новость</Button>} />
      <section className="cards-grid three">
        {news.map((item) => (
          <Card key={item.id}>
            <div className="card-head"><span className="pill">{item.tag}</span>{item.hot && <span className="hot">HOT</span>}</div>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <span className="muted-label">{item.createdAt}</span>
          </Card>
        ))}
      </section>
    </div>
  );
}

export function FeedbackPage({ currentUser, tickets, setTickets, markQuest }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  function submit(event) {
    event.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setStatus('Заполни тему и текст обращения');
      return;
    }
    const ticket = {
      id: Date.now(),
      subject: subject.trim(),
      message: message.trim(),
      author: currentUser?.nickname || currentUser?.username || 'Гость',
      createdAt: new Date().toLocaleString('ru-RU'),
      status: 'Новое',
    };
    setTickets((prev) => [ticket, ...prev]);
    markQuest('feedback', 1);
    setSubject('');
    setMessage('');
    setStatus('Обращение отправлено администраторам');
  }

  return (
    <div className="page narrow-page">
      <PageHero kicker="Request form" title="Обратная связь" text="Форма заявки: проблема, предложение, жалоба, турнирная или партнёрская заявка. Обращение попадёт в админ-панель." />
      <form className="form-card" onSubmit={submit}>
        <label>Тема обращения<input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Например: заявка на турнир" /></label>
        <label>Текст обращения<textarea value={message} onChange={(event) => setMessage(event.target.value)} rows="7" placeholder="Опиши запрос подробно..." /></label>
        {status && <div className="success-box">{status}</div>}
        <Button type="submit">Отправить обращение</Button>
      </form>
      {tickets.length > 0 && <Card><h2>Последние обращения</h2>{tickets.slice(0, 4).map((ticket) => <div key={ticket.id} className="list-row"><div><strong>{ticket.subject}</strong><span>{ticket.author} • {ticket.createdAt}</span></div><b>{ticket.status}</b></div>)}</Card>}
    </div>
  );
}

export function ContactsPage() {
  return (
    <div className="page narrow-page">
      <PageHero kicker="Contacts" title="Контакты" text="Связь с администрацией Dropnetgaming, поддержкой и партнёрским отделом." actions={<Button href="#/feedback">Написать обращение</Button>} />
      <section className="cards-grid three">
        {['support@dropnetgaming.local', 'partners@dropnetgaming.local', 'Telegram: @dropnetgaming'].map((item) => <Card key={item}><h2>{item}</h2><p>Канал связи для учебного коммерческого проекта.</p></Card>)}
      </section>
    </div>
  );
}

export function PrivacyPage() {
  const items = [
    'Данные аккаунта используются для входа и профиля.',
    'Обращения нужны для связи с администрацией.',
    'Статистика матчей используется для ELO, уровней и лидерборда.',
    'В демо-версии данные хранятся в браузере через localStorage.',
    'Обычный пользователь не видит админ-панель и не управляет новостями.',
  ];
  return (
    <div className="page narrow-page">
      <PageHero kicker="Privacy" title="Политика конфиденциальности" text="Короткое описание обработки данных для учебного проекта." />
      <Card>{items.map((item) => <div key={item} className="check-row">✓ {item}</div>)}</Card>
    </div>
  );
}

export function RulesPage() {
  const rules = ['Запрещены читы, баги, токсичность и слив матчей.', 'Игрок должен принять матч за 30 секунд.', 'ELO начисляется после результата матча.', 'Администрация может закрыть обращение после проверки.', 'Турнирные заявки модерируются вручную.'];
  return (
    <div className="page narrow-page">
      <PageHero kicker="Rules" title="Правила платформы" text="Страница правил нужна для доверия, прозрачности и коммерческой платформы." />
      <Card>{rules.map((item) => <div key={item} className="check-row">✓ {item}</div>)}</Card>
    </div>
  );
}

export function FaqPage() {
  const faqs = [
    ['Как найти матч?', 'Войди в аккаунт и нажми Найти матч на главной.'],
    ['Как стать Premium?', 'Открой раздел Premium и отправь заявку на тариф.'],
    ['Где админка?', 'Кнопка видна только после входа под админом.'],
    ['Где хранятся данные?', 'В демо-версии используется localStorage. Для продакшена нужен Firebase.'],
    ['Как связаться?', 'Открой обратную связь или контакты.'],
  ];
  return (
    <div className="page narrow-page">
      <PageHero kicker="FAQ" title="Частые вопросы" text="Сервисный раздел помогает пользователю быстро найти ответ и снижает нагрузку на поддержку." />
      <section className="stacked-cards">{faqs.map(([q, a]) => <Card key={q}><h2>{q}</h2><p>{a}</p></Card>)}</section>
    </div>
  );
}
