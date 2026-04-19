// ===== PRODUTOS =====
const produtos = [
  {
    nome: "Produto Exemplo",
    preco: 10,
    imagem: "https://via.placeholder.com/150"
  }
];

let carrinho = [];

// ===== INICIAR =====
function iniciar() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

// ===== CARREGAR MENU =====
function carregarMenu() {
  const menu = document.getElementById("menu");

  produtos.forEach((produto, index) => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${produto.imagem}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco}</p>
    `;

    div.onclick = () => adicionarCarrinho(index);

    menu.appendChild(div);
  });
}

// ===== ADICIONAR =====
function adicionarCarrinho(index) {
  carrinho.push(produtos[index]);
  atualizarCarrinho();
}

// ===== ATUALIZAR =====
function atualizarCarrinho() {
  const cart = document.getElementById("cart");
  cart.innerHTML = "";

  let total = 0;

  carrinho.forEach(item => {
    total += item.preco;

    const div = document.createElement("div");
    div.innerText = `${item.nome} - R$ ${item.preco}`;
    cart.appendChild(div);
  });

  document.getElementById("total").innerText = "R$ " + total;
}

// ===== FINALIZAR =====
function finalizarPedido() {
  const numero = Math.floor(Math.random() * 1000);

  alert(`Pedido #${numero} realizado! 🎉`);

  carrinho = [];
  atualizarCarrinho();
}

// ===== INIT =====
carregarMenu();
