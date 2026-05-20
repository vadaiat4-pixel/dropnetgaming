export const routes = [
  "matchmaking",
  "play",
  "match-room",
  "tournaments",
  "premium",
  "teams",
  "leaderboard",
  "news",
  "quests",
  "feedback",
  "profile",
  "login",
  "register",
  "admin",
  "rules",
  "faq",
  "contacts",
  "privacy",
  "search",
  "friends",
  "inventory",
  "maps",
  "servers",
  "anticheat",
  "settings",
  "stats",
  "league",
];

export function getHashRoute() {
  const cleanHash = window.location.hash
    .replace("#/", "")
    .replace("#", "")
    .split("?")[0]
    .trim();

  if (!cleanHash) {
    return "matchmaking";
  }

  return routes.includes(cleanHash) ? cleanHash : "not-found";
}

export function navigate(page, message) {
  const targetPage = routes.includes(page) ? page : "not-found";

  window.history.pushState(null, "", `#/${targetPage}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));

  if (message) {
    window.setTimeout(() => alert(message), 40);
  }
}
