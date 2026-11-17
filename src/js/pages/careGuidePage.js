import { renderPageLayout } from "../layouts/pageLayout.js";
export function renderCareGuidePage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "guides",
    title: "Цэцэг арчилгааны гарын авлага",
    content: `<p>Тасалгааны болон баглааны цэцэг арчлах зөвлөмжүүд.</p>`,
  });
}
