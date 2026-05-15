export const routes = [
  "matchmaking",
  "play",
  "matchRoom",
  "tournaments",
  "premium",
  "pricing",
  "teams",
  "leaderboard",
  "news",
  "missions",
  "feedback",
  "profile",
  "login",
  "register",
  "admin",
  "project",
  "designDoc",
  "prototype",
  "testing",
  "roadmap",
  "partners",
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

export function getRouteFromHash() {
  const cleanHash = window.location.hash
    .replace("#/", "")
    .replace("#", "")
    .split("?")[0]
    .trim();

  if (!cleanHash) {
    return "matchmaking";
  }

  return routes.includes(cleanHash) ? cleanHash : "notFound";
}

export function goTo(setPage, page, message) {
  const targetPage = routes.includes(page) ? page : "notFound";

  window.history.pushState(null, "", `#/${targetPage}`);
  setPage(targetPage);

  if (message) {
    window.setTimeout(() => alert(message), 40);
  }
}