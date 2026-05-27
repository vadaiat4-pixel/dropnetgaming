# Dropnetgaming — CS2 Match Hub

Полноценный многостраничный учебный коммерческий сайт под требования годового проекта.

## Что внутри

- React + Vite
- Много файлов и отдельные страницы в `src/pages`
- Компоненты в `src/components`
- Данные и имитация backend в `src/data` и `src/utils`
- Логотип в `public/logo-dng-final.png`
- GitHub Pages workflow в `.github/workflows/deploy.yml`
- Проектная документация в `docs/`

## Админ

- Логин: `skwizzy22`
- Пароль: `123456`

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

## GitHub Pages

`vite.config.js` уже содержит:

```js
base: '/dropnetgaming/'
```

Если репозиторий будет называться иначе, поменяй `base` на `/<название-репозитория>/`.
