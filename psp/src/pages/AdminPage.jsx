import { useState } from 'react';
import { Button } from '../components/Button.jsx';
import { Card, PageHero, StatCard } from '../components/Card.jsx';

export default function AdminPage({ currentUser, users, setUsers, tickets, setTickets, news, setNews, tests }) {
  const [notice, setNotice] = useState('');
  const [newNews, setNewNews] = useState({ title: '', text: '', tag: 'CS2', hot: true });

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="page narrow-page">
        <PageHero kicker="Admin" title="Админ-панель" text="Доступ только для администратора. Войди под аккаунтом skwizzy22 / 123456." actions={<Button href="#/login">Войти</Button>} />
      </div>
    );
  }

  function addNews(event) {
    event.preventDefault();
    if (!newNews.title.trim() || !newNews.text.trim()) {
      setNotice('Заполни заголовок и текст новости');
      return;
    }
    const item = {
      id: Date.now(),
      title: newNews.title.trim(),
      text: newNews.text.trim(),
      tag: newNews.tag.trim() || 'CS2',
      hot: newNews.hot,
      createdAt: new Date().toLocaleString('ru-RU'),
    };
    setNews((prev) => [item, ...prev]);
    setNewNews({ title: '', text: '', tag: 'CS2', hot: true });
    setNotice('Новость добавлена на сайт');
  }

  function updateTicketStatus(id, status) {
    setTickets((prev) => prev.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket)));
    setNotice('Статус обращения обновлён');
  }

  function deleteTicket(id) {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    setNotice('Обращение удалено');
  }

  function makeAdmin(username) {
    setUsers((prev) => prev.map((user) => (user.username === username ? { ...user, role: 'admin' } : user)));
    setNotice(`${username} теперь администратор`);
  }

  function deleteUser(username) {
    if (username === 'skwizzy22') {
      setNotice('Главного админа удалить нельзя');
      return;
    }
    setUsers((prev) => prev.filter((user) => user.username !== username));
    setNotice(`${username} удалён`);
  }

  return (
    <div className="page">
      <PageHero kicker="Backend admin" title="Админ-панель Dropnetgaming" text="Имитация backend-части: пользователи, новости, обращения, роли и результаты тестирования хранятся через localStorage." />
      {notice && <div className="success-box wide">{notice}</div>}

      <section className="stats-grid five">
        <StatCard value={users.length} label="Пользователей" />
        <StatCard value={users.filter((user) => user.role === 'admin').length} label="Админов" />
        <StatCard value={tickets.length} label="Обращений" />
        <StatCard value={news.length} label="Новостей" />
        <StatCard value={tests.length} label="Тестов" />
      </section>

      <Card>
        <h2>Добавить новость</h2>
        <form className="admin-form" onSubmit={addNews}>
          <input value={newNews.title} onChange={(event) => setNewNews((prev) => ({ ...prev, title: event.target.value }))} placeholder="Заголовок" />
          <input value={newNews.text} onChange={(event) => setNewNews((prev) => ({ ...prev, text: event.target.value }))} placeholder="Текст новости" />
          <input value={newNews.tag} onChange={(event) => setNewNews((prev) => ({ ...prev, tag: event.target.value }))} placeholder="Тег" />
          <label className="inline-check"><input type="checkbox" checked={newNews.hot} onChange={(event) => setNewNews((prev) => ({ ...prev, hot: event.target.checked }))} /> HOT</label>
          <Button type="submit">Опубликовать</Button>
        </form>
      </Card>

      <Card>
        <h2>Обращения</h2>
        {tickets.length === 0 && <p className="muted">Пока обращений нет.</p>}
        {tickets.map((ticket) => (
          <div key={ticket.id} className="admin-ticket">
            <div>
              <strong>{ticket.subject}</strong>
              <p>{ticket.message}</p>
              <span>{ticket.author} • {ticket.createdAt}</span>
            </div>
            <div className="ticket-actions">
              <select value={ticket.status} onChange={(event) => updateTicketStatus(ticket.id, event.target.value)}>
                <option>Новое</option><option>В работе</option><option>Закрыто</option><option>Отклонено</option>
              </select>
              <button type="button" onClick={() => deleteTicket(ticket.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </Card>

      <Card className="table-card">
        <h2>Аккаунты</h2>
        <table>
          <thead><tr><th>Логин</th><th>Ник</th><th>ELO</th><th>Level</th><th>Роль</th><th>Действия</th></tr></thead>
          <tbody>{users.map((user) => <tr key={user.username}><td>{user.username}</td><td>{user.nickname || user.username}</td><td>{user.elo}</td><td>{user.level}</td><td>{user.role}</td><td><button type="button" onClick={() => makeAdmin(user.username)}>Админ</button><button type="button" onClick={() => deleteUser(user.username)}>Удалить</button></td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}
