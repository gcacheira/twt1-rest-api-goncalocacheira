// JS para operações CRUD com Fetch API
const apiUrl = 'https://twt1-rest-api-goncalocacheira.onrender.com/alunos';

const lista = document.getElementById('lista-alunos');
const form = document.getElementById('form-aluno');

let alunoEmEdicao = null; // null = modo adicionar | _id = modo edição

function carregarAlunos() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(alunos => {
      lista.innerHTML = '';
      alunos.forEach(aluno => {
        const li = document.createElement('li');
        li.textContent = `${aluno.nome} ${aluno.apelido} (${aluno.curso}, Ano ${aluno.anoCurricular}) `;

        // Botão Apagar
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'Apagar';
        botaoApagar.classList.add('btn', 'btn-danger');
        botaoApagar.addEventListener('click', () => apagarAluno(aluno._id));
        li.appendChild(botaoApagar);

        // Botão Editar
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.classList.add('btn', 'btn-success', 'ms-2');
        botaoEditar.addEventListener('click', () => carregarParaEdicao(aluno));
        li.appendChild(botaoEditar);

        lista.appendChild(li);
      });
    })
    .catch(erro => {
      console.error('Erro ao carregar alunos:', erro);
    });
}

function apagarAluno(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => carregarAlunos())
    .catch(erro => {
      console.error('Erro ao apagar aluno:', erro);
    });
}

function carregarParaEdicao(aluno) {
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('apelido').value = aluno.apelido;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('anoCurricular').value = aluno.anoCurricular;
  alunoEmEdicao = aluno._id;

  form.querySelector('button').textContent = 'Guardar Alterações';
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const alunoData = {
    nome: document.getElementById('nome').value.trim(),
    apelido: document.getElementById('apelido').value.trim(),
    curso: document.getElementById('curso').value.trim(),
    anoCurricular: parseInt(document.getElementById('anoCurricular').value)
  };

  // Validação rápida
  if (!alunoData.nome || !alunoData.apelido || !alunoData.curso || isNaN(alunoData.anoCurricular)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  if (alunoEmEdicao) {
    // Atualizar aluno existente
    fetch(`${apiUrl}/${alunoEmEdicao}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alunoData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao atualizar aluno.');
        alunoEmEdicao = null;
        form.querySelector('button').textContent = 'Adicionar Aluno';
        form.reset();
        carregarAlunos();
      })
      .catch(erro => {
        console.error('Erro ao editar aluno:', erro);
        alert('Erro ao editar aluno.');
      });
  } else {
    // Criar novo aluno
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alunoData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao adicionar aluno.');
        form.reset();
        carregarAlunos();
      })
      .catch(erro => {
        console.error('Erro ao adicionar aluno:', erro);
        alert('Erro ao adicionar aluno.');
      });
  }
});

// Carregamento inicial
carregarAlunos();