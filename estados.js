import { renderizarTarefas } from './renderizacao.js';

const elementoStatus = document.getElementById('status-aplicacao');

export function renderizarEstado(estado, dados = null, erro = null) {
  // Limpa mensagens anteriores
  elementoStatus.textContent = '';

  switch (estado) {
    case 'carregando':
      elementoStatus.textContent = 'Carregando tarefas...';
      break;

    case 'sucesso':
      elementoStatus.textContent = `${dados.length} tarefas carregadas com sucesso.`;
      renderizarTarefas(dados);
      break;

    case 'vazio':
      elementoStatus.textContent = 'Nenhuma tarefa encontrada para os critérios selecionados.';
      renderizarTarefas([]);
      break;

    case 'erro':
      elementoStatus.textContent = erro;
      renderizarTarefas([]);
      break;
  }
}
