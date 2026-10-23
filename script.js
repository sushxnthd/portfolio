// The page works without JavaScript. This script only adds reading progress.
(() => {
  const indicator = document.getElementById("progress");
  if (!indicator) return;
  let scheduled = false;
  const refresh = () => {
    const remaining = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = remaining > 0 ? window.scrollY / remaining : 0;
    indicator.style.width = Math.max(0, Math.min(100, fraction * 100)) + "%";
    scheduled = false;
  };
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(refresh);
  }, { passive: true });
  window.addEventListener("resize", refresh, { passive: true });
  refresh();
})();
