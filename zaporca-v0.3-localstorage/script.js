const numeroWhatsApp = "11999999999"; // Seu número aqui

function carregarProdutosCliente() {
  const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  produtos.forEach((p, index) => {
    const label = document.createElement("label");
    label.classList.add("card");

    label.innerHTML = `
      <input type="checkbox" data-price="${p.preco}" value="${p.nome} - R$${p.preco.toFixed(2)}">
      <span>${p.nome}</span>
      <small>R$${p.preco.toFixed(2)}</small>
    `;

    container.appendChild(label);
  });

  atualizarTotal();
  document.querySelectorAll("input[type='checkbox']").forEach(input =>
    input.addEventListener("change", atualizarTotal)
  );
}

function atualizarTotal() {
  const inputs = document.querySelectorAll("input[type='checkbox']");
  let total = 0;
  inputs.forEach(i => {
    if (i.checked) total += parseFloat(i.dataset.price);
  });
  document.getElementById("total").innerText = total.toFixed(2);
}

function enviarPedido() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const nome = document.getElementById("nomeCliente").value.trim();
  const obs = document.getElementById("observacoes").value.trim();

  if (!nome) {
    alert("Digite seu nome!");
    return;
  }

  if (checkboxes.length === 0) {
    alert("Selecione pelo menos um item.");
    return;
  }

  let mensagem = `Olá, meu nome é ${nome} e gostaria de fazer um pedido:\n`;
  let total = 0;

  checkboxes.forEach(item => {
    mensagem += `• ${item.value}\n`;
    total += parseFloat(item.dataset.price);
  });

  mensagem += `\nTotal: R$${total.toFixed(2)}`;
  if (obs) mensagem += `\n\nObservações: ${obs}`;

  const link = `https://wa.me/55${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

window.onload = carregarProdutosCliente;
