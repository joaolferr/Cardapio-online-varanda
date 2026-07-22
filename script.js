// ============================================================
// ESTADO DO CARRINHO
// cart = { itemId: quantidade }
// ============================================================
let cart = {};

const menuEl       = document.getElementById("menu");
const cartFab       = document.getElementById("cartFab");
const cartCountEl   = document.getElementById("cartCount");
const cartPanel     = document.getElementById("cartPanel");
const cartOverlay   = document.getElementById("cartOverlay");
const cartClose     = document.getElementById("cartClose");
const cartItemsEl   = document.getElementById("cartItems");
const cartEmptyEl   = document.getElementById("cartEmpty");
const cartTotalEl   = document.getElementById("cartTotal");
const checkoutBtn   = document.getElementById("checkoutBtn");

const fieldNome        = document.getElementById("fieldNome");
const fieldTelefone    = document.getElementById("fieldTelefone");
const fieldEndereco    = document.getElementById("fieldEndereco");
const fieldEnderecoWrap = document.getElementById("fieldEnderecoWrap");
const fieldObs         = document.getElementById("fieldObs");
const tipoEntregaGroup = document.getElementById("tipoEntregaGroup");
const pagamentoGroup   = document.getElementById("pagamentoGroup");

let tipoEntrega = "Retirada no local";
let formaPagamento = "Pix";

// ---------- Renderiza o cardápio agrupado por categoria ----------
function renderMenu() {
  const categorias = [...new Set(MENU_ITEMS.map(item => item.categoria))];

  categorias.forEach(categoria => {
    const itensDaCategoria = MENU_ITEMS.filter(i => i.categoria === categoria);

    const section = document.createElement("section");
    section.className = "category";
    section.innerHTML = `
      <h2 class="category__title">${categoria}</h2>
      <div class="item-grid">
        ${itensDaCategoria.map(item => `
          <div class="item-card" data-id="${item.id}">
            <div class="item-card__photo-wrap">
              <img class="item-card__photo" src="${item.foto}" alt="${item.nome}" loading="lazy"
                   onerror="this.closest('.item-card__photo-wrap').classList.add('is-empty'); this.remove()">
            </div>
            <div class="item-card__info">
              <p class="item-card__name">${item.nome}</p>
              <p class="item-card__price">${formatarPreco(item.preco)}</p>
            </div>
            <button class="item-card__add" data-id="${item.id}" aria-label="Adicionar ${item.nome}">+</button>
          </div>
        `).join("")}
      </div>
    `;
    menuEl.appendChild(section);
  });

  // Um listener só, delegado no container (mais leve que um por botão)
  menuEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".item-card__add");
    if (!btn) return;
    addToCart(btn.dataset.id);
    btn.classList.add("is-added");
    btn.textContent = "✓";
    setTimeout(() => {
      btn.classList.remove("is-added");
      btn.textContent = "+";
    }, 600);
  });
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ---------- Operações do carrinho ----------
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function getCartTotal() {
  return Object.entries(cart).reduce((total, [id, qty]) => {
    const item = MENU_ITEMS.find(i => i.id === id);
    return total + (item ? item.preco * qty : 0);
  }, 0);
}

function getCartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

// ---------- Renderiza o painel do carrinho ----------
function renderCart() {
  const entries = Object.entries(cart);
  cartCountEl.textContent = getCartCount();

  if (entries.length === 0) {
    cartItemsEl.innerHTML = "";
    cartItemsEl.appendChild(cartEmptyEl);
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false;
    cartItemsEl.innerHTML = entries.map(([id, qty]) => {
      const item = MENU_ITEMS.find(i => i.id === id);
      return `
        <div class="cart-line" data-id="${id}">
          <span class="cart-line__name">${item.nome}</span>
          <div class="cart-line__qty">
            <button data-action="dec" data-id="${id}">−</button>
            <span>${qty}</span>
            <button data-action="inc" data-id="${id}">+</button>
          </div>
          <span class="cart-line__price">${formatarPreco(item.preco * qty)}</span>
        </div>
      `;
    }).join("");
  }

  cartTotalEl.textContent = formatarPreco(getCartTotal());
}

cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const delta = btn.dataset.action === "inc" ? 1 : -1;
  changeQty(btn.dataset.id, delta);
});

// ---------- Chips de seleção (tipo de entrega / forma de pagamento) ----------
function setupToggleGroup(groupEl, onChange) {
  groupEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".toggle-chip");
    if (!chip) return;
    [...groupEl.children].forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    onChange(chip.dataset.value);
  });
}

setupToggleGroup(tipoEntregaGroup, (value) => {
  tipoEntrega = value;
  const precisaEndereco = value === "Entregar no endereço";
  fieldEnderecoWrap.classList.toggle("is-hidden", !precisaEndereco);
});

setupToggleGroup(pagamentoGroup, (value) => {
  formaPagamento = value;
});

// ---------- Abrir / fechar painel ----------
function openCart() {
  cartPanel.classList.add("is-open");
  cartOverlay.classList.add("is-open");
  cartPanel.setAttribute("aria-hidden", "false");
}
function closeCart() {
  cartPanel.classList.remove("is-open");
  cartOverlay.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
}
cartFab.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// ---------- Validação simples dos campos obrigatórios ----------
function validarFormulario() {
  let valido = true;

  fieldNome.classList.remove("has-error");
  fieldEndereco.classList.remove("has-error");

  if (!fieldNome.value.trim()) {
    fieldNome.classList.add("has-error");
    if (valido) fieldNome.focus();
    valido = false;
  }

  if (tipoEntrega === "Entregar no endereço" && !fieldEndereco.value.trim()) {
    fieldEndereco.classList.add("has-error");
    if (valido) fieldEndereco.focus();
    valido = false;
  }

  return valido;
}

// Gera um número de pedido simples (só pra dar aquele ar de "comprovante")
function gerarNumeroPedido() {
  return Math.floor(1000 + Math.random() * 9000);
}

// ---------- Finalizar pedido no WhatsApp ----------
checkoutBtn.addEventListener("click", () => {
  const entries = Object.entries(cart);
  if (entries.length === 0) return;
  if (!validarFormulario()) return;

  const numeroPedido = gerarNumeroPedido();
  const agora = new Date();
  const dataHora = agora.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  const linha = "----------------------------";

  const linhasItens = entries.map(([id, qty]) => {
    const item = MENU_ITEMS.find(i => i.id === id);
    return `▫️ ${qty}x ${item.nome} — ${formatarPreco(item.preco * qty)}`;
  }).join("\n");

  let mensagem = "🎉 Novo pedido!\n";
  mensagem += "📦 Aqui estão os detalhes:\n";
  mensagem += `${linha}\n`;
  mensagem += `🔢 Número do Pedido: ${numeroPedido}\n`;
  mensagem += `👤 Cliente: ${fieldNome.value.trim()}\n`;
  if (fieldTelefone.value.trim()) {
    mensagem += `📞 Telefone: ${fieldTelefone.value.trim()}\n`;
  }
  mensagem += `💰 Valor Total: ${formatarPreco(getCartTotal())}\n`;
  mensagem += `🕓 Data e Hora: ${dataHora}\n`;
  mensagem += `🚚 Tipo de Entrega: ${tipoEntrega.toUpperCase()}\n`;
  if (tipoEntrega === "Entregar no endereço") {
    mensagem += `📍 Endereço: ${fieldEndereco.value.trim()}\n`;
  }
  mensagem += `💳 Forma de pagamento: ${formaPagamento}\n`;
  if (fieldObs.value.trim()) {
    mensagem += `📝 Observação: ${fieldObs.value.trim()}\n`;
  }
  mensagem += `${linha}\n\n`;
  mensagem += "🛍️ Itens do Pedido:\n";
  mensagem += linhasItens;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
});

// ---------- Init ----------
renderMenu();
renderCart();