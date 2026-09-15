import { carregarTarefas } from './api.js';
import { estado, obterTarefasFiltradas } from './estado.js';
import { renderizarTela } from './estados.js';

const formFiltros = document.querySelector('form');
const inputBusca = document.getElementById('busca-titulo');
const selectOrdenacao = document.getElementById('ordenacao-prazo');
const btnLimpar = document.getElementById('btn-limpar');

function atualizarInterface() {
  const tarefasFiltradas = obterTarefasFiltradas(estado);
  renderizarTela(estado, tarefasFiltradas);
}

function registrarOuvintes() {
  inputBusca.addEventListener('input', (e) => {
    estado.busca = e.target.value;
    atualizarInterface();
  });

  formFiltros.addEventListener('change', (e) => {
    if (e.target.name === 'filtro-status') estado.status = e.target.value;
    if (e.target.name === 'filtro-prioridade') estado.prioridade = e.target.value;
    if (e.target.name === 'ordenacao') estado.ordenacao = e.target.value;
    atualizarInterface();
  });

  formFiltros.addEventListener('submit', (e) => {
    e.preventDefault();
    atualizarInterface();
  });

  btnLimpar.addEventListener('click', () => {
    estado.busca = '';
    estado.status = 'todos';
    estado.prioridade = 'todas';
    estado.ordenacao = 'asc';

    formFiltros.reset();
    atualizarInterface();
  });
}

async function inicializar() {
  registrarOuvintes();
  estado.carregando = true;
  atualizarInterface();

  try {
    estado.tarefas = await carregarTarefas();
    estado.carregando = false;
  } catch (erro) {
    estado.carregando = false;
    estado.erro = 'Erro ao carregar os dados. Verifique a conexão.';
  }

  atualizarInterface();
}

document.addEventListener('DOMContentLoaded', inicializar);
