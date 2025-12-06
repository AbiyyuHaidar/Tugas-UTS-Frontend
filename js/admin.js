// admin.js — FINAL VERSION (with Rupiah auto-format)
(function(){
  // require login
  const session = localStorage.getItem('sp_admin_logged');
  if(!session){ location.href='login.html'; return; }
  const admin = JSON.parse(session);
  document.getElementById('adminInfo').textContent = 'Halo, ' + (admin.display || admin.name);

  // elements
  const productList = document.getElementById('productList');
  const btnAdd = document.getElementById('btnAdd');
  const btnExport = document.getElementById('btnExport');
  const btnImport = document.getElementById('btnImport');
  const importFile = document.getElementById('importFile');
  const btnClear = document.getElementById('btnClear');
  const logoutBtn = document.getElementById('logoutBtn');

  const formPanel = document.getElementById('formPanel');
  const overlay = document.getElementById('overlay');
  const closeForm = document.getElementById('closeForm');
  const productForm = document.getElementById('productForm');
  const cancelBtn = document.getElementById('cancelBtn');
  const formTitle = document.getElementById('formTitle');
  const fileInput = document.getElementById('fileInput');
  const chooseFileBtn = document.getElementById('chooseFileBtn');
  const dropZone = document.getElementById('dropZone');
  const imgPreview = document.getElementById('imgPreview');
  const formFeedback = document.getElementById('formFeedback');
  const priceInput = document.getElementById('price'); // PRICE INPUT

  function showToastLocal(msg){ showToast(msg); }

  // -----------------------
  // AUTO FORMAT RUPIAH
  // -----------------------
  priceInput.addEventListener("input", function(){
    let value = this.value.replace(/[^\d]/g, ""); // hapus semua kecuali angka
    if(value === ""){
      this.value = "";
      return;
    }
    this.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  });

  // -----------------------
  // RENDER PRODUCT LIST
  // -----------------------
  function render(){
    const products = loadProducts();
    productList.innerHTML = '';
    products.forEach(p=>{
      const c = document.createElement('article'); 
      c.className='card';
      c.innerHTML = `
        <div class="card-top">
          <div class="thumb">${p.img? `<img src="${p.img}">` : ''}</div>
          <div style="flex:1">
            <h3>${escapeHtml(p.name)}</h3>
            <div class="meta">${escapeHtml(p.category)} • ${escapeHtml(p.condition)}</div>
            <div class="badges">${p.aftermarket? '<span class="badge after">Aftermarket</span>' : '<span class="badge orig">Original</span>'}</div>
            <div style="margin-top:8px;color:var(--muted)">${escapeHtml(p.desc||'')}</div>
          </div>
        </div>
        <div class="actions">
          <button class="btn" data-edit="${p.id}">Edit</button>
          <button class="btn" data-del="${p.id}">Hapus</button>
        </div>
      `;
      productList.appendChild(c);
    });
  }

  // -----------------------
  // EVENT LISTENERS
  // -----------------------
  btnAdd.addEventListener('click', ()=> openForm());
  closeForm.addEventListener('click', closePanel);
  cancelBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  logoutBtn.addEventListener('click', ()=>{ localStorage.removeItem('sp_admin_logged'); location.href='index.html'; });

  productList.addEventListener('click', (e)=>{
    const ed = e.target.closest('[data-edit]');
    const dl = e.target.closest('[data-del]');
    if(ed){
      editProduct(ed.dataset.edit);
    }
    if(dl){
      if(confirm('Hapus produk ini?')){
        let arr = loadProducts();
        arr = arr.filter(x=> x.id !== dl.dataset.del);
        saveProducts(arr);
        render();
        showToastLocal('Produk dihapus');
      }
    }
  });

  productForm.addEventListener('submit', onSaveProduct);
  chooseFileBtn.addEventListener('click', ()=> fileInput.click());
  fileInput.addEventListener('change', (e)=> handleFile(e.target.files[0]));

  // drag/drop support
  ['dragenter','dragover'].forEach(ev => dropZone.addEventListener(ev, (e)=>{
    e.preventDefault(); e.stopPropagation(); dropZone.classList.add('dragover');
  }));
  ['dragleave','drop'].forEach(ev => dropZone.addEventListener(ev, (e)=>{
    e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('dragover');
  }));
  dropZone.addEventListener('drop', (e)=>{
    const f = e.dataTransfer.files && e.dataTransfer.files[0]; 
    if(f) handleFile(f);
  });

  // EXPORT
  btnExport.addEventListener('click', ()=>{
    const data = JSON.stringify(loadProducts(), null, 2);
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); 
    a.href=url; 
    a.download='products.json'; 
    a.click(); 
    URL.revokeObjectURL(url);
  });

  // IMPORT
  btnImport.addEventListener('click', ()=> importFile.click());
  importFile.addEventListener('change', (e)=>{
    const f = e.target.files && e.target.files[0]; 
    if(!f) return;
    const r = new FileReader();
    r.onload = function(ev){
      try{
        const arr = JSON.parse(ev.target.result);
        if(!Array.isArray(arr)){ alert('Format JSON harus array'); return; }
        const base = loadProducts();
        const merged = arr.concat(base);
        saveProducts(merged);
        render();
        showToastLocal('Import selesai');
      }catch(err){
        alert('Gagal import');
      }
    };
    r.readAsText(f);
    e.target.value='';
  });

  btnClear.addEventListener('click', ()=>{
    if(confirm('Hapus semua produk?')){
      saveProducts([]);
      render();
      showToastLocal('Semua produk dihapus');
    }
  });

  // -----------------------
  // FORM HANDLING
  // -----------------------
  function openForm(p = null){
    productForm.reset();
    formFeedback.textContent='';
    imgPreview.innerHTML='';
    imgPreview.classList.add('hidden');

    if(p){
      formTitle.textContent = 'Edit Produk';
      document.getElementById('productId').value = p.id;
      document.getElementById('name').value = p.name;
      document.getElementById('category').value = p.category;
      
      // SET PRICE WITH FORMATTING
      document.getElementById('price').value = String(p.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      document.getElementById('stock').value = p.stock;
      document.querySelectorAll('input[name="condition"]').forEach(r=> r.checked = r.value === p.condition);
      document.getElementById('aftermarket').checked = !!p.aftermarket;
      document.getElementById('desc').value = p.desc || '';
      if(p.img){
        imgPreview.innerHTML = `<img src="${p.img}">`;
        imgPreview.classList.remove('hidden');
      }
    } else {
      formTitle.textContent = 'Tambah Produk';
      document.getElementById('productId').value = '';
    }

    formPanel.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  function closePanel(){
    productForm.reset();
    document.getElementById('productId').value='';
    imgPreview.innerHTML='';
    imgPreview.classList.add('hidden');
    formPanel.classList.add('hidden');
    overlay.classList.add('hidden');
    formFeedback.textContent='';
  }

  function editProduct(id){
    const arr = loadProducts();
    const p = arr.find(x=> x.id === id);
    if(p) openForm(p);
  }

  function onSaveProduct(e){
    e.preventDefault();
    formFeedback.textContent='';

    const id = document.getElementById('productId').value;
    const name = document.getElementById('name').value.trim();
    const category = document.getElementById('category').value;

    // GET FORMATTED PRICE
    const rawPrice = document.getElementById('price').value;
    const price = Number(rawPrice.replace(/\./g, "")); // strip dots ✔

    const stock = Number(document.getElementById('stock').value);
    const condition = document.querySelector('input[name="condition"]:checked').value;
    const aftermarket = document.getElementById('aftermarket').checked;
    const desc = document.getElementById('desc').value.trim();

    if(!name){
      formFeedback.textContent='Nama wajib diisi';
      return;
    }

    let arr = loadProducts();
    const imgt = imgPreview.querySelector('img');
    const imgData = imgt? imgt.src : null;

    if(id){
      const idx = arr.findIndex(x=> x.id === id);
      if(idx >= 0){
        arr[idx] = { 
          id, name, category, price, stock, condition, aftermarket, desc,
          img: imgData || arr[idx].img || null 
        };
        saveProducts(arr);
        showToastLocal('Perubahan disimpan');
      } else {
        formFeedback.textContent='Produk tidak ditemukan';
        return;
      }
    } else {
      const newId = 'p'+Math.random().toString(36).slice(2,9);
      arr.unshift({
        id:newId, name, category, price, stock, condition, aftermarket, desc,
        img: imgData || null
      });
      saveProducts(arr);
      showToastLocal('Produk ditambahkan');
    }

    render();
    setTimeout(closePanel, 300);
  }

  function handleFile(file){
    if(!file || !file.type.startsWith('image/')){
      formFeedback.textContent='File harus gambar';
      return;
    }
    if(file.size > 3*1024*1024){
      formFeedback.textContent='Ukuran max 3MB';
      return;
    }
    const r = new FileReader();
    r.onload = function(ev){
      imgPreview.innerHTML = `<img src="${ev.target.result}">`;
      imgPreview.classList.remove('hidden');
      formFeedback.textContent='';
    };
    r.onerror = ()=> formFeedback.textContent='Gagal membaca file';
    r.readAsDataURL(file);
  }

  // init
  render();
})();
