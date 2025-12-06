// js/data.js — products & orders storage
const KEY_PRODUCTS = 'sp_products_v1';
const KEY_ORDERS = 'sp_orders_v1';

// sample product if none
const SAMPLE_PRODUCTS = [
  { id:'p1', name:'Filter Oli Universal', category:'engine', price:95000, stock:10, condition:'new', aftermarket:true, desc:'Filter oli universal cocok untuk berbagai tipe.', img:null },
  { id:'p2', name:'Busi NGK Racing', category:'electrical', price:120000, stock:20, condition:'new', aftermarket:false, desc:'Busi performa tinggi untuk boost performance.', img:null },
  { id:'p3', name:'Shock Sport', category:'suspension', price:450000, stock:6, condition:'new', aftermarket:true, desc:'Shock aftermarket kualitas premium.', img:null }
];

function loadProducts(){
  try{
    const raw = localStorage.getItem(KEY_PRODUCTS);
    if(!raw){ localStorage.setItem(KEY_PRODUCTS, JSON.stringify(SAMPLE_PRODUCTS)); return JSON.parse(JSON.stringify(SAMPLE_PRODUCTS)); }
    return JSON.parse(raw);
  }catch(e){ console.error(e); return JSON.parse(JSON.stringify(SAMPLE_PRODUCTS)); }
}
function saveProducts(arr){ localStorage.setItem(KEY_PRODUCTS, JSON.stringify(arr)); }

function loadOrders(){
  try{ const raw = localStorage.getItem(KEY_ORDERS); return raw ? JSON.parse(raw) : []; }catch(e){ return []; }
}
function saveOrders(arr){ localStorage.setItem(KEY_ORDERS, JSON.stringify(arr)); }
