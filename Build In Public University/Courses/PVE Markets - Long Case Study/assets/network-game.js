(() => {
  const KEY = 'bipu-pve-network-v1';
  const nodes = [
    {id:'pair', n:'01', title:'The pair', q:'What is being connected?', href:'concepts/01-the-pair.html', next:['pve','liquidity']},
    {id:'pve', n:'02', title:'PVE vs PVP', q:'What behavior is rewarded?', href:'concepts/02-pve-vs-pvp.html', next:['loop','participation']},
    {id:'loop', n:'03', title:'The compounding loop', q:'Where does value accumulate?', href:'concepts/03-compounding-loop.html', next:['vault','dashboard']},
    {id:'vault', n:'04', title:'Community vaults', q:'Who controls the reserve?', href:'concepts/04-community-vault.html', next:['dashboard','participation']},
    {id:'liquidity', n:'05', title:'Liquidity', q:'What makes participation usable?', href:'concepts/05-liquidity.html', next:['vault','safety']},
    {id:'dashboard', n:'06', title:'Dashboards', q:'What can be checked?', href:'concepts/06-dashboard-evidence.html', next:['safety','participation']},
    {id:'safety', n:'07', title:'Safety boundaries', q:'What would disconfirm the story?', href:'concepts/07-safety.html', next:['participation']},
    {id:'participation', n:'08', title:'Participation ≠ investment', q:'How can you learn without being recruited?', href:'concepts/08-participation.html', next:['synthesis']},
    {id:'synthesis', n:'∑', title:'Synthesis', q:'State the mechanism, evidence boundary, and falsifier.', href:'assignment.html', next:[]}
  ];
  const connections = [['pair','pve'],['pair','liquidity'],['pve','loop'],['pve','participation'],['loop','vault'],['loop','dashboard'],['liquidity','vault'],['liquidity','safety'],['vault','dashboard'],['vault','participation'],['dashboard','safety'],['dashboard','participation'],['safety','participation'],['participation','synthesis']];
  const map = document.querySelector('#networkMap');
  const brief = document.querySelector('#networkBrief');
  const reset = document.querySelector('#resetNetwork');
  const getState = () => JSON.parse(localStorage.getItem(KEY) || '{}');
  const save = (s) => localStorage.setItem(KEY, JSON.stringify(s));
  const esc = (s) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render() {
    const s = getState(); const visited = new Set(s.visited || []); const unlocked = new Set(['pair']);
    connections.forEach(([a,b]) => { if (visited.has(a)) unlocked.add(b); if (visited.has(b)) unlocked.add(a); });
    if (s.receipt01) unlocked.add('synthesis');
    map.innerHTML = nodes.map(node => {
      const isVisited=visited.has(node.id), isOpen=unlocked.has(node.id), isSynthesis=node.id==='synthesis';
      const cls = isVisited ? 'done' : isOpen ? 'open' : 'locked';
      const href = isOpen ? node.href : '#';
      return `<a class="network-node ${cls} ${isSynthesis?'synthesis':''}" data-node="${node.id}" href="${href}"><span class="node-number">${node.n}</span><strong>${esc(node.title)}</strong><small>${esc(node.q)}</small><em>${isVisited?'visited':isOpen?'open':'locked'}</em></a>`;
    }).join('');
    const lines = connections.map(([a,b]) => `<span class="network-line line-${a}-${b} ${visited.has(a)||visited.has(b)?'lit':''}"></span>`).join('');
    map.insertAdjacentHTML('afterbegin', `<div class="network-lines" aria-hidden="true">${lines}</div>`);
    const next = s.receipt01 && !visited.has('synthesis') ? nodes.find(n => n.id==='synthesis') : (nodes.find(n => !visited.has(n.id) && unlocked.has(n.id)) || nodes.find(n => n.id==='synthesis'));
    if (next) brief.innerHTML = `<p class="eyebrow">NEXT MOVE</p><h2>${esc(next.title)}.</h2><p>${esc(next.q)} The route is open because the graph says it is adjacent to what you have already visited.</p><a class="button primary" href="${next.href}">Enter ${esc(next.n)} →</a>`;
    map.querySelectorAll('.network-node.locked').forEach(el => el.addEventListener('click', e => { e.preventDefault(); brief.innerHTML='<p class="eyebrow">ROUTE CLOSED</p><h2>That node is not adjacent yet.</h2><p>Visit an open node first. The map is a lesson in connection, not a menu pretending every route is equivalent.</p>'; }));
  }
  reset.addEventListener('click', () => { localStorage.removeItem(KEY); render(); });
  render();
})();
