import "./modules";
const devMode = () => import.meta.env.MODE === "development";

function dayTheme() {
  if (devMode()) {
    return "/styles/themes/day.scss";
  }

  return "/assets/day.css";
}

function nightTheme() {
  if (devMode()) {
    return "/styles/themes/night.scss";
  }

  return "/assets/night.css";
}

/**
 * initThemeButton depends on import.meta.env.*
 * and they are not available within tsx files, that is why application starts from plain index.ts module
 */
export default function initTheme() {
  const button = document.getElementById("themeButton");
  const link = document.getElementById("theme") as HTMLLinkElement;

  link.href = link.href.endsWith(dayTheme()) ? nightTheme() : dayTheme();
  button.addEventListener("click", () => {
    if (link) {
      link.href = link.href.endsWith(dayTheme()) ? nightTheme() : dayTheme();
    }
  });
}
