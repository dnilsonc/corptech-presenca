document.addEventListener('DOMContentLoaded', function () {
    let colaboradores = [
        { nome: 'João Silva', ultimaPresenca: null },
        { nome: 'Maria Oliveira', ultimaPresenca: null },
        { nome: 'Carlos Souza', ultimaPresenca: null },
        { nome: 'Ana Costa', ultimaPresenca: null },
        {nome: 'Pedro Henrique', ultimaPresenca: null},
    ];

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

    buscarColaboradorInput.addEventListener('input', function () {
        atualizarListaColaboradores(this.value);
    });

    const limparBuscaBtn = document.getElementById('limparBusca');
    limparBuscaBtn.addEventListener('click', function () {
        buscarColaboradorInput.value = '';
        registroMsg.textContent = '';
        atualizarListaColaboradores();
    });

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

    function atualizarListaColaboradores(filtro = '') {
        listaColaboradores.innerHTML = '';
        const colaboradoresFiltrados = colaboradores.filter(colab =>
            colab.nome.toLowerCase().includes(filtro.toLowerCase())
        );
    
        colaboradoresFiltrados.forEach(colab => {
            const li = document.createElement('li');
            
            const nomeSpan = document.createElement('span');
            nomeSpan.textContent = colab.nome;
    
            const presencaSpan = document.createElement('span');
            presencaSpan.textContent = `Última presença: ${colab.ultimaPresenca || 'Nenhum registro'}`;
    
            li.appendChild(nomeSpan);
            li.appendChild(presencaSpan);
    
            li.addEventListener('click', function () {
                buscarColaboradorInput.value = colab.nome;
                listaColaboradores.innerHTML = '';
            });
    
            listaColaboradores.appendChild(li);
        });
    }

    atualizarListaColaboradores();
});