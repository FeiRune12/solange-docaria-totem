const produtos = [
  {
    nome: "Bolo Caseirinho Ninho e Morango",
    preco: 40.98,
    imagem: "imagens/bolo.jpg"
  },
  {
    nome: "Lasanha de Brownie",
    preco: 42,
    imagem: "imagens/lasanha_brownie.jpg"
  },
  {
    nome: "Copo Gran Splendore(Dubai)",
    preco: 21,
    imagem: "imagens/gran_dubai.jpg"
  },
  {
    nome: "Copo Gran Splendore",
    preco: 27,
    imagem: "imagens/gran_splendor.jpg"
  },
  {
    nome: "Coxinha de Frango",
    preco: 17,
    imagem: "imagens/coxinha_frango.jpg"
  },
  {
    nome: "Coxinha de Costela",
    preco: 18,
    imagem: "imagens/coxinha_costela.jpg"
  },
{
    nome: "Gelato Van Bella",
    preco: 35.08,
    imagem: "imagens/gelato.jpg"
  }
];

let carrinho = [];

// MENU
function carregarMenu() {
  const menu = document.getElementById("menu");

  produtos.forEach((produto, index) => {
    const div = document.createElement("div");
    div.className = "produto";

    div.innerHTML = `
      <img src="${produto.imagem}">
      <span>${produto.nome}<br>R$ ${produto.preco}</span>
    `;

    div.onclick = () => adicionarCarrinho(index);

    menu.appendChild(div);
  });
}

// ADD
function adicionarCarrinho(index) {
  const item = carrinho.find(p => p.nome === produtos[index].nome);

  if (item) {
    item.qtd++;
  } else {
    carrinho.push({ ...produtos[index], qtd: 1 });
  }

  atualizarCarrinho();
}

// UPDATE
function atualizarCarrinho() {
  const cart = document.getElementById("cart");
  cart.innerHTML = "";

  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, i) => {
    total += item.preco * item.qtd;
    totalItens += item.qtd;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <img src="${item.imagem}">
        ${item.nome}<br>
        R$ ${item.preco} x ${item.qtd}
      </div>

      <div>
        <button onclick="diminuir(${i})">-</button>
        <button onclick="aumentar(${i})">+</button>
        <button onclick="remover(${i})">X</button>
      </div>
    `;

    cart.appendChild(div);
  });

  document.getElementById("total").innerText = "R$ " + total;
  document.getElementById("cartCount").innerText = totalItens;
}

// CONTROLES
function aumentar(i) { carrinho[i].qtd++; atualizarCarrinho(); }

function diminuir(i) {
  carrinho[i].qtd--;
  if (carrinho[i].qtd <= 0) carrinho.splice(i, 1);
  atualizarCarrinho();
}

function remover(i) {
  carrinho.splice(i, 1);
  atualizarCarrinho();
}

// WHATSAPP
function finalizarPedido() {
  if (carrinho.length === 0) return alert("Carrinho vazio!");

  let msg = "🍰 *Pedido*%0A%0A";
  let total = 0;

  carrinho.forEach(item => {
    msg += `• ${item.nome} x${item.qtd}%0A`;
    total += item.preco * item.qtd;
  });

  msg += `%0A💰 Total: R$ ${total}`;

  window.open(`https://wa.me/5511993945539?text=${msg}`);
}

// UI
function toggleCarrinho() {
  document.getElementById("cartArea").classList.toggle("active");
}

document.addEventListener("click", e => {
  const cart = document.getElementById("cartArea");
  const icon = document.getElementById("cartIcon");

  if (!cart.contains(e.target) && !icon.contains(e.target)) {
    cart.classList.remove("active");
  }
});

carregarMenu();
