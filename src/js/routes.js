import { renderOverviewPage } from "./pages/overviewPage.js";
import { renderSearchPage } from "./pages/searchPage.js";
import { renderBouquetBuilderPage } from "./pages/bouquetBuilderPage.js";
import { renderCareGuidePage } from "./pages/careGuidePage.js";
import { renderContactPage } from "./pages/contactPage.js";
import { renderNotFoundPage } from "./pages/notFoundPage.js";

export const routes = {
  "#/overview": renderOverviewPage,
  "#/search": renderSearchPage,
  "#/bouquet": renderBouquetBuilderPage,
  "#/guides": renderCareGuidePage,
  "#/contact": renderContactPage,
  "#/404": renderNotFoundPage,
};
