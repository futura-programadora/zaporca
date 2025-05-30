const numeroWhatsApp = "11951182656"; // Ex: "11951182656"

function enviarPedido() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const nome = document.getElementById('nomeCliente').value.trim();
  const obs = document.getElementById('observacoes').value.trim();

  if (!nome) {
    alert("Por favor, preencha seu nome.");
    return;
  }

  let mensagem = `Olá, meu nome é ${nome}. Gostaria de solicitar:\n`;
  let total = 0;

  checkboxes.forEach(item => {
    mensagem += `• ${item.value}\n`;
    total += parseFloat(item.dataset.price);
  });

  if (checkboxes.length === 0) {
    alert("Selecione pelo menos um item.");
    return;
  }

  mensagem += `\nTotal: R$${total.toFixed(2)}`;
  if (obs) mensagem += `\n\nObservações: ${obs}`;

  const link = `https://wa.me/55${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

// Atualização dinâmica do total
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
