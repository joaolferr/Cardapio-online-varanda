# Cardápio Digital — Varanda Panificadora

Cardápio online simples: o cliente escolhe os itens, monta uma sacola e finaliza o pedido direto pelo WhatsApp — sem cadastro, sem backend, sem custo de hospedagem além de um site estático.

## Como funciona

- HTML + CSS + JavaScript puro (sem frameworks, sem build, sem `npm install`)
- Todo o cardápio é montado dinamicamente a partir de um único arquivo de dados (`items.js`)
- O carrinho monta uma mensagem formatada e abre o WhatsApp do cliente com o pedido pronto (`wa.me`)

## Estrutura de arquivos

```
├── index.html      → estrutura da página (não precisa editar no dia a dia)
├── style.css       → visual (cores, fontes, layout)
├── script.js       → toda a lógica (carrinho, popup de foto, categorias)
├── items.js        → PRODUTOS, PREÇOS E FOTOS — o único arquivo que muda toda hora
└── img/            → fotos dos produtos
```

## Como atualizar o cardápio (dia a dia)

Isso é o que muda com frequência — tudo fica em **`items.js`**.

### Adicionar ou editar um item

Cada produto é uma linha assim:

```js
{ id: "bolo-limao", categoria: "Bolos", nome: "Bolo de limão", preco: 15.00, foto: "img/bolo-limao.jpg" },
```

- `id`: identificador único, sem espaço ou acento (ex: `bolo-limao`)
- `categoria`: define em qual seção do cardápio o item aparece (cria uma seção nova automaticamente se o nome não existir ainda)
- `nome`: o que aparece pro cliente
- `preco`: número com ponto decimal (`12.50`, não `12,50`)
- `foto`: caminho da imagem dentro da pasta `img/`

### Adicionar uma foto

1. Salve a imagem na pasta `img/` com um nome sem espaço/acento (ex: `coxinha.jpg`)
2. Aponte o campo `foto` do item pra esse caminho: `"img/coxinha.jpg"`

Se a foto não existir ainda, o card mostra um ícone de placeholder 🥖 em vez de quebrar o layout — então pode cadastrar o item antes de ter a foto pronta.

**Importante:** sempre comprima fotos de celular antes de subir (elas vêm com 1-3MB, mas no site aparecem como miniatura pequena). O ideal é redimensionar pra no máximo ~500px no lado maior e qualidade JPEG ~78 — isso costuma reduzir o arquivo em mais de 90% sem perda visível.

### Trocar o número de WhatsApp

No final do `items.js`:

```js
const WHATSAPP_NUMBER = "5577999999999";
```

Formato: `55` (Brasil) + DDD + número, sem espaço, traço ou parênteses.

## Como ajustar o visual

As cores ficam centralizadas no topo do `style.css`, em variáveis — trocando o valor ali, o resto do site se atualiza sozinho:

```css
:root {
  --coffee:   #5C1B28; /* fundo do cabeçalho e do hero */
  --paper:    #F7EEDD; /* fundo geral da página */
  --crust:    #7A2E3A; /* títulos sobre fundo claro */
  --wheat:    #C9A227; /* detalhes e bordas */
  --cherry:   #9C2B3E; /* destaques pontuais (preço) */
  --whatsapp: #25D366; /* verde oficial do WhatsApp — só no botão de pedido */
}
```

## Funcionalidades

- **Carrinho** com contador flutuante, ajuste de quantidade e cálculo automático do total
- **Formulário de pedido**: nome, telefone (opcional), tipo de entrega (retirada/entrega), endereço condicional, forma de pagamento e observação
- **Mensagem de WhatsApp formatada**, com número de pedido gerado automaticamente, emojis e lista de itens
- **Popup de foto**: clicar numa miniatura abre a foto ampliada (fecha clicando fora, no ✕ ou com Esc)
- **Navegação por categorias**: no mobile é um dropdown que abre uma lista; no desktop vira uma linha de pills alinhada com a grade de itens — em ambos os casos a categoria visível na tela é destacada automaticamente conforme o usuário rola
- **Mobile-first**: pensado primeiro pro celular (toque, uma coluna, sacola em tela cheia); desktop ganha mais colunas e painel lateral

## Como publicar

É um site estático — funciona em qualquer hospedagem simples (GitHub Pages, Netlify, Vercel, ou até dentro do próprio Google Drive/hPanel). Só subir os arquivos junto com a pasta `img/`, mantendo a mesma estrutura de pastas.

**Atenção ao cache:** depois de atualizar algum arquivo, se a mudança não aparecer, force um recarregamento completo no navegador (Ctrl+Shift+R) antes de assumir que tem algo errado no código — o navegador costuma guardar `style.css`/`script.js` em cache.

## Limitações conhecidas

- Não há painel administrativo — toda edição é direto no código (`items.js`)
- O número do pedido no comprovante é só cosmético (não tem controle real de sequência)
