import { getFlowers } from "../services/flowerService.js";
import { buildFlowerGroups, bindSearchEvents, renderDefaultTables, initFlowerData } from "../fn/flowerSearchEvents.js";
import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js";
import { bindSidebar, bindMenuListToggle } from "../fn/sidebarEvents.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";
import { renderSearchFlowerName } from "../components/searchFlowerNameSidebar.js";
import { renderSearchSettings } from "../components/searchSettingsSidebar.js";
import { renderFlowerGroupList } from "../components/searchFlowerGroupListSidebar.js";
import { loadImages } from "../services/imageService.js";
import { renderImageModal, bindImageModalEvents } from "../components/imageModal.js";
import { t } from "../i18n/i18n.js";

let imageModalBound = false;

export async function renderSearchPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    content: renderNotification(t("notification.loadingData")),
  });

  try {
    const flowerData = await getFlowers();
    await loadImages();
    initFlowerData(flowerData);
    const groupedFlowers = buildFlowerGroups(flowerData);

    app.innerHTML =
      renderSidebarPageLayout({
        sidebarContent: `${renderSearchFlowerName()} ${renderSearchSettings()} ${renderFlowerGroupList(groupedFlowers)}`,
        pageId: "search",
        pageTitle: t("searchPage.title"),
        mainContent: `
          <div id="resultTbl">
            ${renderDefaultTables(flowerData)}
          </div>
        `,
      }) + renderImageModal();

    bindSidebar();
    bindMenuListToggle();
    bindSearchEvents();

    if (!imageModalBound) {
      bindImageModalEvents();
      imageModalBound = true;
    }
  } catch (error) {
    app.innerHTML = renderPageLayout({
      content: renderNotification(t("notification.failedToLoadData"), "danger"),
    });
    console.error("Failed to load flower data:", error);
  }
}
