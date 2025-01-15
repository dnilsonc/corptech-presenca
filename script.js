document.addEventListener('DOMContentLoaded', function () {
    let colaboradores = [
        { nome: 'João Silva', ultimaPresenca: null },
        { nome: 'Maria Oliveira', ultimaPresenca: null },
        { nome: 'Carlos Souza', ultimaPresenca: null },
        { nome: 'Ana Costa', ultimaPresenca: null }
    ];

    // Registrar Presença
    const registrarPresencaBtn = document.getElementById('registrarPresenca');
    const registroMsg = document.getElementById('registro');
    const buscarColaboradorInput = document.getElementById('buscarColaborador');
    const listaColaboradores = document.getElementById('listaColaboradores');

    registrarPresencaBtn.addEventListener('click', function () {
        const colaboradorSelecionado = buscarColaboradorInput.value.trim();
        const agora = new Date();

        const colaborador = colaboradores.find(colab => colab.nome === colaboradorSelecionado);

        if (colaborador) {
            colaborador.ultimaPresenca = agora.toLocaleString();
            registroMsg.textContent = `Presença de ${colaborador.nome} registrada em: ${colaborador.ultimaPresenca}`;
            atualizarListaColaboradores();
        } else {
            registroMsg.textContent = 'Colaborador não encontrado. Verifique o nome digitado.';
        }
    });

    // Buscar Colaborador
    buscarColaboradorInput.addEventListener('input', function () {
        atualizarListaColaboradores(this.value);
    });

    // Limpar Busca
    const limparBuscaBtn = document.getElementById('limparBusca');
    limparBuscaBtn.addEventListener('click', function () {
        buscarColaboradorInput.value = '';
        atualizarListaColaboradores();
    });

    // Adicionar Novo Colaborador
    const novoColaboradorInput = document.getElementById('novoColaborador');
    const adicionarColaboradorBtn = document.getElementById('adicionarColaborador');

    adicionarColaboradorBtn.addEventListener('click', function () {
        const novoNome = novoColaboradorInput.value.trim();
        if (novoNome && !colaboradores.some(colab => colab.nome === novoNome)) {
            colaboradores.push({ nome: novoNome, ultimaPresenca: null });
            novoColaboradorInput.value = '';
            atualizarListaColaboradores();
        }
    });

    // Atualizar Lista de Colaboradores
    function atualizarListaColaboradores(filtro = '') {
        listaColaboradores.innerHTML = '';
        const colaboradoresFiltrados = colaboradores.filter(colab =>
            colab.nome.toLowerCase().includes(filtro.toLowerCase())
        );
    
        colaboradoresFiltrados.forEach(colab => {
            const li = document.createElement('li');
            
            // Cria um container para o nome e a última presença
            const nomeSpan = document.createElement('span');
            nomeSpan.textContent = colab.nome;
    
            const presencaSpan = document.createElement('span');
            presencaSpan.textContent = `Última presença: ${colab.ultimaPresenca || 'Nenhum registro'}`;
    
            // Adiciona os spans ao li
            li.appendChild(nomeSpan);
            li.appendChild(presencaSpan);
    
            // Adiciona um evento de clique ao item da lista
            li.addEventListener('click', function () {
                buscarColaboradorInput.value = colab.nome; // Preenche o campo de busca com o nome clicado
                listaColaboradores.innerHTML = ''; // Oculta a lista de sugestões após o clique
            });
    
            listaColaboradores.appendChild(li);
        });
    }

    // Inicializar lista de colaboradores
    atualizarListaColaboradores();
});