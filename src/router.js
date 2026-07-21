export function getRoute() {
  const rawHash = window.location.hash.slice(1) || "/";
  const [path, query = ""] = rawHash.split("?");
  const params = new URLSearchParams(query);

  if (path === "/projects") {
    return { page: "projects", tag: params.get("tag") || "all" };
  }

  const section = ["work", "about", "contact"].includes(path.slice(1))
    ? path.slice(1)
    : null;

  return { page: "home", section };
}

export function projectFilterUrl(tag = "all") {
  const query = tag === "all" ? "" : `?tag=${encodeURIComponent(tag)}`;
  return `#/projects${query}`;
}

export function startRouter(onRouteChange) {
  window.addEventListener("hashchange", onRouteChange);
  return () => window.removeEventListener("hashchange", onRouteChange);
}
