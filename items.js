// ============================================================
// ITENS DO CARDÁPIO — Varanda Panificadora
// Edite só este arquivo pra atualizar produtos, preços e fotos.
// Não precisa mexer no HTML, CSS ou no script.js.
// ============================================================

const MENU_ITEMS = [
  // ---- Bolos ----
  { id: "bolo-iogurte",      categoria: "Bolos",    nome: "Bolo de iogurte",                 preco: 10.00, foto: "img/bolo-iogurte.jpg" },
  { id: "bolo-coco-1",       categoria: "Bolos",    nome: "Bolo de coco (opção 1)",          preco: 15.00, foto: "img/bolo-coco-1.jpg" },
  { id: "bolo-coco-2",       categoria: "Bolos",    nome: "Bolo de coco (opção 2)",          preco: 10.00, foto: "img/bolo-coco-2.jpg" },
  { id: "bolo-limao",        categoria: "Bolos",    nome: "Bolo de limão",                   preco: 15.00, foto: "img/bolo-limao.jpg" },
  { id: "bolo-cenoura-choc", categoria: "Bolos",    nome: "Bolo de cenoura com chocolate",   preco: 15.00, foto: "img/bolo-cenoura-choc.jpg" },
  { id: "bolo-pote",         categoria: "Bolos",    nome: "Bolo de pote",                    preco: 12.00, foto: "img/bolo-pote.jpg" },
  { id: "bolo-arroz",        categoria: "Bolos",    nome: "Bolo de arroz",                   preco: 10.00, foto: "img/bolo-arroz.jpg" },
  { id: "bolo-chocolate",    categoria: "Bolos",    nome: "Bolo de chocolate",               preco: 15.00, foto: "img/bolo-chocolate-bono.jpg" },

  // ---- Bebidas ----
  { id: "coca-2l-zero",      categoria: "Bebidas",  nome: "Coca-Cola Zero Açúcar 2L",        preco: 12.00, foto: "img/coca-2l-zero.jpg" },
  { id: "coca-2l-original",  categoria: "Bebidas",  nome: "Coca-Cola Original 2L",           preco: 12.00, foto: "img/coca-2l-original.jpg" },
  { id: "coca-lata-zero",    categoria: "Bebidas",  nome: "Coca-Cola Zero Açúcar lata 350ml", preco: 5.00,  foto: "img/coca-lata-zero.jpg" },
  { id: "coca-lata-original", categoria: "Bebidas", nome: "Coca-Cola Original lata 350ml",   preco: 5.00,  foto: "img/coca-lata-original.jpg" },
  { id: "toddynho",          categoria: "Bebidas",  nome: "Toddynho 200ml",                  preco: 4.00,  foto: "img/toddynho.jpg" },
  { id: "monster-energy",    categoria: "Bebidas",  nome: "Monster Energy Zero Açucar",       preco: 10.00, foto: "img/monster-energy.jpg" },
  { id: "delvalle-uva",      categoria: "Bebidas",  nome: "Del Valle Kapo Uva 200ml",        preco: 3.50,  foto: "img/delvalle-uva.jpg" },

  // ---- Salgados ----
  { id: "empada-frango",     categoria: "Salgados", nome: "Empada de frango",                preco: 6.00,  foto: "img/espada-frango.jpg" },
  { id: "quiche-carne-seca", categoria: "Salgados", nome: "Quiche de carne seca com banana da terra", preco: 12.00, foto: "img/quiche-carne-seca.jpg" },
  { id: "chipa",             categoria: "Salgados", nome: "Chipa",                           preco: 2.00,  foto: "img/chipa.jpg" },
  { id: "chimango",          categoria: "Salgados", nome: "Chimango",                        preco: 2.00,  foto: "img/chimango.jpg" },
  { id: "pao-queijo",        categoria: "Salgados", nome: "Pão de queijo",                   preco: 2.00,  foto: "img/pao-queijo.jpg" },
  { id: "quiche-frango-bacon", categoria: "Salgados", nome: "Quiche de frango com bacon",    preco: 12.00, foto: "img/quiche-frango-bacon.jpg" },
  { id: "pastel-frango-catupiry", categoria: "Salgados", nome: "Pastel assado de frango com catupiry", preco: 8.00, foto: "img/pastel-frango-catupiry.jpg" },
  { id: "torta-frango",      categoria: "Salgados", nome: "Torta de frango",                 preco: 6.00,  foto: "img/torta-frango.jpg" },
  { id: "pastel-carne-seca", categoria: "Salgados", nome: "Pastel assado de carne seca",     preco: 8.00,  foto: "img/pastel-carne-seca.jpg" },
  { id: "torta-frango-peq",  categoria: "Salgados", nome: "Torta de frango pequena",         preco: 4.00,  foto: "img/torta-frango-peq.jpg" },

  // ---- Doces ----
  { id: "donuts",            categoria: "Doces",    nome: "Donuts",                          preco: 5.00,  foto: "img/donuts.jpg" },
  { id: "sonho-doce-leite",  categoria: "Doces",    nome: "Sonho de doce de leite",          preco: 3.00,  foto: "img/sonho.jpg" },
  { id: "sonho-goiabada",    categoria: "Doces",    nome: "Sonho de goiabada",               preco: 3.00,  foto: "img/sonho.jpg" },
];

// Número de WhatsApp da padaria (formato: código do país + DDD + número, sem espaços ou símbolos)
const WHATSAPP_NUMBER = "5577991541249";
