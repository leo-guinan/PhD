(() => {
  const form = document.querySelector('#assignmentForm');
  if (!form) return;

  const output = document.querySelector('#receiptOutput');
  const preview = document.querySelector('#receiptPreview');
  const download = document.querySelector('#downloadReceipt');
  let receipt = null;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    receipt = {
      course_id: 'bipu-pve-markets-long',
      assignment_id: 'map-the-flywheel-01',
      created_at: new Date().toISOString(),
      claim: document.querySelector('#claim').value.trim(),
      mechanism_map: document.querySelector('#mechanism').value.trim(),
      evidence_trail: document.querySelector('#evidence').value.trim(),
      confidence: document.querySelector('#confidence').value,
      next_question: document.querySelector('#next').value.trim(),
      local_only: true,
      receipt_version: '1.0',
      proof_boundary: 'This receipt records learner reasoning. It does not verify a financial outcome or endorse an asset.'
    };
    preview.textContent = JSON.stringify(receipt, null, 2);
    const gameState = JSON.parse(localStorage.getItem('bipu-pve-network-v1') || '{}');
    gameState.receipt01 = true;
    localStorage.setItem('bipu-pve-network-v1', JSON.stringify(gameState));
    output.hidden = false;
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  download?.addEventListener('click', () => {
    if (!receipt) return;
    const newline = String.fromCharCode(10);
    const blob = new Blob([JSON.stringify(receipt, null, 2) + newline], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bipu-pve-markets-receipt.json';
    link.click();
    URL.revokeObjectURL(link.href);
  });
})();
