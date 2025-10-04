const cep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");
const statusEl = document.getElementById("status");

// Ao DIGITAR no campo CEP //
cep.addEventListener("input", () => {
  const cepNum = cep.value.replace(/\D/g, ""); // só números

  // só consulta quando completar 8 dígitos /?
  if (cepNum.length !== 8) {
    statusEl.textContent = ""; // limpa status enquanto digita
    return;
  }

  statusEl.textContent = "Buscando...";

  // API ViaCEP //
  fetch(`https://viacep.com.br/ws/${cepNum}/json/`)
    .then(res => res.json())
    .then(dados => {
      if (dados.erro) {
        statusEl.textContent = "CEP não encontrado!";
        return;
      }

      logradouro.value = dados.logradouro || "";
      bairro.value = dados.bairro || "";
      cidade.value = dados.localidade || "";
      uf.value = dados.uf || "";

      statusEl.textContent = "Endereço encontrado!";
    })
    .catch(() => {
      statusEl.textContent = "Erro ao buscar CEP.";
    });
});