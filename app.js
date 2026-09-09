import { carregarTarefas } from './api.js';
import { renderizarEstado } from './estados.js';

async function inicializar() {
  renderizarEstado('carregando');

  try {
    const tarefas = await carregarTarefas();

    if (tarefas.length === 0) {
      renderizarEstado('vazio');
    } else {
      renderizarEstado('sucesso', tarefas);
    }

  } catch (erro) {
    let mensagemErro = 'Ocorreu um erro ao carregar as tarefas.';

    if (erro instanceof TypeError) {
      mensagemErro = 'Erro de rede: Verifique sua conexão com a internet.';
    } else if (erro instanceof SyntaxError) {
      mensagemErro = 'Erro de formato: O arquivo de dados é inválido.';
    } else if (erro.message.includes('HTTP')) {
      mensagemErro = `Erro no servidor: ${erro.message}`;
    }

    renderizarEstado('erro', null, mensagemErro);
  }
}

document.addEventListener('DOMContentLoaded', inicializar);
