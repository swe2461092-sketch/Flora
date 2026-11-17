// src/js/components/searchFlowerGroupListSidebar.js
import { escapeHtml } from "../fn/format.js";
import { getLocalizedValue, t } from "../i18n/i18n.js";

function renderFlowerGroup(group) {
  return `
    <li>
      <a class="app-toggle-sublist" href="#" role="button">
        <span>${escapeHtml(getLocalizedValue(group.groupName))}</span>
      </a>
      <ul class="app-sublist is-hidden">
        ${group.items
          .map(
            (item) => `
              <li>
                <label class="app-sublist-item">
                  <input type="checkbox" name="flowercode" value="${escapeHtml(item.flower_code)}">
                  <span>${escapeHtml(getLocalizedValue(item.flower_name))}</span>
                </label>
              </li>
            `,
          )
          .join("")}
      </ul>
    </li>
  `;
}

export function renderFlowerGroupList(flowerGroups = []) {
  return `
    <p class="menu-label app-menu-label">🌸 ${t("sidebar.searchByFlowerGroups")}:</p>
    <ul class="menu-list">
      ${flowerGroups.map(renderFlowerGroup).join("")}
    </ul>
  `;
}
