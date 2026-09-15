import { renderizarTarefas } from './renderizacao.js';

const elementoStatus = document.getElementById('status-aplicacao');
const elementoContador = document.getElementById('contador-tarefas');

export function renderizarTela(estadoAtual, tarefasDerivadas = []) {
  elementoStatus.textContent = '';
  
  if (estadoAtual.carregando) {
    elementoStatus.textContent = 'Carregando tarefas...';
    elementoContador.textContent = '';
    renderizarTarefas([]);
    return;
  }

  if (estadoAtual.erro) {
    elementoStatus.textContent = estadoAtual.erro;
    elementoContador.textContent = '';
    renderizarTarefas([]);
    return;
  }

  if (estadoAtual.tarefas.length === 0) {
    elementoStatus.textContent = 'Nenhuma tarefa cadastrada no sistema.';
    elementoContador.textContent = '0 tarefas exibidas';
    renderizarTarefas([]);
    return;
  }

  if (tarefasDerivadas.length === 0) {
    elementoStatus.textContent = 'Nenhuma tarefa atende aos critérios de busca selecionados.';
    elementoContador.textContent = 'Exibindo 0 de ' + estadoAtual.tarefas.length + ' tarefas';
    renderizarTarefas([]);
    return;
  }

  const total = estadoAtual.tarefas.length;
  const visiveis = tarefasDerivadas.length;
  const textoContagem = `Exibindo ${visiveis} de ${total} tarefa${total > 1 ? 's' : ''}.`;
  
  elementoContador.textContent = textoContagem;
  elementoStatus.textContent = textoContagem;
  renderizarTarefas(tarefasDerivadas);
}
