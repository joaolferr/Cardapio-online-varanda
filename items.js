// ============================================================
// ITENS DO CARDÁPIO — Varanda Panificadora
// Edite só este arquivo pra atualizar produtos, preços e fotos.
// Não precisa mexer no HTML, CSS ou no script.js.
// ============================================================

const MENU_ITEMS = [
  // ---- Bolos ----
  { id: "bolo-iogurte",      categoria: "Bolos",    nome: "Bolo de iogurte",                 preco: 10.00, foto: "img/bolo-iogurte.png" },
  { id: "bolo-coco-1",       categoria: "Bolos",    nome: "Bolo de coco (opção 1)",          preco: 15.00, foto: "img/bolo-coco-1.png" },
  { id: "bolo-coco-2",       categoria: "Bolos",    nome: "Bolo de coco (opção 2)",          preco: 10.00, foto: "img/bolo-coco-2.png" },
  { id: "bolo-limao",        categoria: "Bolos",    nome: "Bolo de limão",                   preco: 15.00, foto: "img/bolo-limao.png" },
  { id: "bolo-cenoura-choc", categoria: "Bolos",    nome: "Bolo de cenoura com chocolate",   preco: 15.00, foto: "img/bolo-cenoura-choc.png" },
  { id: "bolo-pote",         categoria: "Bolos",    nome: "Bolo de pote",                    preco: 12.00, foto: "img/bolo-pote.png" },
  { id: "bolo-arroz",        categoria: "Bolos",    nome: "Bolo de arroz",                   preco: 10.00, foto: "img/bolo-arroz.png" },
  { id: "bolo-chocolate",    categoria: "Bolos",    nome: "Bolo de chocolate",               preco: 15.00, foto: "img/bolo-chocolate-bono.png" },

  // ---- Bebidas ----
  { id: "coca-2l-zero",      categoria: "Bebidas",  nome: "Coca-Cola Zero Açúcar 2L",        preco: 12.00, foto: "img/coca-2l-zero.png" },
  { id: "coca-2l-original",  categoria: "Bebidas",  nome: "Coca-Cola Original 2L",           preco: 12.00, foto: "img/coca-2l-original.png" },
  { id: "coca-lata-zero",    categoria: "Bebidas",  nome: "Coca-Cola Zero Açúcar lata 350ml", preco: 5.00,  foto: "img/coca-lata-zero.png" },
  { id: "coca-lata-original", categoria: "Bebidas", nome: "Coca-Cola Original lata 350ml",   preco: 5.00,  foto: "img/coca-lata-original.png" },
  { id: "toddynho",          categoria: "Bebidas",  nome: "Toddynho 200ml",                  preco: 4.00,  foto: "img/toddynho.png" },
  { id: "monster-energy",    categoria: "Bebidas",  nome: "Monster Energy Zero Açucar",       preco: 10.00, foto: "img/monster-energy.png" },
  { id: "delvalle-uva",      categoria: "Bebidas",  nome: "Del Valle Kapo Uva 200ml",        preco: 3.50,  foto: "img/delvalle-uva.png" },

  // ---- Salgados ----
  { id: "empada-frango",     categoria: "Salgados", nome: "Empada de frango",                preco: 6.00,  foto: "img/espada-frango.png" },
  { id: "quiche-carne-seca", categoria: "Salgados", nome: "Quiche de carne seca com banana da terra", preco: 12.00, foto: "img/quiche-carne-seca.png" },
  { id: "chipa",             categoria: "Salgados", nome: "Chipa",                           preco: 2.00,  foto: "img/chipa.png" },
  { id: "chimango",          categoria: "Salgados", nome: "Chimango",                        preco: 2.00,  foto: "img/chimango.png" },
  { id: "pao-queijo",        categoria: "Salgados", nome: "Pão de queijo",                   preco: 2.00,  foto: "img/pao-queijo.png" },
  { id: "quiche-frango-bacon", categoria: "Salgados", nome: "Quiche de frango com bacon",    preco: 12.00, foto: "img/quiche-frango-bacon.png" },
  { id: "pastel-frango-catupiry", categoria: "Salgados", nome: "Pastel assado de frango com catupiry", preco: 8.00, foto: "img/pastel-frango-catupiry.png" },
  { id: "torta-frango",      categoria: "Salgados", nome: "Torta de frango",                 preco: 6.00,  foto: "img/torta-frango.png" },
  { id: "pastel-carne-seca", categoria: "Salgados", nome: "Pastel assado de carne seca",     preco: 8.00,  foto: "img/pastel-carne-seca.png" },
  { id: "torta-frango-peq",  categoria: "Salgados", nome: "Torta de frango pequena",         preco: 4.00,  foto: "img/torta-frango-peq.png" },

  // ---- Doces ----
  { id: "donuts",            categoria: "Doces",    nome: "Donuts",                          preco: 5.00,  foto: "img/donuts.png" },
  { id: "sonho-doce-leite",  categoria: "Doces",    nome: "Sonho de doce de leite",          preco: 3.00,  foto: "img/sonho.png" },
  { id: "sonho-goiabada",    categoria: "Doces",    nome: "Sonho de goiabada",               preco: 3.00,  foto: "img/sonho.png" },
];

// Número de WhatsApp da padaria (formato: código do país + DDD + número, sem espaços ou símbolos)
const WHATSAPP_NUMBER = "5577991541249";
