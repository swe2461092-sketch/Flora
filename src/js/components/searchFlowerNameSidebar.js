// src/js/components/searchFlowerNameSidebar.js
import { t } from "../i18n/i18n.js";

export function renderSearchFlowerName() {
  return `    
    <p class="menu-label app-menu-label">🔍︎ ${t("sidebar.searchByFlowerName")}:</p>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-primary" type="text" placeholder="${t("sidebar.flowerName")}" id="searchTxt"/>
        <span class="icon is-small is-left">
          <i class="fa-solid fa-fan"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-primary is-fullwidth" type="button" id="searchBtn">
          ${t("sidebar.searchButton")}
        </button>
      </p>
    </div>   
  `;
}
