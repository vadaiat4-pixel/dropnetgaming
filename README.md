export function levelFromElo(elo) {
  if (elo >= 2400) return 10;
  if (elo >= 2200) return 9;
  if (elo >= 2000) return 8;
  if (elo >= 1800) return 7;
  if (elo >= 1600) return 6;
  if (elo >= 1400) return 5;
  if (elo >= 1200) return 4;
  if (elo >= 1050) return 3;
  if (elo >= 900) return 2;
  return 1;
}

export function normalizeUser(user) {
  const elo = Number(user.elo ?? 1000);
  return {
    ...user,
    elo,
    level: levelFromElo(elo),
    wins: Number(user.wins ?? 0),
    losses: Number(user.losses ?? 0),
    matches: Number(user.matches ?? 0),
    xp: Number(user.xp ?? 0),
  };
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function makeDailyQuests() {
  const day = new Date().getDate();
  const pool = [
    { title: 'Сыграй 1 матч', goal: 1, progress: 0, reward: 40, type: 'matches' },
    { title: 'Выиграй 1 матч', goal: 1, progress: 0, reward: 60, type: 'wins' },
    { title: 'Получить +25 ELO', goal: 25, progress: 0, reward: 50, type: 'elo' },
    { title: 'Открой раздел новостей', goal: 1, progress: 0, reward: 25, type: 'news' },
    { title: 'Отправь обращение', goal: 1, progress: 0, reward: 30, type: 'feedback' },
  ];

  return [pool[day % pool.length], pool[(day + 1) % pool.length], pool[(day + 2) % pool.length]].map((quest, index) => ({
    ...quest,
    id: `${todayKey()}-${index}`,
    completed: false,
  }));
}
