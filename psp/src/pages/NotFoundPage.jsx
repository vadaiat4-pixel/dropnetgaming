import React from "react";
import { ActionButton, PageHero } from "../components/Card.jsx";

export default function NotFoundPage({ setPage }) {
  const goHome = () => {
    window.history.pushState(null, "", "#/matchmaking");
    setPage("matchmaking");
  };

  return (
    <main className="flex-1 overflow-auto bg-transparent text-white p-4 sm:p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <PageHero
          kicker="404"
          title="Страница не найдена"
          text="Такого раздела на сайте Dropnetgaming нет. Возможно, ссылка была изменена или введена неправильно."
          icon="shield"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <ActionButton onClick={goHome}>
              Вернуться на главную
            </ActionButton>

            <ActionButton
              dark
              onClick={() => {
                window.history.pushState(null, "", "#/feedback");
                setPage("feedback");
              }}
            >
              Сообщить об ошибке
            </ActionButton>
          </div>
        </PageHero>

        <section className="mt-6 rounded-3xl border border-white/15 bg-black/60 p-6">
          <h2 className="text-2xl font-black">Что произошло?</h2>
          <p className="mt-3 text-zinc-400">
            Сайт работает как SPA-приложение. Если пользователь вводит несуществующий адрес,
            например #qwer, приложение должно показать собственную страницу 404.
          </p>
        </section>
      </div>
    </main>
  );
}