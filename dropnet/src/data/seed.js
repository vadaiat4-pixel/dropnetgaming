export const adminUser = {
  username: 'skwizzy22',
  password: '123456',
  nickname: 'skwizzy22',
  email: 'admin@dropnetgaming.local',
  role: 'admin',
  elo: 1000,
  level: 1,
  wins: 0,
  losses: 0,
  matches: 0,
  xp: 0,
};

export const storageKeys = {
  users: 'dng_users_multifile_v1',
  session: 'dng_session_multifile_v1',
  tickets: 'dng_tickets_multifile_v1',
  news: 'dng_news_multifile_v1',
  matches: 'dng_matches_multifile_v1',
  quests: 'dng_quests_multifile_v1',
  orders: 'dng_orders_multifile_v1',
  tests: 'dng_tests_multifile_v1',
};

export const maps = ['Mirage', 'Inferno', 'Dust II', 'Nuke', 'Ancient', 'Anubis', 'Vertigo', 'Overpass'];

export const botNames = [
  'clutchking',
  'aimlord',
  'deagleman',
  'rushb',
  'smokemaster',
  'awpghost',
  'entrygod',
  'pixelhunter',
  'flashpro',
  'ninjadefuse',
  'headshotter',
  'infernofox',
];

export const initialNews = [
  {
    id: 1,
    tag: 'CS2',
    title: 'CS2: крупное обновление Source 2',
    text: 'Улучшения производительности, стрельбы, сетевых элементов и стабильности матчей.',
    hot: true,
    createdAt: 'Сегодня',
  },
  {
    id: 2,
    tag: 'Dropnetgaming',
    title: 'Автоматический матчмейкинг запущен',
    text: 'Поиск матча собирает очередь, выбирает карту, создаёт комнату и обновляет ELO.',
    hot: true,
    createdAt: 'Сегодня',
  },
  {
    id: 3,
    tag: 'Проект',
    title: 'Добавлен коммерческий сценарий',
    text: 'Регистрация, Premium, заявка на турнир, обращение и админ-панель связаны в один пользовательский путь.',
    hot: false,
    createdAt: 'Сегодня',
  },
];

export const defaultTestResults = [
  {
    id: 1,
    tester: 'Игрок CS2',
    task: 'Найти матч',
    time: '42 сек',
    result: 'Справился',
    issues: 'Сначала искал кнопку в верхнем меню',
    fixed: 'Кнопка Найти матч усилена и вынесена в центр',
  },
  {
    id: 2,
    tester: 'Капитан команды',
    task: 'Оставить заявку на турнир',
    time: '1 мин 20 сек',
    result: 'Справился',
    issues: 'Не хватало доверия к форме',
    fixed: 'Добавлен блок доверия и контакты',
  },
  {
    id: 3,
    tester: 'Администратор',
    task: 'Опубликовать новость',
    time: '35 сек',
    result: 'Справился',
    issues: 'Нужно видеть число обращений',
    fixed: 'Добавлены счётчики в админ-панель',
  },
  {
    id: 4,
    tester: 'Новый пользователь',
    task: 'Зарегистрироваться',
    time: '58 сек',
    result: 'Справился',
    issues: 'Не понял коммерческую выгоду сайта',
    fixed: 'Добавлены Premium, регистрация и понятные CTA-кнопки',
  },
  {
    id: 5,
    tester: 'Партнёр',
    task: 'Найти рекламу',
    time: '1 мин 05 сек',
    result: 'Справился',
    issues: 'Партнёрский раздел был не в меню',
    fixed: 'Добавлены контакты и форма рекламной заявки',
  },
];

export const requirementChecklist = [
  'Логотип-ссылка на главную страницу',
  'Главное меню и боковая навигация',
  'Отдельные страницы, а не один длинный экран',
  'Форма обратной связи и форма заявки',
  'Блок целевого действия: регистрация / Premium / заявка',
  'Блок доверия, контакты и политика конфиденциальности',
  'Адаптивная версия desktop + mobile',
  'Frontend-компоненты, состояния кнопок и форм',
  'Имитация backend: пользователи, новости, заявки, роли',
  'Результаты тестирования и исправления интерфейса',
];

export const navigation = [
  { path: 'matchmaking', label: 'Матчмейкинг', icon: 'home', group: 'main' },
  { path: 'play', label: 'Играть', icon: 'play', group: 'main' },
  { path: 'match-room', label: 'Комната матча', icon: 'swords', group: 'main' },
  { path: 'premium', label: 'Premium', icon: 'crown', group: 'commerce' },
  { path: 'tournaments', label: 'Турниры', icon: 'trophy', group: 'commerce' },
  { path: 'teams', label: 'Команды', icon: 'users', group: 'commerce' },
  { path: 'leaderboard', label: 'Лидерборд', icon: 'chart', group: 'main' },
  { path: 'news', label: 'Новости', icon: 'news', group: 'content' },
  { path: 'quests', label: 'Задания', icon: 'missions', group: 'main' },
  { path: 'feedback', label: 'Обратная связь', icon: 'message', group: 'support' },
  { path: 'testing', label: 'Тестирование', icon: 'shield', group: 'project' },
  { path: 'rules', label: 'Правила', icon: 'shield', group: 'support' },
  { path: 'faq', label: 'FAQ', icon: 'message', group: 'support' },
  { path: 'contacts', label: 'Контакты', icon: 'message', group: 'support' },
  { path: 'privacy', label: 'Политика', icon: 'shield', group: 'support' },
];
