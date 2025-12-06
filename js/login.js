// js/login.js
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('adminName').value.trim();
  const pin = document.getElementById('adminPin').value.trim();
  if(!name || !pin){ alert('Masukkan nama dan PIN'); return; }
  if(pin === '9696'){
    // save session (store admin name)
    localStorage.setItem('sp_admin_logged', JSON.stringify({ name: name.toLowerCase(), display: name }));
    location.href = 'admin.html';
  } else {
    alert('Nama atau PIN salah');
  }
});
