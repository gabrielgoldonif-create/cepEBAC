const cep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");
const statusEl = document.getElementById("status");

const STORAGE_KEY = "formEndereco"; // chave de armazenamento

// Ao DIGITAR no campo CEP
cep.addEventListener("input", () => {
  const cepNum = cep.value.replace(/\D/g, ""); // só números

  // só consulta quando completar 8 dígitos
  if (cepNum.length !== 8) {
    statusEl.textContent = "";
    salvarDados(); // salva o que já tem
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
      salvarDados(); // salva tudo preenchido
    })
    .catch(() => {
      statusEl.textContent = "Erro ao buscar CEP.";
    });
});

// Salvar no localStorage sempre que o usuário digitar em qualquer campo
[cep, logradouro, bairro, cidade, uf].forEach(campo => {
  campo.addEventListener("input", salvarDados);
});


// salva os dados no Web Storage//
function salvarDados() {
  const dados = {
    cep: cep.value,
    logradouro: logradouro.value,
    bairro: bairro.value,
    cidade: cidade.value,
    uf: uf.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

// restaura os dados //
window.addEventListener("load", () => {
  const dadosSalvos = localStorage.getItem(STORAGE_KEY);
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    cep.value = dados.cep || "";
    logradouro.value = dados.logradouro || "";
    bairro.value = dados.bairro || "";
    cidade.value = dados.cidade || "";
    uf.value = dados.uf || "";
  }
});