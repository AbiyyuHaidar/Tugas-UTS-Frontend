// js/utils.js
function escapeHtml(s){ if(!s) return ''; return String(s).replaceAll('<','&lt;').replaceAll('>','&gt;'); }
function showToast(msg, t=1600){
  let el = document.getElementById('toast');
  if(!el){
    el = document.createElement('div'); el.id='toast'; el.className='toast'; document.body.appendChild(el);
  }
  el.textContent = msg; el.classList.remove('hidden');
  setTimeout(()=> el.classList.add('hidden'), t);
}
