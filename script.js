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

function slugifyCategoria(nome) {
  return nome
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------- Renderiza o cardápio agrupado por categoria ----------
function renderMenu() {
  const categorias = [...new Set(MENU_ITEMS.map(item => item.categoria))];

  categorias.forEach(categoria => {
    const itensDaCategoria = MENU_ITEMS.filter(i => i.categoria === categoria);

    const section = document.createElement("section");
    section.className = "category";
    section.id = `cat-${slugifyCategoria(categoria)}`;
    section.innerHTML = `
      <h2 class="category__title">${categoria}</h2>
      <div class="item-grid">
        ${itensDaCategoria.map(item => `
          <div class="item-card" data-id="${item.id}">
            <div class="item-card__photo-wrap" data-foto="${item.foto}" data-nome="${item.nome}" role="button" tabindex="0" aria-label="Ampliar foto de ${item.nome}">
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

  renderCategoryNav(categorias);

  // Um listener só, delegado no container (mais leve que um por botão)
  menuEl.addEventListener("click", (e) => {
    const photo = e.target.closest(".item-card__photo-wrap");
    if (photo && !photo.classList.contains("is-empty")) {
      openLightbox(photo.dataset.foto, photo.dataset.nome);
      return;
    }
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

  // Permite abrir o popup também pelo teclado (acessibilidade)
  menuEl.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const photo = e.target.closest(".item-card__photo-wrap");
    if (!photo || photo.classList.contains("is-empty")) return;
    e.preventDefault();
    openLightbox(photo.dataset.foto, photo.dataset.nome);
  });
}

// ---------- Barra de navegação de categorias ----------
const categoryNavEl      = document.getElementById("categoryNav");
const categoryNavInnerEl = document.getElementById("categoryNavInner");

function renderCategoryNav(categorias) {
  if (!categoryNavEl || !categoryNavInnerEl) return;

  categoryNavInnerEl.innerHTML = `
    <button class="category-nav__toggle" id="categoryNavToggle" aria-expanded="false">
      <span id="categoryNavLabel">${categorias[0]}</span>
      <span class="category-nav__chevron">▾</span>
    </button>
    <div class="category-nav__list" id="categoryNavList" role="menu">
      ${categorias.map(categoria => `
        <button class="category-nav__pill" data-target="cat-${slugifyCategoria(categoria)}" role="menuitem">${categoria}</button>
      `).join("")}
    </div>
  `;

  const toggle = document.getElementById("categoryNavToggle");
  const list   = document.getElementById("categoryNavList");
  const label  = document.getElementById("categoryNavLabel");

  function abrirDropdown(aberto) {
    list.classList.toggle("is-open", aberto);
    toggle.classList.toggle("is-open", aberto);
    toggle.setAttribute("aria-expanded", String(aberto));
  }

  // Abre/fecha o dropdown (só tem efeito visual no mobile — no desktop o botão fica escondido)
  toggle.addEventListener("click", () => abrirDropdown(!list.classList.contains("is-open")));

  // Clicar fora fecha o dropdown
  document.addEventListener("click", (e) => {
    if (!categoryNavEl.contains(e.target)) abrirDropdown(false);
  });

  // Esc também fecha
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") abrirDropdown(false);
  });

  categoryNavEl.addEventListener("click", (e) => {
    const pill = e.target.closest(".category-nav__pill");
    if (!pill) return;
    const target = document.getElementById(pill.dataset.target);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    label.textContent = pill.textContent;
    abrirDropdown(false);
  });

  // Destaca o pill da categoria visível na tela (e atualiza o rótulo do dropdown) enquanto o usuário rola
  const secoes = categorias.map(c => document.getElementById(`cat-${slugifyCategoria(c)}`)).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idAtivo = entry.target.id;
      categoryNavEl.querySelectorAll(".category-nav__pill").forEach(pill => {
        const ativo = pill.dataset.target === idAtivo;
        pill.classList.toggle("is-active", ativo);
        if (ativo) label.textContent = pill.textContent;
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" }); // considera "ativa" a seção que cruza a faixa central da tela

  secoes.forEach(secao => observer.observe(secao));
}

// Mantém a barra de categorias grudada exatamente embaixo do cabeçalho, em qualquer tamanho de tela
function ajustarAlturaTopbar() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  document.documentElement.style.setProperty("--topbar-h", `${topbar.offsetHeight}px`);
}
window.addEventListener("resize", ajustarAlturaTopbar);
ajustarAlturaTopbar();

// ---------- Popup (lightbox) da foto ampliada ----------
const photoLightbox        = document.getElementById("photoLightbox");
const photoLightboxImg     = document.getElementById("photoLightboxImg");
const photoLightboxCaption = document.getElementById("photoLightboxCaption");
const photoLightboxClose   = document.getElementById("photoLightboxClose");

function openLightbox(foto, nome) {
  if (!photoLightbox) return; // proteção: se o popup não existir no HTML, não quebra o resto do site
  photoLightboxImg.src = foto;
  photoLightboxImg.alt = nome;
  photoLightboxCaption.textContent = nome;
  photoLightbox.classList.add("is-open");
  photoLightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!photoLightbox) return;
  photoLightbox.classList.remove("is-open");
  photoLightbox.setAttribute("aria-hidden", "true");
  photoLightboxImg.src = ""; // libera a imagem da memória
  // só libera o scroll do body se o carrinho também não estiver aberto
  if (!cartPanel.classList.contains("is-open")) {
    document.body.style.overflow = "";
  }
}

// Só registra os eventos do popup se todos os elementos existirem no HTML
if (photoLightbox && photoLightboxImg && photoLightboxCaption && photoLightboxClose) {
  photoLightboxClose.addEventListener("click", closeLightbox);

  // Clique fora da foto (no fundo escuro) fecha o popup
  photoLightbox.addEventListener("click", (e) => {
    if (e.target === photoLightbox) closeLightbox();
  });

  // Tecla Esc também fecha
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && photoLightbox.classList.contains("is-open")) closeLightbox();
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
  document.body.style.overflow = "hidden"; // trava o scroll de fundo (evita o iOS arrastar a página por trás do painel)
}
function closeCart() {
  cartPanel.classList.remove("is-open");
  cartOverlay.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // libera o scroll da página normalmente
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
try {
  renderMenu();
  renderCart();
} catch (erro) {
  console.error("Erro ao carregar o cardápio:", erro);
}