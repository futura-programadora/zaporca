function enviarPedido() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const nome = document.getElementById('nomeCliente').value;
  const obs = document.getElementById('observacoes').value;

  if (!nome) {
    alert("Digite seu nome!");
    return;
  }

  let mensagem = `Olá, meu nome é ${nome}! Quero fazer um pedido:\n`;
  let total = 0;

  checkboxes.forEach(item => {
    mensagem += `• ${item.value}\n`;
    total += parseFloat(item.dataset.price);
  });

  mensagem += `\nTotal: R$${total.toFixed(2)}`;

  if (obs) mensagem += `\nObservações: ${obs}`;

  const numero = "SEUNUMEROAQUI"; // coloque o número do WhatsApp com DDD e sem +55
  const link = `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

// Atualiza o total dinamicamente
const inputs = document.querySelectorAll('input[type="checkbox"]');
inputs.forEach(i => i.addEventListener('change', () => {
  let total = 0;
  inputs.forEach(item => {
    if (item.checked) total += parseFloat(item.dataset.price);
  });
  document.getElementById('total').innerText = total.toFixed(2);
}));
