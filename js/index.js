// js/index.js
document.addEventListener('DOMContentLoaded', ()=> {
  const productList = document.getElementById('productList');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const totalItems = document.getElementById('totalItems');

  const cartBtn = document.getElementById('cartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const closeCart = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalText = document.getElementById('cartTotalText');
  const clearCartBtn = document.getElementById('clearCartBtn');

  function currency(n){ return 'Rp '+Number(n).toLocaleString('id-ID'); }

  function render(){
    const products = loadProducts();
    const q = (searchInput.value||'').trim().toLowerCase();
    const cat = categoryFilter.value;
    const list = products.filter(p=>{
      const txt = (p.name + ' ' + (p.desc||'')).toLowerCase();
      if(q && !txt.includes(q)) return false;
      if(cat !== 'all' && p.category !== cat) return false;
      return true;
    });

    productList.innerHTML = '';
    list.forEach(p=>{
      const el = document.createElement('article'); el.className='card';
      el.innerHTML = `
        <div class="card-top">
          <div class="thumb">${p.img? `<img src="${p.img}" alt="${escapeHtml(p.name)}">` : ''}</div>
          <div style="flex:1">
            <h3>${escapeHtml(p.name)}</h3>
            <div class="meta">${escapeHtml(p.category)} • ${escapeHtml(p.condition)}</div>
            <div class="badges">${p.aftermarket? '<span class="badge after">Aftermarket</span>':'<span class="badge orig">Original</span>'}</div>
          </div>
        </div>
        <div style="margin-top:8px">
          <div class="meta">Harga: ${currency(p.price)}</div>
          <p style="margin-top:8px;color:var(--muted)">${escapeHtml(p.desc||'')}</p>
        </div>
        <div class="actions">
          <button class="btn primary" data-add="${p.id}">Tambah ke Keranjang</button>
          <a class="btn" href="product.html?id=${p.id}">Detail</a>
        </div>
      `;
      productList.appendChild(el);
    });

    totalItems.textContent = `${products.length} Produk`;
  }

  // cart drawer handlers
  function openCart(){ cartDrawer.classList.remove('hidden'); cartDrawer.setAttribute('aria-hidden','false'); renderCart(); }
  function closeCartFn(){ cartDrawer.classList.add('hidden'); cartDrawer.setAttribute('aria-hidden','true'); }

  function renderCart(){
    const cart = loadCart(); const products = loadProducts();
    cartItemsEl.innerHTML = '';
    if(cart.length===0){ cartItemsEl.innerHTML = '<p>Keranjang kosong.</p>'; cartTotalText.textContent='Total: Rp 0'; return; }
    let total = 0;
    cart.forEach(item=>{
      const p = products.find(x=>x.id===item.id);
      if(!p) return;
      const node = document.createElement('div'); node.className='cart-item';
      node.innerHTML = `
        <div class="thumb">${p.img? `<img src="${p.img}">` : ''}</div>
        <div style="flex:1">
          <strong>${escapeHtml(p.name)}</strong>
          <div class="meta">Harga: ${currency(p.price)}</div>
          <div style="margin-top:6px">Qty: <input type="number" min="1" value="${item.qty}" data-id="${p.id}" class="cart-qty" style="width:68px;padding:6px;border-radius:6px;background:transparent;border:1px solid rgba(255,255,255,.04)"></div>
        </div>
        <div>
          <button class="btn" data-remove="${p.id}">Hapus</button>
        </div>
      `;
      cartItemsEl.appendChild(node);
      total += p.price * item.qty;
    });
    cartTotalText.textContent = `Total: ${currency(total)}`;
  }

  // events
  productList.addEventListener('click', (e)=>{
    const addBtn = e.target.closest('[data-add]');
    if(addBtn){
      const id = addBtn.dataset.add; addToCart(id,1); showToast('Ditambahkan ke keranjang'); return;
    }
  });

  cartBtn.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartFn);
  clearCartBtn.addEventListener('click', ()=>{ if(confirm('Kosongkan keranjang?')){ clearCart(); renderCart(); }});

  cartItemsEl.addEventListener('click', (e)=>{
    const rem = e.target.closest('[data-remove]');
    if(rem){ removeCartItem(rem.dataset.remove); renderCart(); showToast('Dihapus dari keranjang'); return; }
  });
  cartItemsEl.addEventListener('change', (e)=>{
    const el = e.target; if(el.classList.contains('cart-qty')){ const id = el.dataset.id; let q = Number(el.value)||1; if(q<1) q=1; updateCartItem(id,q); renderCart(); }
  });

  // initial
  searchInput.addEventListener('input', render);
  categoryFilter.addEventListener('change', render);

  render();
});
