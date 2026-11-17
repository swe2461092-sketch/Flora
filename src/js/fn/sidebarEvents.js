// src/js/fn/sidebarEvents.js
export function bindSidebar() {
  const openSidebarBtn = document.getElementById("openSidebar");
  const closeSidebarBtn = document.getElementById("closeSidebar");
  const sidebar = document.getElementById("shopSidebar");
  const overlay = document.getElementById("sidebarOverlay");

  function openSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.add("is-open");
    overlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove("is-open");
    overlay.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  openSidebarBtn?.addEventListener("click", openSidebar);
  closeSidebarBtn?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeSidebar();
  });
}

export function bindMenuListToggle() {
  document.querySelectorAll(".app-toggle-sublist").forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const li = toggle.closest("li");
      const sublist = li?.querySelector(".app-sublist");
      if (!sublist) return;
      sublist.classList.toggle("is-hidden");
      li.classList.toggle("is-active");
    });
  });
}
