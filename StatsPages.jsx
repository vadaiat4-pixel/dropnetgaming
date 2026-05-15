import { useState } from 'react';
import { Button } from '../components/Button.jsx';
import { PageHero } from '../components/Card.jsx';
import { navigate } from '../utils/router.js';

export function LoginPage({ users, setCurrentUser, saveSession }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const found = users.find((user) => user.username === username.trim() && user.password === password);
    if (!found) {
      setError('Неверный логин или пароль');
      return;
    }
    setCurrentUser(found);
    saveSession(found);
    navigate(found.role === 'admin' ? 'admin' : 'profile');
  }

  return (
    <div className="page narrow-page">
      <PageHero kicker="Account" title="Вход в аккаунт" text="Войди в профиль игрока. Админ-аккаунт: skwizzy22 / 123456." />
      <form className="form-card" onSubmit={submit}>
        <label>Логин<input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="skwizzy22" /></label>
        <label>Пароль<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="123456" /></label>
        {error && <div className="error-box">{error}</div>}
        <Button type="submit">Войти</Button>
        <Button href="#/register" variant="ghost">Создать аккаунт</Button>
      </form>
    </div>
  );
}

export function RegisterPage({ users, setUsers, setCurrentUser, saveSession, makeUser }) {
  const [form, setForm] = useState({ username: '', password: '', nickname: '', email: '' });
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const login = form.username.trim();
    if (!login || !form.password) {
      setError('Заполни логин и пароль');
      return;
    }
    if (users.some((user) => user.username.toLowerCase() === login.toLowerCase())) {
      setError('Такой логин уже занят');
      return;
    }

    const user = makeUser({
      username: login,
      password: form.password,
      nickname: form.nickname.trim() || login,
      email: form.email.trim(),
      role: 'user',
    });
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
    saveSession(user);
    navigate('profile');
  }

  return (
    <div className="page narrow-page">
      <PageHero kicker="Registration" title="Регистрация" text="Целевое действие коммерческого сайта: пользователь создаёт аккаунт и попадает в личный кабинет." />
      <form className="form-card" onSubmit={submit}>
        <label>Логин<input value={form.username} onChange={(event) => update('username', event.target.value)} placeholder="username" /></label>
        <label>Никнейм<input value={form.nickname} onChange={(event) => update('nickname', event.target.value)} placeholder="nickname" /></label>
        <label>Email<input value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="mail@example.com" /></label>
        <label>Пароль<input value={form.password} onChange={(event) => update('password', event.target.value)} type="password" placeholder="password" /></label>
        {error && <div className="error-box">{error}</div>}
        <Button type="submit">Зарегистрироваться</Button>
        <Button href="#/login" variant="ghost">Уже есть аккаунт</Button>
      </form>
    </div>
  );
}
