// src/js/components/searchSettingsSidebar.js
import { escapeHtml } from "../fn/format.js";
import { t } from "../i18n/i18n.js";

export const flowerAttributeGroups = [
  {
    groupName: "sidebar.productInfo",
    items: [
      { value: "pricing_stock", label: "sidebar.pricing_stock", checked: true },
      { value: "care_requirements", label: "sidebar.care_requirements", checked: true },
      { value: "botanical_details", label: "sidebar.botanical_details", checked: true },
    ],
  },
  {
    groupName: "sidebar.extraInfo",
    items: [
      { value: "origin_information", label: "sidebar.origin_information", checked: false },
      { value: "bouquet_suitability", label: "sidebar.bouquet_suitability", checked: false },
      { value: "description", label: "sidebar.description", checked: false },
      { value: "images", label: "sidebar.images", checked: true },
    ],
  },
];

function renderAttributeGroup(group) {
  return `
    <li>
      <a class="app-toggle-sublist" href="#" role="button">
        <span>${escapeHtml(t(group.groupName))}</span>
      </a>
      <ul class="app-sublist is-hidden">
        ${group.items
          .map(
            (item) => `
              <li>
                <label class="app-sublist-item">
                  <input type="checkbox" name="flowerAttr" value="${escapeHtml(item.value)}" ${item.checked ? "checked" : ""}>
                  <span>${escapeHtml(t(item.label))}</span>
                </label>
              </li>
            `,
          )
          .join("")}
      </ul>
    </li>
  `;
}

export function renderSearchSettings() {
  return `
    <p class="menu-label app-menu-label">🛠 ${t("sidebar.searchSettings")}:</p>
    <ul class="menu-list">
      ${flowerAttributeGroups.map(renderAttributeGroup).join("")}
    </ul>
  `;
}
