// js/store.js — cart logic (localStorage)
const KEY_CART = 'sp_cart_v1';
function loadCart(){ try{ const r = localStorage.getItem(KEY_CART); return r? JSON.parse(r): []; }catch(e){ return []; } }
function saveCart(c){ localStorage.setItem(KEY_CART, JSON.stringify(c)); }
function addToCart(productId, qty=1){
  const c = loadCart(); const it = c.find(x=>x.id===productId);
  if(it) it.qty = Math.min((it.qty||0)+qty, 999);
  else c.push({ id:productId, qty });
  saveCart(c);
}
function updateCartItem(productId, qty){
  let c = loadCart(); c = c.map(i=> i.id===productId? {...i, qty}: i).filter(i=> i.qty>0); saveCart(c);
}
function removeCartItem(productId){ let c = loadCart(); c = c.filter(i=> i.id!==productId); saveCart(c); }
function clearCart(){ localStorage.removeItem(KEY_CART); }
