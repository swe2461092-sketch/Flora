import { renderPageLayout } from "../layouts/pageLayout.js";
export function renderBouquetBuilderPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "bouquet",
    title: "Баглаа угсрах тооцоолуур",
    content: `<p>Хүссэн цэцэгсээ сонгон баглааны нийт үнийг тооцоолно уу.</p>`,
  });
}
