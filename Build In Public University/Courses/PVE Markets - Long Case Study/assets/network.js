(() => {
  const KEY = 'bipu-pve-network-v1';
  const state = JSON.parse(localStorage.getItem(KEY) || '{}');
  const node = document.body.dataset.node;
  if (node) {
    state.visited = [...new Set([...(state.visited || []), node])];
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  const bar = document.createElement('div');
  bar.className = 'network-bar';
  const visited = (state.visited || []).length;
  const receipt = state.receipt01 ? ' · receipt forged' : '';
  bar.innerHTML = `<span>NETWORK STATE · ${visited}/8 nodes visited${receipt}</span><a href="${location.pathname.includes('/concepts/') ? '../game.html' : 'game.html'}">Open network map →</a>`;
  document.body.prepend(bar);
})();
