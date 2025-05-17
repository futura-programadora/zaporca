const numeroWhatsApp = "SEU_NUMERO_AQUI"; // Ex: "11999999999"

function enviarPedido() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const nome = document.getElementById('nomeCliente').value.trim();
  const obs = document.getElementById('observacoes').value.trim();

  if (!nome) {
    alert("Digite seu nome para continuar.");
    return;
  }

  if (checkboxes.length === 0) {
    alert("Selecione ao menos um item.");
    return;
  }

  let mensagem = `Olá, meu nome é ${nome} e gostaria de fazer um pedido:\n`;
  let total = 0;

  checkboxes.forEach(item => {
    mensagem += `• ${item.value}\n`;
    total += parseFloat(item.dataset.price);
  });

  mensagem += `\nTotal: R$${total.toFixed(2)}`;

  if (obs) {
    mensagem += `\n\nObservações: ${obs}`;
  }

  const link = `https://wa.me/55${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

// Atualiza o valor total dinamicamente
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(box => {
  box.addEventListener('change', () => {
    let total = 0;
    checkboxes.forEach(item => {
      if (item.checked) {
        total += parseFloat(item.dataset.price);
      }
    });
    document.getElementById('total').innerText = total.toFixed(2);
  });
});
