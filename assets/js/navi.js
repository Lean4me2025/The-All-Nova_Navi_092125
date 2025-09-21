
async function suggest(){
  const selected = new Set(JSON.parse(localStorage.getItem('nova_selected')||'[]'));
  const [traitsRes, treeRes] = await Promise.all([
    fetch('data/traits.json'), fetch('data/decision_tree.json')
  ]);
  const traits = await traitsRes.json();
  const tree = await treeRes.json();
  const byId = Object.fromEntries(traits.map(t=>[t.id,t]));
  const suggestions = new Map(); // role -> score
  selected.forEach(id=>{
    const roles = tree[id] || [];
    roles.forEach(r=> suggestions.set(r, (suggestions.get(r)||0)+1 ));
  });
  const sorted = Array.from(suggestions.entries()).sort((a,b)=>b[1]-a[1]);

  const mount = document.getElementById('suggestions');
  if(sorted.length === 0){
    mount.innerHTML = '<p>No traits selected yet. Visit Nova, choose traits, then come back.</p>';
    return;
  }
  const html = [`<div class="grid cols-3">`];
  sorted.forEach(([role,score])=>{
    html.push(`<div class="card">
      <h4>${role}</h4>
      <small>Matched by ${score} of your traits</small>
      <div style="margin-top:10px">
        <button class="btn" onclick="alert('Resume builder coming next: tailor resume to ${role}.')">Build Resume</button>
        <button class="btn secondary" onclick="alert('Cover letter generator coming next for ${role}.')">Cover Letter</button>
      </div>
    </div>`);
  });
  html.push(`</div>`);
  mount.innerHTML = html.join('');
}
suggest();
