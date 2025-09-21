
async function loadTraits(){
  const res = await fetch('data/traits.json');
  const traits = await res.json();
  const container = document.getElementById('traits');
  const selected = new Set(JSON.parse(localStorage.getItem('nova_selected')||'[]'));
  traits.forEach(t=>{
    const card = document.createElement('div');
    card.className = 'trait' + (selected.has(t.id)?' selected':'');
    card.innerHTML = `<h4>${t.name}</h4><small>${t.blurb}</small>`;
    card.addEventListener('click', ()=>{
      if(selected.has(t.id)){ selected.delete(t.id); card.classList.remove('selected'); }
      else { selected.add(t.id); card.classList.add('selected'); }
      localStorage.setItem('nova_selected', JSON.stringify(Array.from(selected)));
    });
    container.appendChild(card);
  });
  document.getElementById('saveTraits').addEventListener('click', ()=>{
    // Build printable report
    const report = document.getElementById('report');
    const chosen = traits.filter(t=>selected.has(t.id));
    const now = new Date().toLocaleString();
    report.innerHTML = `
      <div class="report">
        <h1>NOVA Purpose Report</h1>
        <p><em>Generated ${now}</em></p>
        <h2>Your Selected Traits (${chosen.length})</h2>
        <div>${chosen.map(t=>`<span class="pill">${t.name}</span>`).join(' ')}</div>
        <h2>Insights</h2>
        <ul>${chosen.map(t=>`<li><strong>${t.name}:</strong> ${t.blurb}</li>`).join('')}</ul>
        <h2>Next Step</h2>
        <p>Open <strong>Navi</strong> to map these traits to concrete roles and a 30–60–90 day plan.</p>
      </div>`;
    window.print();
  });
}
loadTraits();
