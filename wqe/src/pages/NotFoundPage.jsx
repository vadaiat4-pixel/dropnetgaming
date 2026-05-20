import { Button } from '../components/Button.jsx';
import { Card, PageHero } from '../components/Card.jsx';
import { navigate } from '../utils/router.js';

export default function NotFoundPage() {
  const wrongAddress = window.location.hash || window.location.pathname;

  return (
    <div className="page-stack not-found-page">
      <PageHero
        kicker="404"
        title="Страница не найдена"
        text="Такого раздела на сайте Dropnetgaming нет. Возможно, ссылка была изменена или адрес введён неправильно. Выбери существующий раздел или отправь обращение администратору."
        actions={(
          <>
            <Button onClick={() => navigate('matchmaking')}>Вернуться на главную</Button>
            <Button variant="ghost" onClick={() => navigate('feedback')}>Сообщить об ошибке</Button>
          </>
        )}
      />

      <Card>
        <div className="section-head">
          <span>Почему это важно</span>
          <h2>Отдельный экран ошибки</h2>
          <p>
            Пользователь ввёл адрес <b>{wrongAddress}</b>. Приложение не ломается и не показывает пустую страницу,
            а отдаёт понятный 404-экран с дальнейшими действиями.
          </p>
        </div>
        <div className="feature-grid three">
          <div className="mini-card"><b>Понятное состояние</b><span>Пользователь сразу видит, что страницы нет.</span></div>
          <div className="mini-card"><b>Возврат в навигацию</b><span>Есть кнопка возврата на главную страницу.</span></div>
          <div className="mini-card"><b>Обратная связь</b><span>Можно отправить сообщение администратору.</span></div>
        </div>
      </Card>
    </div>
  );
}
