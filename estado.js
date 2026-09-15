export const estado = {
  tarefas: [], 
  busca: '',
  status: 'todos',
  prioridade: 'todas',
  ordenacao: 'asc',
  carregando: false,
  erro: null
};

function converterData(stringData) {
  const [dia, mes, ano] = stringData.split('/');
  return new Date(`${ano}-${mes}-${dia}`).getTime();
}

export function obterTarefasFiltradas(estadoAtual) {
  return estadoAtual.tarefas
    .filter(tarefa => {
      const buscaMatch = tarefa.titulo.toLowerCase().includes(estadoAtual.busca.toLowerCase());
      const statusMatch = estadoAtual.status === 'todos' || tarefa.status === estadoAtual.status;
      const prioridadeMatch = estadoAtual.prioridade === 'todas' || tarefa.prioridade === estadoAtual.prioridade;
      return buscaMatch && statusMatch && prioridadeMatch;
    })
    .sort((a, b) => {
      const dataA = converterData(a.prazo);
      const dataB = converterData(b.prazo);
      return estadoAtual.ordenacao === 'asc' ? dataA - dataB : dataB - dataA;
    });
}
