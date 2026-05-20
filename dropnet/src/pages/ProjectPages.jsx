import { Button } from '../components/Button.jsx';
import { Card, PageHero } from '../components/Card.jsx';
import { requirementChecklist } from '../data/seed.js';

export function ProjectPage() {
  const sections = [
    ['Название проекта', 'Dropnetgaming — коммерческая игровая платформа для CS2 с матчмейкингом, ELO, заданиями, новостями, заявками и админ-панелью.'],
    ['Коммерческая цель', 'Измеримые действия: регистрация, Premium-подписка, заявка на турнир, обращение в поддержку, рекламная заявка партнёра.'],
    ['Целевая аудитория', 'Игроки CS2 14–25 лет, капитаны команд, начинающие киберспортсмены, администраторы турниров и рекламодатели игровых сервисов.'],
    ['Персоны', 'Игрок хочет быстро найти матч; капитан хочет зарегистрировать команду; партнёр хочет купить рекламное размещение; админ хочет управлять новостями.'],
    ['Сценарии', 'Контекстный: игрок зашёл после школы и ищет матч. Ключевой путь: регистрация → матч → ELO. Что если: неверный пароль, пустая форма, нет матчей.'],
    ['Информационная архитектура', 'Гибридная структура: матчмейкинг, профиль, Premium, турниры, команды, новости, обращения, админка, документы проекта.'],
  ];

  return (
    <div className="page">
      <PageHero kicker="Design document" title="О проекте Dropnetgaming" text="Раздел для защиты: идея, коммерческая цель, аудитория, пользовательские сценарии, архитектура, frontend/backend и критерии готовности." actions={<><Button href="#/register">Целевое действие</Button><Button href="#/premium" variant="ghost">Premium</Button><Button href="#/feedback" variant="ghost">Форма заявки</Button></>} />
      <section className="cards-grid three">{sections.map(([title, text]) => <Card key={title}><h2>{title}</h2><p>{text}</p></Card>)}</section>
    </div>
  );
}

export function DesignDocumentPage() {
  const checklist = [
    ['Frontend', 'React/Vite, компоненты, адаптивность, формы, состояния кнопок, обработка ошибок и имитация API через localStorage.'],
    ['Backend', 'Имитация серверной логики: пользователи, сессия, новости, обращения, матчи, заявки, тесты и роли администратора.'],
    ['Навигация', 'Главное меню, боковое меню, футер, быстрые CTA, страницы не глубже 3 кликов.'],
    ['Графический дизайн', 'Чёрно-белая Steel Wings тема под логотип, единые отступы, контрастные кнопки, минимум лишнего цвета.'],
    ['Компоненты', 'Логотип-ссылка, карточки, формы, таблицы, профили, уведомления, админ-панель, футер, блок доверия.'],
    ['Критерии готовности', 'Сайт собирается, страницы работают, формы сохраняют данные, админ управляет контентом, мобильная версия не ломается.'],
  ];

  return (
    <div className="page">
      <PageHero kicker="Project documentation" title="Дизайн-документ" text="Основной документ проекта: логика продукта, монетизация, структура, UI-компоненты, frontend/backend и план проверки." actions={<Button href="#/prototype">Перейти к прототипу</Button>} />
      <section className="cards-grid three">{checklist.map(([title, text]) => <Card key={title}><h2>{title}</h2><p>{text}</p></Card>)}</section>
      <Card><h2>Чеклист обязательных элементов</h2><div className="mini-list">{requirementChecklist.map((item) => <span key={item}>✓ {item}</span>)}</div></Card>
    </div>
  );
}

export function PrototypePage() {
  const screens = ['Главная / матчмейкинг', 'Страница Premium', 'Комната матча', 'Профиль игрока', 'Форма заявки', 'Админ-панель', 'Новости', 'Мобильная версия'];
  return (
    <div className="page">
      <PageHero kicker="Prototype map" title="Прототип и карта экранов" text="Цифровая версия бумажного прототипа: ключевые экраны, переходы и полный коммерческий сценарий от входа до целевого действия." actions={<><Button href="#/matchmaking">Главная</Button><Button href="#/premium" variant="ghost">Premium-сценарий</Button><Button href="#/feedback" variant="ghost">Форма заявки</Button></>} />
      <section className="cards-grid four">{screens.map((screen, index) => <Card key={screen}><div className="prototype-screen">{index + 1}</div><h2>{screen}</h2><p>Экран кликабельного прототипа и часть пользовательского пути.</p></Card>)}</section>
    </div>
  );
}

export function TestingPage({ tests }) {
  return (
    <div className="page">
      <PageHero kicker="Usability testing" title="Юзабилити и тестирование" text="Страница результатов тестирования: тестовые задания, время выполнения, найденные проблемы и исправления после проверки." />
      <Card className="table-card">
        <table>
          <thead><tr><th>Тестер</th><th>Цель</th><th>Время</th><th>Итог</th><th>Проблема</th><th>Исправление</th></tr></thead>
          <tbody>{tests.map((test) => <tr key={test.id}><td>{test.tester}</td><td>{test.task}</td><td>{test.time}</td><td>{test.result}</td><td>{test.issues}</td><td>{test.fixed}</td></tr>)}</tbody>
        </table>
      </Card>
    </div>
  );
}

export function RoadmapPage() {
  const steps = ['Бумажный прототип', 'Figma-прототип', 'Frontend', 'Backend/Firebase', 'Юзабилити-тесты', 'Финальная защита'];
  return (
    <div className="page">
      <PageHero kicker="Roadmap" title="План разработки" text="Этапы проекта от идеи и прототипирования до frontend/backend, тестирования и защиты." />
      <section className="cards-grid three">{steps.map((step, index) => <Card key={step}><span className="step-number">0{index + 1}</span><h2>{step}</h2><p>Этап отражается в дневнике разработчика и влияет на итоговый продукт.</p></Card>)}</section>
    </div>
  );
}
