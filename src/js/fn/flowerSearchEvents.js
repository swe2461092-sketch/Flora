import { renderNotification } from "../layouts/notificationLayout.js";
import { renderFlowerTables } from "../components/flowerTables.js";
import { flowerAttributeGroups } from "../components/searchSettingsSidebar.js";
import { getLocalizedValue, t } from "../i18n/i18n.js";

export function buildFlowerGroups(data) {
  const grouped = new Map();
  for (const item of data) {
    const groupKey = item.flower_group?.en || "Other";
    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, {
        groupName: item.flower_group,
        items: new Map(),
      });
    }
    const groupData = grouped.get(groupKey);
    groupData.items.set(item.flower_code, {
      flower_code: item.flower_code,
      flower_name: item.flower_name,
    });
  }
  return Array.from(grouped.values()).map((group) => ({
    groupName: group.groupName,
    items: Array.from(group.items.values()).sort((a, b) =>
      getLocalizedValue(a.flower_name).localeCompare(getLocalizedValue(b.flower_name)),
    ),
  }));
}

let flowerData = [];
export function initFlowerData(data) {
  flowerData = data;
}

const DEFAULT_TYPES = flowerAttributeGroups
  .flatMap((group) => group.items)
  .filter((item) => item.checked)
  .map((item) => item.value);

const DEFAULT_ITEM_COUNT = 3;

export function bindSearchEvents() {
  const searchBtn = document.getElementById("searchBtn");
  const searchTxt = document.getElementById("searchTxt");

  searchBtn?.addEventListener("click", handleTextSearch);
  searchTxt?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleTextSearch();
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches('input[name="flowercode"]')) {
      handleFlowerCodeSearch();
      return;
    }
    if (target.matches('input[name="flowerAttr"]')) {
      renderCurrentResults();
    }
  });
}

function handleTextSearch() {
  clearCheckedFlowerCodes();
  const keyword = getSearchKeyword();
  if (!keyword) {
    setResultHtml(renderNotification(t("notification.enterFlowerName")));
    return;
  }
  renderCurrentResults();
}

function handleFlowerCodeSearch() {
  const searchTxt = document.getElementById("searchTxt");
  if (searchTxt) searchTxt.value = "";
  const selectedCodes = getSelectedFlowerCodes();
  if (!selectedCodes.length) {
    setResultHtml(renderDefaultTables(flowerData));
    return;
  }
  renderCurrentResults();
}

function renderCurrentResults() {
  const matched = getMatchedItems();
  const selectedTypes = getSelectedAttributeTypes();
  setResultHtml(renderFlowerTables(matched, selectedTypes));
}

function getMatchedItems() {
  const selectedCodes = getSelectedFlowerCodes();
  const keyword = getSearchKeyword();

  if (selectedCodes.length) {
    return flowerData.filter((item) => selectedCodes.includes(item.flower_code));
  }
  if (keyword) {
    if (keyword.length < 2) return [];
    return flowerData.filter((item) => {
      const flowerName = getLocalizedValue(item.flower_name).toLowerCase();
      return flowerName.split(/\s+/).some((word) => word.startsWith(keyword));
    });
  }
  return flowerData.slice(0, DEFAULT_ITEM_COUNT);
}

function getSearchKeyword() {
  return document.getElementById("searchTxt")?.value.trim().toLowerCase() || "";
}

function getSelectedFlowerCodes() {
  return Array.from(document.querySelectorAll('input[name="flowercode"]:checked')).map((cb) => cb.value);
}

function getSelectedAttributeTypes() {
  return Array.from(document.querySelectorAll('input[name="flowerAttr"]:checked')).map((cb) => cb.value);
}

function clearCheckedFlowerCodes() {
  document.querySelectorAll('input[name="flowercode"]:checked').forEach((cb) => {
    cb.checked = false;
  });
}

function setResultHtml(html) {
  const resultTbl = document.getElementById("resultTbl");
  if (resultTbl) resultTbl.innerHTML = html;
}

export function renderDefaultTables(data) {
  const defaultItems = data.slice(0, DEFAULT_ITEM_COUNT);
  return renderFlowerTables(defaultItems, DEFAULT_TYPES);
}
