(() => {
  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));
  const screens = qsa('.screen');
  function show(id) {
    screens.forEach(s => s.classList.remove('active'));
    qs('#' + id).classList.add('active');
    window.location.hash = id;
  }
  // nav link hash routing
  window.addEventListener('hashchange', () => {
    const id = location.hash.replace('#','') || 'intro';
    if (qs('#' + id)) show(id);
  });
  const startBtn = qs('#startBtn');
  if (startBtn) startBtn.addEventListener('click', () => show('traits'));

  // Back buttons
  qsa('button.ghost[data-target]').forEach(btn => {
    btn.addEventListener('click', () => show(btn.dataset.target));
  });

  // Traits to summary
  const toSummary = qs('#toSummary');
  toSummary?.addEventListener('click', () => {
    const selected = qsa('input[name="trait"]:checked').map(i => i.value);
    if (selected.length === 0) { alert('Choose at least one trait.'); return; }
    const summary = [
      `<strong>Top Traits</strong>: ${selected.join(', ')}`,
      `<strong>Insight</strong>: Your selected traits suggest a purpose blend of ${selected.slice(0,3).join(', ')}. Pray into how these shape your assignment this season.`
    ].join('<br/><br/>');
    qs('#summaryCard').innerHTML = summary;
    show('summary');
  });

  // Email form (client-only placeholder)
  const emailForm = qs('#emailForm');
  emailForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = qs('#email').value.trim();
    if (!email) { alert('Optional: add email to save.'); return; }
    const data = { email, traits: Array.from(document.querySelectorAll('input[name="trait"]:checked')).map(i=>i.value), savedAt: new Date().toISOString() };
    localStorage.setItem('nova_profile', JSON.stringify(data));
    alert('Saved locally. Connect your backend or email service later.');
  });

  // initial
  const initial = location.hash.replace('#','') || 'intro';
  if (qs('#' + initial)) show(initial); else show('intro');
})();