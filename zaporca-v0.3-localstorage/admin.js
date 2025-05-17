function carregarProdutos() {
  const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  produtos.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.nome} - R$${p.preco.toFixed(2)}
      <button onclick="removerProduto(${index})">Remover</button>`;
    lista.appendChild(li);
  });
}

function adicionarProduto() {
  const nome = document.getElementById("nomeProduto").value.trim();
  const preco = parseFloat(document.getElementById("precoProduto").value);

  if (!nome || isNaN(preco)) {
    alert("Preencha os campos corretamente.");
    return;
  }

  const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
  produtos.push({ nome, preco });
  localStorage.setItem("produtos", JSON.stringify(produtos));

  document.getElementById("nomeProduto").value = "";
  document.getElementById("precoProduto").value = "";
  carregarProdutos();
}

function removerProduto(index) {
  const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
  produtos.splice(index, 1);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  carregarProdutos();
}

window.onload = carregarProdutos;
