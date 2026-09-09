export async function carregarTarefas() {
  const resposta = await fetch('./dados.json');

  if (!resposta.ok) {
    throw new Error(`Erro na requisição HTTP: ${resposta.status}`);
  }

  const dados = await resposta.json();
  return dados.tarefas;
}
