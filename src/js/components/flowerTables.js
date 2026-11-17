import { titleFromKey, escapeHtml } from "../fn/format.js";
import { renderTable } from "../layouts/tableLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";
import { getImagesByFlowerCode } from "../services/imageService.js";
import { getLocalizedValue, formatDate, t } from "../i18n/i18n.js";

export function renderFlowerTables(items, selectedTypes) {
  if (!items.length) {
    return renderNotification(t("notification.noMatchFound"));
  }
  if (!selectedTypes.length) {
    return renderNotification(t("notification.selectAtLeastOneCategory"));
  }
  return selectedTypes.map((type) => renderTableByType(type, items)).join("");
}

function renderTableByType(type, items) {
  if (type === "description") {
    return renderTable({
      title: t("table.description"),
      columns: [
        { key: "flower_name", label: t("table.flowerName") },
        { key: "flower_group", label: t("table.flowerGroup") },
        { key: "scientific_name", label: t("table.scientificName") },
        { key: "origin", label: t("table.origin") },
      ],
      rows: items.map((item) => ({
        ...item,
        flower_name: getLocalizedValue(item.flower_name),
        flower_group: getLocalizedValue(item.flower_group),
        origin: getLocalizedValue(item.origin),
      })),
    });
  }

  if (type === "images") {
    return renderTable({
      title: t("table.images"),
      columns: [
        { key: "flower_name", label: t("table.flowerName") },
        {
          key: "number_of_images",
          label: t("table.numberOfImages"),
          render: (item) => {
            const images = getImagesByFlowerCode(item.flower_code);
            const count = images.length;
            return count > 0
              ? `
                <span
                  class="tag is-primary image-count-tag open-image-btn"
                  data-flowercode="${escapeHtml(item.flower_code)}"
                  data-flowername="${escapeHtml(getLocalizedValue(item.flower_name))}"
                >
                  ${count}
                </span>
              `
              : "-";
          },
        },
      ],
      rows: items.map((item) => ({
        ...item,
        flower_name: getLocalizedValue(item.flower_name),
      })),
    });
  }

  const attrKeys = Array.from(
    new Set(
      items.flatMap((item) => {
        const data = item?.[type];
        return data && typeof data === "object" && !Array.isArray(data) ? Object.keys(data) : [];
      }),
    ),
  );

  const columns = [
    { key: "flower_name", label: t("table.flowerName") },
    ...attrKeys.map((key) => ({
      key,
      label: t(`table.${key}`) !== `table.${key}` ? t(`table.${key}`) : key,
    })),
  ];

  const rows = items.map((item) => {
    const rowData = getLocalizedValue(item?.[type] && typeof item[type] === "object" ? item[type] : {});
    if (rowData["Arrival date"]) {
      rowData["Arrival date"] = formatDate(rowData["Arrival date"]);
    }
    return {
      flower_name: getLocalizedValue(item.flower_name),
      ...rowData,
    };
  });

  return renderTable({
    title: t(`sidebar.${type}`) !== `sidebar.${type}` ? t(`sidebar.${type}`) : titleFromKey(type),
    columns,
    rows,
  });
}
