(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'portfolio-theme';
  const choices = ['system', 'light', 'dark'];
  let preference = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (choices.includes(saved)) preference = saved;
    const requested = new URLSearchParams(location.search).get('theme');
    if (choices.includes(requested)) {
      preference = requested;
      localStorage.setItem(key, preference);
      const url = new URL(location.href);
      url.searchParams.delete('theme');
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  } catch {}
  function apply() {
    const dark = preference === 'dark' || (preference === 'system' && media.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.themePreference = preference;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#151515' : '#ffffff';
    const control = document.querySelector('.theme-control');
    if (control) {
      control.hidden = false;
      for (const button of control.querySelectorAll('button')) {
        button.setAttribute('aria-pressed', String(button.dataset.choice === preference));
      }
    }
  }
  apply();
  media.addEventListener('change', apply);
  window.addEventListener('storage', e => {
    if (e.key !== key && e.key !== null) return;
    preference = choices.includes(e.newValue) ? e.newValue : 'system';
    apply();
  });
  document.addEventListener('DOMContentLoaded', () => {
    const control = document.querySelector('.theme-control');
    if (!control) return;
    control.addEventListener('click', e => {
      const button = e.target.closest('button[data-choice]');
      if (!button || !choices.includes(button.dataset.choice)) return;
      preference = button.dataset.choice;
      try { localStorage.setItem(key, preference); } catch {}
      apply();
    });
    apply();
  });
})();
